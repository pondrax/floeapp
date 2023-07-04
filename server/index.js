import env from 'dotenv'
const port = env.config()?.parsed?.PORT || 4000;

import { createServer } from 'http';
import { parse } from 'url';
import fs from 'fs';
import path from 'path';
import { handler } from '../build/handler.js';
// console.log(process.env)

const server = createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`);
  res.setHeader('Access-Control-Allow-Origin', '*');

  // // parse URL
  // const parsedUrl = parse(req.url);
  // // extract URL path
  // let pathname = `.${parsedUrl.pathname}`;
  // // based on the URL path, extract the file extension. e.g. .js, .doc, ...
  // const ext = path.parse(pathname).ext;
  // // maps file extension to MIME typere
  // const map = {
  //   '.ico': 'image/x-icon',
  //   '.html': 'text/html',
  //   '.js': 'text/javascript',
  //   '.json': 'application/json',
  //   '.css': 'text/css',
  //   '.png': 'image/png',
  //   '.jpg': 'image/jpeg',
  //   '.wav': 'audio/wav',
  //   '.mp3': 'audio/mpeg',
  //   '.svg': 'image/svg+xml',
  //   '.pdf': 'application/pdf',
  //   '.doc': 'application/msword'
  // };
  // // console.log(process.cwd())

  // fs.existsSync(pathname, function (exist) {
  //   if (!exist) {
  //     // if the file is not found, return 404
  //     res.statusCode = 404;
  //     res.end(`File ${pathname} not found!`);
  //     return;
  //   }

  //   // if is a directory search for index file matching the extension
  //   if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;

  //   // read file from file system
  //   fs.readFile(pathname, function (err, data) {
  //     if (err) {
  //       res.statusCode = 500;
  //       res.end(`Error getting the file: ${err}.`);
  //     } else {
  //       // if the file is found, set Content-type and send data
  //       res.setHeader('Content-type', map[ext] || 'text/plain');
  //       res.end(data);
  //     }
  //   });
  // });

  handler(req, res)

})
server.listen(parseInt(port));
console.log('Server started', server.address());
fetch('http://localhost:' +port+'/api/whatsapp')

// function shutdown() {
//   console.log('shutdown')
// }
// process.on('SIGINT', shutdown)
// process.on('SIGTERM', shutdown)