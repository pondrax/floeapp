import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const pages = async () => {
  return Promise.all(Object.entries(
    import.meta.glob('/src/routes/**/+page.server.ts')
  ).map(async ([key, fn]) => {
    const module: any = await fn();
    if (module.hasOwnProperty('actions')) {
      return {
        key: key.replace(/\/src\/routes|\/\+page\.server\.ts/g, ''),
        actions: module.actions
      }
    }
  }))
}
// console.log(pageServer)

export const load = (async ({ fetch, url }) => {
  console.log(await pages())
  return {
    endpoints: "await pages"
  }
}) satisfies PageServerLoad;
