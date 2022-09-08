const request = require('request-promise-native');

/**
 * Purpose: Makes a single API request to retrieve the user's IP address.
 * Parameters: nothing
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return request("https://api.ipify.org/?format=json");
};


module.exports = { fetchMyIP };