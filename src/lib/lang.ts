import { derived } from "svelte/store";
import { page } from "$app/stores";
import type { Page } from "@sveltejs/kit";

export const getValue = (obj: any = {}, path: string) => {
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');
  let a = path.split('.');
  let o = obj;
  while (a.length) {
    let n: any = a.shift();
    if (!(n in o)) return;
    o = o[n];
  }
  // console.log(path, a, o)
  if (typeof o == 'object') {
    return o?.default;
  }
  return o;
};


function translate(page: Page<Record<string, string>, string | null>, key: string = '', vars: any = {}) {
  let localized = page.data.lang;

  let text = getValue(localized, key);
  if (!text) {
    text = key;
  }

  // Replace any passed in variables in the translation string.
  Object.keys(vars).map((k: string) => {
    const regex = new RegExp(`{${k}}`, 'g');
    text = text.replace(regex, vars[k]);
  });

  return text;
}

export const t = derived(page, ($page) => {
  return (key: any, vars: any = {}) => {
    if (typeof vars == 'string') {
      vars = [vars];
    }
    key = String(key).replaceAll(',', '').trim();
    return translate($page, key, vars);
  };
});