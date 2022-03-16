const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "server/csvs");
  },
  filename: (req, file, cb) => {
    cb(null, /* new Date().toISOString() + "-" + */ file.originalname);
  },
});

// Set up the express app
const app = express();

app.use(multer({ storage: fileStorage }).array("files"));
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

const extendTimeoutMiddleware = (req, res, next) => {
  const space = " ";
  let isFinished = false;
  let isDataSent = false;

  // Only extend the timeout for API requests
  if (!req.url.includes("/api")) {
    next();
    return;
  }

  res.once("finish", () => {
    isFinished = true;
  });

  res.once("end", () => {
    isFinished = true;
  });

  res.once("close", () => {
    isFinished = true;
  });

  res.on("data", (data) => {
    // Look for something other than our blank space to indicate that real
    // data is now being sent back to the client.
    if (data !== space) {
      isDataSent = true;
    }
  });

  const waitAndSend = () => {
    setTimeout(() => {
      // If the response hasn't finished and hasn't sent any data back....
      if (!isFinished && !isDataSent) {
        // Need to write the status code/headers if they haven't been sent yet.
        if (!res.headersSent) {
          res.writeHead(202);
        }

        res.write(space);

        // Wait another 15 seconds
        waitAndSend();
      }
    }, 15000);
  };

  waitAndSend();
  next();
};

app.use(extendTimeoutMiddleware);

// Setup a default catch-all route that sends back a welcome message in JSON format.
// Require our routes into the application.
require("./server/routes")(app);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning.",
  })
);

module.exports = app;
