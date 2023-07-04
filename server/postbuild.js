import fs from 'fs';

console.log('[RUN] post build')
const dir = './build/server/chunks'
const files = fs.readdirSync(dir);

files.forEach((path) => {
  fs.readFile(dir + '/' + path, 'utf-8', function (err, contents) {
    if (err) {
      console.log(err);
      return;
    }

    //fix baileys un-needed import
    const replaced = contents.replace(/^import(.*)(qrcode-terminal|jimp|sharp).*$/gm, "//$&");

    fs.writeFile(dir + '/' + path, replaced, 'utf-8', function (err) {
      // console.log(err);
    });
  });
})
// console.log(files)