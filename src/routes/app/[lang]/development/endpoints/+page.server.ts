import type { Actions, PageServerLoad } from "./$types";
import { type Model, getSchema } from '@mrleebo/prisma-ast'
import { readFileSync } from "$lib/utils";
import { error, fail } from "@sveltejs/kit";

export const _order = 99.1;
export const _reserved = true;
const getSearch = (url: URL) => {
  return {
    limit: Number(url.searchParams.get('limit') || 10),
    page: Number(url.searchParams.get('page') || 1),
    sort: url.searchParams.get('sort'),
    filter: url.searchParams.get('filter') || '',
    expand: url.searchParams.get('expand') || '',
  }
}
export const load: PageServerLoad = async ({ parent, fetch, url }) => {
  const schema = getSchema(readFileSync('prisma/schema.prisma'))
    .list
    .filter(s => s.type == 'model') as Model[];
  const table = (await parent()).pages;
  const search = getSearch(url);

  return {
    table,
    meta: {
      ...search,
      total: table.length,
    },
    options: {
      schema,
    }
  }
}

export const actions: Actions = {
  async add({ request }) {
    const form = (await request.formData()).entries();

    // return fail(400, {e:'err'})
    console.log(form);
    return fail(400, {
      form: JSON.stringify(form)
    });
  },
  async del({ request }) {
    const form = await request.formData();

    form.getAll('del[]')
    return {
      success: true
    }
  }
}
