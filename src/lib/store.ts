import { derived, writable } from "svelte/store";
import { page } from '$app/stores';
export { t } from './lang'

export const loading = writable(true);
export const toast: any = writable([])

export const searchParams = derived(page, ($page) => {
  return $page.url.searchParams
})
toast.subscribe(() => {
  setTimeout(() =>
    loading.set(false), 1000)
})