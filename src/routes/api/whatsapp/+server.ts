import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { init } from '$lib/whatsapp'

export const GET = (async ({ locals, url, params }) => {

  const WA = await init();
  console.log(WA.sessions.keys(), await locals.getSession())

  return json({ success: true, message: 'Server initialized' });
}) satisfies RequestHandler;
