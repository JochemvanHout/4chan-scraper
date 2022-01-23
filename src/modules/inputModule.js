const readline = require('readline');

async function getThreadLink(question) {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
      rl.question(question, function (link) {
        rl.close();
        resolve(link);
      });
  })
}

exports.getThreadLink = getThreadLink;




// const question = (text) => new Promise((resolve) => rl.question(text, (result) => resolve(result)));

// scrapeInfo.board = await question('Which board would you like to scrape?');
// scrapeInfo.thread = await question('Which thread would you like to scrape?');

// rl.close()