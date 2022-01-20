const readline = require('readline');

async function getThreadLink() {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
      rl.question('Paste the full link to the desired 4chan page: ', function (link) {
        rl.close();
        resolve(link);
      });
  })
}

exports.getThreadLink = getThreadLink;