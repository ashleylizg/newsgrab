const { chromium } = require('playwright');

const MODAL_BUTTON_SELECTOR = '.modal-footer > button';
const SEARCH_SELECTOR = 'input[placeholder=Search]';
const LOCATION_SELECTOR = 'li.active > a';

const GOOGLE_NEWS_URL = 'https://www.google.com/search?q=wells+college&source=lnms&tbm=nws';
const GOOGLE_RESULTS_SELECTOR = 'div[data-async-context="query:wells%20college"] > div > g-card div[role="heading"]';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(GOOGLE_NEWS_URL);

  let results = await page.$$(GOOGLE_RESULTS_SELECTOR);

  for (var i = 0; i < results.length; i += 1) {
    var thisResultsTitle = await (await results[i].getProperty('innerHTML')).jsonValue();
    console.log(thisResultsTitle);
  }

  await browser.close();
})();