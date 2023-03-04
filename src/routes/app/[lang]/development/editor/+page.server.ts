import type { Actions, PageServerLoad } from "./$types";
import { SiteAuditCreateArgsSchema } from '$prisma/generated/zod';

export const _order = 99.3;
export const load: PageServerLoad = async ({ fetch, url }) => {
  // console.log(SiteAuditCreateArgsSchema)
  return {

  }
}

export const actions: Actions = {
  async make({ request }) {
    return {

    }
  },
  async del({request}){
    
  }
}
