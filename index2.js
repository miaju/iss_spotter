const { fetchMyIP, fetchCoordsByIP } = require("./iss_promise");

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(body => console.log(body));