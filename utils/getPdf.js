const puppeteer = require('puppeteer');

async function getPdf() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://feedvix.com', {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({ format: 'A4' });

  await browser.close();
  return pdf
}

module.exports = getPdf;
