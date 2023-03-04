import { derived, writable } from "svelte/store";
import { page } from '$app/stores';
export { t } from './lang'

export const loading = writable(true);

export const searchParams = derived(page, ($page) => {
  return $page.url.searchParams
})