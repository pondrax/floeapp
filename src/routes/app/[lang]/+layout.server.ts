import type { LayoutServerLoad } from "./$types";

const pages = async () => {
  return await Promise.all(Object.entries(
    import.meta.glob('/src/routes/app/**/+page.server.ts')
  ).map(async ([key, fn]) => {
    const uri = key.replace(/\/src\/routes|\/\+page.server.ts/g, '') || '/'
    const [_, _1, _2, head, name] = uri.split('/');
    const module: any = await fn();
    return {
      uri,
      head: head || 'app',
      name: module.name || name || 'dashboard',
      description: module.description || 'page description',
      order: module._order || 0,
      actions: Object.keys(module?.actions || {}),
      hidden: module._hidden,
      reserved: module._reserved
    }
  }))
}

export const load: LayoutServerLoad = async ({ url, params }) => {
  let endpoints = (await pages())
    .filter(p => !p.hidden)
    .sort((a, b) => (a.order - b.order));

  let currentPage = endpoints.find(link => link.uri.replace('[lang]', params.lang) == url.pathname) || endpoints[0]

  let lang = { id: 'en' };
  let uri = currentPage.uri.replace('/app/[lang]', 'app').replaceAll('/', '.')
  try {
    lang = (await import(`./../../../lang/${params.lang}/${uri}`)).default;
  } catch (e) {
    lang = (await import(`./../../../lang/${params.lang}`)).default;
  }
  return {
    lang: lang,
    page: currentPage,
    pages: endpoints,
  }
}