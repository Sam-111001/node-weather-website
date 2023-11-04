const path = require("path");
const hbs = require("hbs");
const express = require("express");
const port = process.env.PORT || 3000;

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
  res.render("index", {});
});

app.get("/about", (req, res) => {
  res.render("about", {});
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
    forcast(req.query.address, (error, data) => {
      if (error) {
        return res.send({ error: error });
      } else {
        res.send({
          city: data.location.name,
          region: data.location.region,
          country: data.location.country,
          temperature: data.current.temp_c,
          forcast: data.current.condition.text,
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
