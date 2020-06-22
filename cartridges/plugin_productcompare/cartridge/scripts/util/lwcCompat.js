// Imported
// https://raw.githubusercontent.com/faisalman/ua-parser-js/master/src/ua-parser.js

var UAParser = require('./uaParser');

function isCompat() {
    // The SFRA request does not include the user-agent so we use the global DW request object
  var ua = request.httpUserAgent;
  var p = new UAParser(ua);
  var browser = p.getBrowser();

  var name = browser.name;
  var major = browser.major;

  return name === 'IE'
        || (name === 'Chrome' && major < 48)
        || (name === 'Firefox' && major < 52)
        || (name === 'Safari' && major < 10);
}

module.exports = isCompat;
