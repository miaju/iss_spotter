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
  return request(`http://ipwho.is/${ip}`);

};

/*
 * purpose: Requests data from api.open-notify.org using provided lat/long data
 * parameters: JSON body containing geo data response from ipwho.is
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};


const nextISSTimesForMyLocation = function(cb) {

  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });

};



module.exports = { nextISSTimesForMyLocation };