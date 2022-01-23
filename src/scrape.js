const puppeteer = require('puppeteer');
const downloadModule = require('./modules/downloadModule');
const inputModule = require('./modules/inputModule');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(await inputModule.getThreadLink('Paste the full link to the desired 4chan page: '));

  let threadName = await page.evaluate(() => {
    const el = document.querySelector('div.thread div.opContainer div div.postInfo span.subject');

    return el.textContent ? el.textContent : document.querySelector('div.thread').id;
  })

  const urls = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('div .postContainer > div .file > a'));

    return anchors.map(({ href }) => href);
  });

  await browser.close();

  // make new folder
  if (threadName && !fs.existsSync(threadName)){
    fs.mkdirSync(threadName);
  }

  if (urls.length > 0) {
    urls.forEach(url => {
      const filename = url.split('/').pop();
      
      downloadModule.downloadeFile(url, `${threadName}/${filename}`);
    }) 
  }
})();
