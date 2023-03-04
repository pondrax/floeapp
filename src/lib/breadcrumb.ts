export const breadcrumb = (path: string | undefined) => {
  const links = path?.split('/').map(p => {
    return p
  }).filter(Boolean)
  // console.log(links)
  const ul = `<ul class="breadcrumb">
    ${links?.map((l, i) => {
    const href = '/' + links.slice(0, i + 1)?.join("/")
    return `<li class="capitalize"><a href=${href}>${l}</a></li>`
  }).join('')
    }
  </ul>`;
  return ul
}