const request = require("request");

const forcast = (location, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    encodeURIComponent(location.lat) +
    "&lon=" +
    encodeURIComponent(location.lon) +
    "&appid=79671ec1225675da2b532a0da0676d2f&units=metric";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the weather service.", undefined);
    } else if (response.body.cod === "400") {
      callback(
        "Invalid location entered. Please try again with a valid city.",
        undefined
      );
    } else {
      callback(undefined, response.body);
    }
  });
};

module.exports = forcast;
