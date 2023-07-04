import { derived, writable } from "svelte/store";
export { t } from './lang'

export const loading = writable(true);
export const toast: any = writable([])

toast.subscribe(() => {
  setTimeout(() =>
    loading.set(false), 500)
})