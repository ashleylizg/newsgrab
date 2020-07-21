// newsgrab

// Parse command line arguments with the Minimist library
const argv = require('minimist')(process.argv.slice(2));

// Needed dependencies
const fs = require('fs');
const path = require('path');

// See if we should print help
if (argv['_'].length == 0 || argv['h'] || argv['help']) {
    console.info('  Usage:');
    console.info('    newsgrab <list_of_search_terms_filepath> [options]');
    console.info('  Options:');
    console.info('    -h, --help       Print this help');
    process.exit(0);
  }

//check to see if file exists
try {
    if(fs.existsSync('file.txt')) {
        console.log("The file exists.");
    } else {
        console.log('The file does not exist.');
    }
} catch (err) {
    console.error(err);
}