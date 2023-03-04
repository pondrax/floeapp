
export { breadcrumb } from './breadcrumb'
export { loading } from './store'
export { t } from './lang'

export function autofocus(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
  setTimeout(() => el.focus(), 100);
}