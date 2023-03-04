import type { Actions, PageServerLoad } from "./$types";
import { UserCreateInputSchema } from "$prisma/generated/zod";
import { fail } from "@sveltejs/kit";
import { db, getQuery } from "$lib/db";
import { parseFormData } from "$lib/utils";

export const _order = 9.1;
export const _reserved = true;

export const load: PageServerLoad = async ({ url }) => {
  const { query, filter, include } = getQuery(url);
  try {
    const [table, meta] = await db.user.paginate({
      ...filter,
      include: {
        role: true,
        ...include
      }
    }, query)

    return {
      table,
      meta,
      options: {
        // schema,
      }
    }
  } catch (error) {
    return {
      table: [],
      meta: query
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
          // id: data.id || crypto.randomUUID(),
          email: data.email,
        },
        create: data,
        update: data,
      })
      return {
        data: result
      }
    } catch (error: any) {
      console.log(error)
      const message = error.issues ? JSON.parse(error.message) : error.message
      return fail(400, {
        error: message
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
      id: result
    }
  }
}
