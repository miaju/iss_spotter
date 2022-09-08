const request = require("request");

/**
 * Purpose: Makes a single API request to retrieve the user's IP address.
 * Parameters:
 *   - callback: A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error)
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {

      callback(error, null);
      return;
      
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.ip);

    
  });
};

/**
 * Purpose: Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Parameters:
 *   - ip: The ip (ipv4) address (string)
 *   - cb: A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error).
 */
const fetchCoordsByIP = function(ip, cb) {
  request(`https://ipwho.is/${ip}?output=json&fields=longitude,latitude,success`, (error, response, body) => {
    if (error) {

      cb(error, null);
      return;
      
    }
    const data = JSON.parse(body);
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${ip}`;
      cb(Error(message), null);
      return;
    }
    const { latitude, longitude } = data;
    cb(null,{ latitude, longitude });

    
  });
};


/**
 * Purpose: Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Parameters:
 *   - coords: An object with keys `latitude` and `longitude`
 *   - callback: A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - error: An error, if any (nullable)
 *   - data.response: The fly over times as an array of objects (null if error).
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {

      callback(error, null);
      return;
      
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.response);
   
  });
};


/**
 * Purpose:
 *    Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Parameters:
 *    callback: A callback with an error or results.
 * Returns (via Callback):
 *   - error: an error if any (nullable)
 *   - times: The fly-over times as an array (null if error):
 */
const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      console.log("Error: " , error.message);
      return;
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        console.log("Error: " , error.message);
        return;
      }
      fetchISSFlyOverTimes(loc, (error, times) => {
        if (error) {
          console.log("Error: " , error.message);
          return;
        }
        callback(null, times);
      });
    });
  });
};




module.exports = { nextISSTimesForMyLocation };