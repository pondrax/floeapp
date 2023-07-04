import type { Actions, PageServerLoad } from "./$types";
import { UserCreateInputSchema } from "$prisma/generated/zod";
import { fail } from "@sveltejs/kit";
import { db, getQuery } from "$lib/db";
import { getMessage, parseFormData } from "$lib/utils";

export const _order = 9.1;
export const _reserved = true;

export const load: PageServerLoad = async ({ url }) => {
  const { query, filter, include } = getQuery(url);
  const roles = await db.role.findMany();
  try {
    const [result, meta] = await db.user.paginate({
      ...filter,
      include: {
        role: true,
        ...include
      }
    }, query)

    return {
      result,
      meta,
      options: {
        roles
        // schema,
      }
    }
  } catch (error) {
    return {
      table: [],
      meta: query,
      options:{
        roles
      }
    }
  }
}

export const actions: Actions = {
  async save({ request }) {
    try {
      const form = parseFormData(await request.formData());
      const data = UserCreateInputSchema.parse(form);

      const result = await db.user.upsert({
        where: {
          id: data.id
        },
        create: data,
        update: data,
      })
      return {
        action: 'save',
        data: result
      }
    } catch (error: any) {
      // console.log(error)
      return fail(400, {
        error: getMessage(error)
      })
    }
  },
  async del({ request }) {
    const form = await request.formData();
    const id = form.getAll('id[]').map(x => String(x));

    const result = await db.user.deleteMany({
      where: {
        id: {
          in: id
        }
      }
    })

    return {
      action: 'delete',
      id: result
    }
  }
}
