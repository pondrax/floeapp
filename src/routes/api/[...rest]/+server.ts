import { deserialize } from '$app/forms';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ url, params }) => {
  const apiUrl = url.origin + "/" + params.rest + "__data.json" + url.search;

  const req = await fetch(apiUrl, {
    headers: {
      Origin: url.origin
    },
    redirect: 'follow'
  })
  const apiGet = await req.json()
  const res = apiGet.nodes.pop();
  if (res.data) {
    const response = {
      type: 'success',
      status: 200,
      data: JSON.stringify(res.data)
    }
    return json(deserialize(JSON.stringify(response)));
  }
  return json({ error: 'Error' });
}) satisfies RequestHandler;

export const POST = (async ({ url, params, request }) => {
  const api = params.rest.split('/');
  const action = api.pop();
  const rest = api.join('/') || '/';

  const formData = await request.formData();
  // console.log(request.headers)
  const req = await fetch(url.origin + rest + "?/" + action, {
    method: 'POST',
    headers: {
      Origin: url.origin
    },
    body: formData,
    redirect: 'follow'
  })
  const res = await req.json()
  if (request.headers.has('x-api')) {
    return json(deserialize(JSON.stringify(res)))
  }
  // res.invalidate = true
  return json(res)
}) satisfies RequestHandler;
