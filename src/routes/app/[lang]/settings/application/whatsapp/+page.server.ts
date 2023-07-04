import type { Actions, PageServerLoad } from "./$types";
import { init } from "$lib/whatsapp";

export const load: PageServerLoad = async ({ fetch, url }) => {
  const WA = await init()
  const sessions = [...WA.sessions.keys()]
  return {
    whatsapp: sessions
  }
}

export const actions: Actions = {
  async add({ locals,request }) {
    console.log(locals, await request.formData())
    return {

    }
  }
}
