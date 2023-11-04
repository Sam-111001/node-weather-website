const request = require("request");

const forcast = (location, callback) => {
  const url =
    "http://api.weatherapi.com/v1/current.json?key=c23a49f309ed4daa98b214615233110&aqi=no&q=" +
    encodeURIComponent(location);

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
