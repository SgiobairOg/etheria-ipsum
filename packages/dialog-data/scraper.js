const puppeteer = require('puppeteer');
const fs = require('fs');
const lineReader = require('line-reader');
const { parseLinesWithDelay } = require('./src/utils/utils');

const DIVIDER = '\n';

let outputStream = fs.createWriteStream('./data/dialog.txt', {flags: 'w'});
let browser;

const downloadTranscript = async (url, selector) => {
  console.log(url, selector);
  try {
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.$$eval(selector, elements => {
      return elements
        .map(element => element
          .innerHTML
          .replace(/\<.*\>/g, '')
          .replace(/\n/g, ' ')
          .replace(/^.*:/g, '')
          .replace(/\(\(\*\*.+\*\*\)\)/g, '')
          .replace(/&[a-z]+;/g, '')
          .replace(/\[.*?\]/g, '')
          .replace(/^[0-9]*\]/g, '')
          .replace(/^(.{1,2})$/g, '')
          .replace(/^\-/g, '')
          .replace(/^\- scene .*$/, '')
          .replace(/-{1,3}/, '')
          .replace(/See Also: Episode Transcript List/gi, '')
          .replace(/\(Credits Roll\)/gi, '')
          .replace(/\./, '')
          .replace(/·/, '')
          .trim())
        .filter(line => line !== '');
    });
    outputStream.write(`${content.join(DIVIDER)}${DIVIDER}`);
    console.log(`URL retrieved: ${url}`);
  } catch (error) {
    console.log(error, `\nLast URL: ${url}`);
  }
};

(async () => {
  browser = await puppeteer.launch();
  lineReader.open('./data/feed.txt', async (err, reader) => {
    if (err) throw err;

    await parseLinesWithDelay(reader, async (line) => {
      const [url, selector] = line.split(',');
      await downloadTranscript(url, selector);
    }, 5000);

    console.log('Closed');
    process.exit(0);
  });
})();

process.on('SIGTERM', () => {
  console.log('Process terminated');
});
