import QRCode from 'easyqrcodejs-nodejs';
import fs from 'fs';
import pino from 'pino'
import makeWASocket,
{
  delay,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  makeInMemoryStore,
  // proto,
  useMultiFileAuthState,
  type WAMessageContent,
  type WAMessageKey,
  type WASocket,
} from '@whiskeysockets/baileys';
export { delay }
export type { WASocket } from '@whiskeysockets/baileys'

const logger = pino({
  level: 'fatal',
  write: pino.destination('./server/wa.log')
})

export const init = async () => {
  const instance = new Whatsapp;
  const sessions = fs.readdirSync(instance.path);

  await Promise.all(sessions.map(async (name: string) => {
    if (name !== '.gitignore') {
      return await instance.connect(name)
    }
  }))
  // Fix session delay
  await delay(1000)
  return instance;
}

export class Whatsapp {
  public path = './server/sessions/';
  public sessions: Map<string, any> = new Map()

  async connect(name: string) {
    const { version, isLatest } = await fetchLatestBaileysVersion()
    const { state, saveCreds } = await useMultiFileAuthState(this.path + name)
    console.log(`Connect (${name}), using WA v${version.join('.')}, isLatest: ${isLatest}`)
    // const store = makeInMemoryStore({})

    let sock: WASocket;

    if (this.sessions.has(name)) {
      sock = this.sessions.get(name)
    } else {
      sock = makeWASocket({
        // browser:['Safari'],
        version,
        logger,
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, logger)
          // keys: makeCacheableSignalKeyStore(state.keys, { trace: () => null } as any)
        },
        // getMessage
      })
    }
    this.sessions.set(name, sock)

    sock.ev.process(
      async (events) => {
        if (events['connection.update']) {
          const update = events['connection.update'];
          const { connection, lastDisconnect, qr } = update
          if (connection === 'close') {
            const errorCode = (lastDisconnect?.error as any)?.output?.statusCode;
            console.log(errorCode, DisconnectReason[errorCode])
            // this.connect(name)

            // '401': 'loggedOut',
            // '408': 'timedOut',
            // '411': 'multideviceMismatch',
            // '428': 'connectionClosed',
            // '440': 'connectionReplaced',
            // '500': 'badSession',
            // '515': 'restartRequired',
            if (DisconnectReason.loggedOut == errorCode) {
              console.log('Connection logged out')
              // this.sessions.delete(name)
              // fs.rmSync(this.path + name, { recursive: true, force: true })
            } else if (DisconnectReason.connectionReplaced == errorCode) {
              console.log('Connection replaced')
            } else if (DisconnectReason.restartRequired == errorCode) {
              // Reinit fix restart required
              console.log('Restart required')
              await delay(5000)
              await init()
            } else {
              this.connect(name)
            }
          }

          if (qr) {
            const QR = new QRCode({
              text: qr,
              quietZone: 10
            })
            QR.saveImage({ path: this.path + name + '/qr.png' })
          }
        }
        if (events['creds.update']) {
          await saveCreds()
        }
        if (events['messages.upsert']) {
          const upsert = events['messages.upsert'];
          // console.log('recv messages ', JSON.stringify(upsert, undefined, 2))

          // console.log(upsert.messages)
          if (upsert.type === 'notify') {
            for (const msg of upsert.messages) {
              if (!msg.key.fromMe) {
                console.log(msg.message?.conversation)
                console.log('replying to', msg.key.remoteJid)
                // await sock!.readMessages([msg.key])
                await sock.sendMessage(msg.key.remoteJid!, {
                  text: 'Halo ' + msg.pushName + '\nIni yang kamu tulis\n\n' + JSON.stringify(msg.message)
                })
                // await sock.sendMessage(msg.key.remoteJid!, {
                //   text: 'Halo ' + msg.pushName + '\nIni yang kamu tulis\n\n' + msg.message?.conversation
                // })
                // await sendMessageWTyping({ text: 'Hello there!' }, msg.key.remoteJid!)
              }
            }
          }
        }
      }
    )

  }
  async detach(name: string) {
    if (this.sessions.has(name)) {
      await delay(5000)
      const session = this.sessions.get(name) as WASocket
      await session.logout()
      this.sessions.delete(name)
      fs.rmSync(this.path + name, { recursive: true, force: true })
    }
  }
}
