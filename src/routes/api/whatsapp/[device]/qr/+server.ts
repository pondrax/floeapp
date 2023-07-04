import type { RequestHandler } from './$types';
import fs from 'fs';

export const GET = (async ({ url, params }) => {
  const asset = fs.readFileSync(`./server/sessions/${params.device}/qr.png`)

  return new Response(asset, {
    headers: {
      "Content-Type": "image/png"
    }
  })
}) satisfies RequestHandler;
