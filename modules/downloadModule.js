// Send link and name, downloads a file

const fs = require('fs');
const https = require('https');

const downloadeFile = (url, destination) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(destination);

  https.get(url, response => {
    response.pipe(file);

    file.on('finish', () => {
      file.close(resolve(true));
    });
  }).on('error', error => {
    fs.unlink(destination);

    reject(error.message);
  });
});

exports.downloadeFile = downloadeFile;