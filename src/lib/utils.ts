import path from 'path';
import fs from 'fs'

export const readFileSync = (filepath: string) => {
  return fs.readFileSync(path.resolve(filepath), 'utf-8')
}

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

export const groupByKey = (list: any, key: string) =>
  list.reduce(
    (hash: any, obj: any) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }),
    {}
  );

export const setValue = (obj: any, path: string, value: any) => {
  let a = path.split('.');
  let o = obj;
  while (a.length - 1) {
    let n: any = a.shift();
    if (!(n in o)) o[n] = {};
    o = o[n];
  }
  o[a[0]] = value;
};

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
  return o;
};


export const parseFormData = (formData: FormData) =>{
  let form: any = {}
  Array.from(formData).map(([key, value]) => {
    setValue(form, key, value)
  })
  return form;
}
// @unocss-include
export const fnModal = (node: HTMLElement, active: boolean) => {
  const toggleActive = (active = false) => {
    if (active) {
      node.classList.add('modal-open');
    }
    else {
      node.classList.remove('modal-open');
    }
  };
  const handleClick = (event: Event) => {
    if (event.target instanceof HTMLElement) {
      if (!node.children[0].contains(event.target)) {
        node.dispatchEvent(new CustomEvent("close"));
      }
    }
  };
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      node.dispatchEvent(new CustomEvent("close"));
    }
  };
  toggleActive(active);
  node.addEventListener("mousedown", handleClick, true);
  window.addEventListener("keydown", handleKeydown, true);
  return {
    update(newActive: boolean) {
      toggleActive(newActive);
    },
    destroy() {
      document.removeEventListener("mousedown", handleClick, true);
    },
  };
};
