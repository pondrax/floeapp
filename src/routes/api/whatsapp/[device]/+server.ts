import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { init } from '$lib/whatsapp';
import fs from 'fs';

export const GET = (async ({ url, params }) => {
  const WA = await init();
  await WA.connect(params.device)
  
  // params.device
  const qr = `${url.origin}/api/whatsapp/${params.device}/qr`
  
  return json({ 
    name: params.device, 
    qr 
  });
}) satisfies RequestHandler;
