const fs = require('fs');

const { chromium } = require('playwright');

// CONSTANTS

const GOOGLE_NEWS_URL = 'https://www.google.com/search?q=COLLEGE&source=lnms&tbm=nws';
const GOOGLE_RESULTS_SELECTOR = 'div[data-async-context="query:COLLEGE"] > div > g-card div[role="heading"]';
const MODAL_BUTTON_SELECTOR = '.modal-footer > button';
const SEARCH_SELECTOR = 'input[placeholder=Search]';
const LOCATION_SELECTOR = 'li.active > a';

// MAIN PROGRAM LOGIC

let listOfSearchTerms = fs.readFileSync('sample.txt').toString().split(',');

//create an array to append the results to
let searchResultsList = [];

// Will loop through search terms inside async function - need async for Playwright browser stuff
(async function() {
  console.log('Start of async processing');

  //initialize object that will be appended to array
  let searchResultData = {};

  // Set up headless browser to use then re-use
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (let i = 0; i < listOfSearchTerms.length; i += 1) {
    console.log('Loop at line ' + i);
    let line = listOfSearchTerms[i];
    if (line === '') continue;
  
    let searchterm = line;
    console.log('Looking up search term -> ' + searchterm);

    //create object for search term
    searchResultData = {};
    searchResultData.search_term = searchterm;

    // Craft search URL - remove special characters, remove carriage returns
    let thisNewsUrl = GOOGLE_NEWS_URL.replace('COLLEGE', searchterm.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g,'+'));
    console.log(thisNewsUrl);

    // Craft JavaScript selector for search results webpage
    let thisResultsSelector = GOOGLE_RESULTS_SELECTOR.replace('COLLEGE', encodeURIComponent(searchterm));
    console.log(thisResultsSelector);
    
    //loops through too quickly and only grabs last college
    await page.goto(thisNewsUrl);
    let results = await page.$$(thisResultsSelector);
  
    let thisResultsTitle = '';
    searchResultData.results = [];

    for (let j = 0; j < results.length; j += 1) {
      thisResultsTitle = await (await results[j].getProperty('innerHTML')).jsonValue();
      console.log(thisResultsTitle);
      searchResultData.results.push(thisResultsTitle);
    }

    searchResultsList.push(searchResultData);
    console.log(searchResultData);
  }

  // Close browser now that we have gone through all search terms
  await browser.close();

  console.log('End of async processing');

  // create encode json string
  let searchResultsListJson = JSON.stringify(searchResultsList);
  console.log(searchResultsListJson);
})();
