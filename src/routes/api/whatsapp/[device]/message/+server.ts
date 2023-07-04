import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { init, delay, type WASocket } from '$lib/whatsapp';

export const GET = (async ({ url, params }) => {
  const WA = await init();
  const sock = await WA.sessions.get(params.device) as WASocket;
  await delay(1000)
  const id = '628979452734@s.whatsapp.net'
  await sock.sendMessage(id, { text: 'oh hello there' })

  return json({
    name: params.device,
    // qr 
  });

}) satisfies RequestHandler;

export const POST = (async ({ params, request }) => {
  const form = await request.json();
  console.log(form)
  const id = form.phone?.replace(/\D/g, '') + '@s.whatsapp.net'
  const WA = await init();
  const sock = await WA.sessions.get(params.device) as WASocket;
  // await sock.sendMessage(id, {
  //   "text": "Hi it's button message",
  //   "buttons": [
  //     {
  //       "buttonId": "id1",
  //       "buttonText": {
  //         "displayText": "Button 1"
  //       },
  //       "type": 1
  //     }
  //   ]
  // })
  await sock.sendMessage(id, form.message)

  return json({
    device: params.device,
    message: 'Message Sent',
    data: form
  });
}) satisfies RequestHandler;


const buttonMessage = {
  text: "Hi it's button message",
  footer: 'Hello World',
  buttons: [
    { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
    { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 },
    { buttonId: 'id3', buttonText: { displayText: 'Button 3' }, type: 1 }
  ],
  headerType: 1
}

const templateMessage = {
  "text": "Hi it's a template message",
  "footer": "Hello World",
  "templateButtons": [
    {
      "index": 1,
      "urlButton": {
        "displayText": "⭐ Star Baileys on GitHub!",
        "url": "https://github.com/adiwajshing/Baileys"
      }
    },
    {
      "index": 2,
      "callButton": {
        "displayText": "Call me!",
        "phoneNumber": "+1 (234) 5678-901"
      }
    },
    {
      "index": 3,
      "quickReplyButton": {
        "displayText": "Weird",
        "id": "id-like-buttons-message"
      }
    }
  ]
}
const listMessage = {
  "text": "This is a list",
  "footer": "nice footer, link: https://google.com",
  "title": "Amazing boldfaced list title",
  "buttonText": "Required, text on the button to view the list",
  "sections": [
    {
      "title": "Section 1",
      "rows": [
        {
          "title": "Option 1",
          "rowId": "option1"
        },
        {
          "title": "Option 2",
          "rowId": "option2",
          "description": "This is a description"
        }
      ]
    },
    {
      "title": "Section 2",
      "rows": [
        {
          "title": "Option 3",
          "rowId": "option3"
        },
        {
          "title": "Option 4",
          "rowId": "option4",
          "description": "This is a description V2"
        }
      ]
    }
  ]
}

const vcard = {
  "contacts": {
    "displayName": "Jeff",
    "contacts": [
      {
        "vcard": "BEGIN:VCARD\nVERSION:3.0\nFN:Jeff Singh\nORG:Ashoka Uni;\nTEL;type=CELL;type=VOICE;waid=911234567890:+91 12345 67890\nEND:VCARD"
      }
    ]
  }
}