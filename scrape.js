const puppeteer = require('puppeteer');
const downloadModule = require('./modules/downloadModule');
const inputModule = require('./modules/inputModule');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(await inputModule.getThreadLink());

  const urls = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('div .postContainer > div .file > a'));

    return anchors.map(({ href }) => href);
  });

  await browser.close();

  if (urls.length > 0) {
    urls.forEach(url => {
      const filename = url.split('/').pop();
      
      downloadModule.downloadeFile(url, filename);
    }) 
  }
})();
