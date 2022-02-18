const express = require("express");
const bodyParser = require("body-parser");

// Set up the express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS Headers Middleware
app.use((req, res, next) => {
  // note: setHeader does not send a response, json() and render() did
  // second argument is the server(domain) we want to set this header for
  // in this case the * wildcard sets this header for all servers(domains)
  // multiple domains can be entered by using ',' comma as a separator
  res.setHeader("Access-Control-Allow-Origin", "*");
  // above we are allowing "Origins" to access data

  // telling which methods are allowed
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

  // allowing the type of headers the client can set
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  next();
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
// Require our routes into the application.
require("./server/routes")(app);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning.",
  })
);

module.exports = app;
