const fs = require('fs');


const { chromium } = require('playwright');

const MODAL_BUTTON_SELECTOR = '.modal-footer > button';
const SEARCH_SELECTOR = 'input[placeholder=Search]';
const LOCATION_SELECTOR = 'li.active > a';

const GOOGLE_NEWS_URL = 'https://www.google.com/search?q=COLLEGE&source=lnms&tbm=nws';
const GOOGLE_RESULTS_SELECTOR = 'div[data-async-context="query:COLLEGE"] > div > g-card div[role="heading"]';

const listOfColleges = fs.readFileSync('ny_colleges.txt').toString().split("\r\n");

for (let index = 0; index < listOfColleges.length; index +=1 ) {
  let line = listOfColleges[index];
  if (line === '') continue;

  let collegeName = line;
  console.log('Looking at ' + collegeName);

  // Craft search URL - remove special characters, remove carriage returns
  let thisNewsUrl = GOOGLE_NEWS_URL.replace('COLLEGE', collegeName.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g,'+'));
  console.log(thisNewsUrl);

  // Craft JavaScript selector for search results webpage
  let thisResultsSelector = GOOGLE_RESULTS_SELECTOR.replace('COLLEGE', encodeURIComponent(collegeName));
  console.log(thisResultsSelector);

  // TODO logic for this college - still not sure about looping this and writing it, if functions are built correctly
 
  (async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
  
    await page.goto(GOOGLE_NEWS_URL);
  
    let results = await page.$$(GOOGLE_RESULTS_SELECTOR);
  //added below line
    let writeStream = fs.createWriteStream('output.txt');
  
    for (var i = 0; i < results.length; i += 1) {
      var thisResultsTitle = await (await results[i].getProperty('innerHTML')).jsonValue();
      console.log(thisResultsTitle);
      //does this seem okay? added the below lines in to write to a file
      writeStream.write(thisResultsTitle);
      writeStream.on('finish', () => {
        console.log('wrote all data to file');
    });
    
    // close the stream
      writeStream.end();  
  
    }
  
    await browser.close();
  })(); 
}

console.log('End of processing');

// End the program
process.exit(0);