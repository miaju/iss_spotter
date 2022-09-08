const { fetchMyIP } = require("./iss_promise");

fetchMyIP()
  .then(body => console.log(JSON.parse(body)));