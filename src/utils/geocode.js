const request = require("request");

const geocode = (address, callback) => {
  const geoUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    encodeURIComponent(address) +
    "&appid=79671ec1225675da2b532a0da0676d2f";
  request({ url: geoUrl, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to the weather service", undefined);
    } else if (response.body.length === 0) {
      callback("invalid location entered please enter a valid city", undefined);
    } else {
      const location = {
        lat: response.body[0].lat,
        lon: response.body[0].lon,
      };
      callback(undefined, location);
    }
  });
};

module.exports = geocode;
