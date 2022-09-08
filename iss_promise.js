const request = require('request-promise-native');

/**
 * Purpose: Makes a single API request to retrieve the user's IP address.
 * Parameters: nothing
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return request("https://api.ipify.org/?format=json");
};


/*
 * Purpose: Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Parameters: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {

  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}?output=json&fields=longitude,latitude`);

};

module.exports = { fetchMyIP, fetchCoordsByIP };