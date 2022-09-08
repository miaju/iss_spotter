const { nextISSTimesForMyLocation } = require('./iss');

/**
 * Parameters:
    passTimes: Array of data objects defining the next fly-overs of the ISS.
 * Returns:
 *   undefined
 * Sideffect:
 *   Console log messages to make that data more human readable.
 */


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, times) => {
  if (error) {
    console.log("Error: ", error.message);
    return;
  }
  printPassTimes(times);
});