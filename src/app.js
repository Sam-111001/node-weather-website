const path = require("path");
const hbs = require("hbs");
const express = require("express");
const port = process.env.PORT || 3000;

const geocode = require("./utils/geocode.js");
const forcast = require("./utils/forcast.js");

const app = express();

//Path configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views1");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

//Setting up handelbars location and views location
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

//Set up static directory to use
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    aboutText: "This is the about page",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "this is some helpful text",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "Address not provided",
    });

    return console.log("Error no address provided");
  } else {
    console.log(req.query.address);

    geocode(req.query.address, (error, location) => {
      if (error) {
        return res.send({ error: error });
      } else {
        forcast(location, (error, data) => {
          if (error) {
            return res.send({ error: error });
          } else {
            res.send({
              forcast:
                data.weather[0].description.toUpperCase() +
                ", with a temperature of " +
                data.main.temp +
                " degree celsius it feels like " +
                data.main.feels_like +
                " degree celsius.",
              city: data.name,
            });
          }
        });
      }
    });
  }
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "Error 404",
  });
});

app.listen(port, () => {
  console.log("Server is up on the port: " + port);
});
