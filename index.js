const fs = require('fs');

const { chromium } = require('playwright');

// CONSTANTS

const GOOGLE_NEWS_URL = 'https://www.google.com/search?q=TERM&source=lnms&tbm=nws';
const GOOGLE_RESULTS_SELECTOR = 'div[data-async-context="query:TERM"] > div > g-card div[role="heading"]';
const MODAL_BUTTON_SELECTOR = '.modal-footer > button';
const SEARCH_SELECTOR = 'input[placeholder=Search]';
const LOCATION_SELECTOR = 'li.active > a';

// MAIN PROGRAM LOGIC

let listOfSearchTerms = fs.readFileSync('file.txt').toString().split(',');

//Create an array to append the results to
let searchResultsList = [];

// Will loop through search terms inside async function - need async for Playwright browser stuff
(async function() {
  console.log('Start of async processing');

  // Initialize object that will be appended to array
  let searchResultData = {};

  // Set up headless browser to use then re-use
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Initiate search project by each term
  for (let i = 0; i < listOfSearchTerms.length; i += 1) {
    console.log('Loop at line ' + i);
    let line = listOfSearchTerms[i];
    if (line === '') continue;
  
    let searchterm = line;
    console.log('Looking up search term -> ' + searchterm);

    // Create object for search term
    searchResultData = {};
    searchResultData.search_term = searchterm;

    // Craft search URL - remove special characters
    let thisNewsUrl = GOOGLE_NEWS_URL.replace('TERM', searchterm.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g,'+'));
    console.log(thisNewsUrl);

    // Craft JavaScript selector for search results webpage
    let thisResultsSelector = GOOGLE_RESULTS_SELECTOR.replace('TERM', encodeURIComponent(searchterm));
    console.log(thisResultsSelector);
    
    // Go to the URL for each search term
    await page.goto(thisNewsUrl);
    let results = await page.$$(thisResultsSelector);
  
    // Create an array for the term's results
    let thisResultsTitle = '';
    searchResultData.results = [];

    // Append the term's results to the search result data array
    for (let j = 0; j < results.length; j += 1) {
      thisResultsTitle = await (await results[j].getProperty('innerHTML')).jsonValue();
      console.log(thisResultsTitle);
      searchResultData.results.push(thisResultsTitle);
    }

    // Push all term results to complete data array
    searchResultsList.push(searchResultData);
    console.log(searchResultData);
  }

  // Close browser now that we have gone through all search terms
  await browser.close();

  console.log('End of async processing');

  // Create encoded json string
  let searchResultsListJson = JSON.stringify(searchResultsList);
  console.log(searchResultsListJson);
  
  // Write json output to file
  fs.writeFile("output.json", searchResultsListJson, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
  });

})();

