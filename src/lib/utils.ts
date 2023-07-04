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
export const getMessage = (error: any) => {
  return error.issues ?
    error.issues.map((x: any) => x.message) :
    error.message.split('invocation:\n\n\n').pop()
}

export const parseFormData = (formData: FormData) => {
  let form: any = {}
  Array.from(formData).map(([key, value]) => {
    setValue(form, key, value)
  })
  return form;
}
// @unocss-include

export function fnAutofocus(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
  setTimeout(() => el.focus(), 100);
}
export const fnModal = (node: HTMLElement, active: any) => {
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
    update(newActive: any) {
      toggleActive(newActive);
    },
    destroy() {
      document.removeEventListener("mousedown", handleClick, true);
    },
  };
};

export const fnBreadcrumb = (node: HTMLElement, [path, lang]: string[]) => {
  path
    .split("/")
    .filter((u) => !["[lang]", ""].includes(u))
    .forEach((uri, i) => {
      const href = '/' + path.replace("[lang]", lang)
        .split("/")
        .slice(1, i + 3)
        .join("/")

      const a = document.createElement('a');
      a.className = 'capitalize'
      a.href = href
      a.innerHTML = uri
      node.appendChild(a);
    })
  return {
    destroy() {
    },
  };
}

export const fnToggleColumn = (node: HTMLElement) => {
  let rowCount = 0;
  const ul = node.querySelector('ul') as HTMLUListElement;
  const columnsNode = node.closest('tr')?.children as unknown as HTMLElement[];
  // let columnsEl: HTMLInputElement[];
  const init = () => {
    const columns = [...columnsNode].map((el, i) => {
      const name = el.getAttribute('aria-label') || el.innerText || ''
      const key = el.dataset.key || '';
      const value = (node.closest('table')?.querySelectorAll('tr')[1].children[i] as HTMLElement)?.innerText
      const checked = !el.hasAttribute('hidden')
      const li = document.createElement('li');
      const searchParams = Array.from(new URLSearchParams(location.search))
        .filter(([name]) => name != 'sort')
        .map(([name, value]) =>
          `<input type="hidden" name="${name}" value="${value}"/>`
        ).join('\n')

      // console.log(name)
      if (['Action', 'Checkbox'].includes(name)) {
        li.innerHTML = `<input type="checkbox" hidden checked>`
      } else {
        li.innerHTML = `
      <label>
        <input type="checkbox" 
          ${checked ? 'checked' : ''}
          checkbox 
          mr-2 
        />
        ${name}
        <form group-x ml-auto>
          <button btn="~ sm base" name="sort" value="${key}">
            <i i-bx-up-arrow-alt></i>
          </button>
          ${searchParams}
          <button btn="~ sm base" name="sort" value="-${key}">
            <i i-bx-down-arrow-alt></i>
          </button>
        </form>
      </label>
      `
      }
      ul.appendChild(li);
      if (key) {
        return {
          key,
          value,
        };
      }
    }).filter(Boolean);
    node.dispatchEvent(new CustomEvent("init", {
      detail: {
        columns
      }
    }));
  }

  const handleClick = (event: Event) => {
    if (event.target instanceof HTMLElement) {
      if (ul.contains(event.target)) {
        // console.log(event.target)
        node.dispatchEvent(new CustomEvent("toggle"));
        setTimeout(() => setHidden(true), 500)
      }
    }
    setTimeout(() => setHidden(), 500)
  };

  const setHidden = (force = false) => {
    const table = node.closest('table') as HTMLTableElement;
    const rows = [...table.querySelectorAll('tr')];
    const columnsEl = [...ul.querySelectorAll('input[type="checkbox"]')] as HTMLInputElement[];
    if (force || rowCount != rows.length) {
      // console.log(rows.length, columnsEl)
      rows.forEach(row => {
        [...row.children].forEach((col, i) => {
          if (columnsEl[i] instanceof HTMLInputElement) {
            if (columnsEl[i].checked) {
              col.removeAttribute('hidden')
            } else {
              col.setAttribute('hidden', '')
            }
          }
        })
      })
    }
    rowCount = rows.length
  }

  setTimeout(() => {
    // setHidden()
    init()
  }, 1000)

  window.addEventListener("mousedown", handleClick, true);
  return {
    destroy() {
      window.removeEventListener("mousedown", handleClick, true);
    }
  }
}

type PageMeta = {
  meta: Record<string, unknown>,
  exclude: string[]
}
export const fnSearchParams = (node: HTMLElement, { meta, exclude = [] }: PageMeta) => {
  const div = document.createElement('div');
  node.appendChild(div)
  const setMeta = ({ meta, exclude }: PageMeta) => {
    exclude = ['nextPage', 'prevPage', 'pageCount'].concat(exclude)
    const html = Object.entries(meta).map(([key, value]) => {
      if (!exclude?.includes(key)) {
        return `<input type="hidden" name="${key}" value="${value}"/>`
      }
      return ''
    })
    div.innerHTML = html.join('')
  }
  setMeta({ meta, exclude })
  return {
    update({ meta, exclude = [] }: PageMeta) {
      setMeta({ meta, exclude })
    }
  }
}
export const fnSelect = (node: HTMLElement, options: any) => {
  const container = node.querySelector<HTMLUListElement>('ul');
  const select = node.querySelector<HTMLInputElement>('input[name]');
  const filter = node.querySelector<HTMLInputElement>('div[filter] input');

  if (!container) {
    throw "[fnSelect] no container list"
  }
  if (!select) {
    throw "[fnSelect] No input select"
  }
  if (!filter) {
    throw "[fnSelect] No input filter"
  }
  console.log(select.value)
  const btn = document.createElement('div')
  btn.className = 'absolute top-0 right-0 p-1'
  btn.innerHTML = `
    <button type="button" btn="~ sm" reset>&times</button>
  `
  filter.parentNode?.appendChild(btn)

  const multiple: boolean = container.hasAttribute('multiple')
  let text: string = container.innerHTML;
  let selected: string[] = [];

  const filterOptions = () => {
    if (!filter.value) {
      select.value = '';
    }
    if (select.value == '') {
      btn.classList.add('hidden')
    } else {
      btn.classList.remove('hidden')
    }
    let filteredHTML = options.map((opt: any) => {
      const isIncluded = text.match(/[^()]+(?=\))/g)
        ?.reduce((p, key) => p || (opt[key] || '').toLowerCase().includes(filter.value.toLowerCase()), false)
      // console.log(isIncluded, filter.value)
      if (isIncluded) {
        return text.replace(/\((.*?)\)/g, (match, p) => opt[p] || match);
      }
    })

    // console.log(filteredHTML, options)
    if (filteredHTML.length == 0) {
      filteredHTML = [
        `<li><div>Empty</div></li>`
      ]
    }
    container.innerHTML = filteredHTML.join('')
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        break;
      case 'Up':
      case 'Down':
        break;
      // case 'Backspace':
      // case 'Delete':
      //   select.value = ''
      //   filterOptions()
      //   break;
      default:
        // console.log(event.key)
        filterOptions()
        break
    }
  }
  const handleClick = (event: Event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLButtonElement) {
      if (container.contains(target)) {
        if (target.value) {
          // console.log(event.target, target.value)
          select.value = target.value;
          filter.value = target.innerText;
          filterOptions()
          setTimeout(() => filter.focus(), 100)
          // console.log(target.value)
        }
      }
      if (btn.contains(target)) {
        if (target.hasAttribute('reset')) {
          // console.log('reset')
          select.value = '';
          filter.value = '';
          filterOptions()
          setTimeout(() => filter.focus(), 100)
        }
      }
    }
  }

  const handleFocus = () => {
    // if(document.activeElement === filter){
    // container
    // }
  }
  filterOptions()
  filter.addEventListener('keyup', handleKeyUp, true)
  filter.addEventListener('focus', handleFocus, true)
  node.addEventListener('mousedown', handleClick, true)
  return {
    destroy() {
      filter.removeEventListener('keyup', handleKeyUp, true)
      node.removeEventListener('mousedown', handleClick, true)
    }
  }
}