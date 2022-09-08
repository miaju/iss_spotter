const { fetchMyIP, fetchCoordsByIP } = require('./iss');
/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});


fetchMyIP((error, ip) => {
  if (error) {
    console.log("Error: " , error.message);
    return;
  }
  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log("Error: " , error.message);
      return;
    }
    console.log("Coords: ", data);
  });
});
*/
