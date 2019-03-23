// Require dependencies
const express = require("express"),
  mongoose = require("mongoose"),
  exphbs = require("express-handlebars"),
  logger = require("morgan");

// Port configuration for local/Heroku
const PORT = process.env.PORT || process.argv[2] || 8080;

// Instantiate express app
const app = express();

// Require routes
const routes = require("./routes");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// logger
app.use(logger("dev"));

// Make public a static folder
app.use(express.static("public"));

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Have every request go through our route middleware
app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const uri = process.env.MONGODB_URI || "mongodb://localhost/mongo-scraper";
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};
mongoose.connect(uri, options).then(
  result => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log(
      `Connected to database '${result.connections[0].name}' on ${
        result.connections[0].host
      }:${result.connections[0].port}`
    );
  },
  err => {
    /** handle initial connection error */
    console.log("There was an error with your connection:", err);
  }
);

// Listen On Port
app.listen(PORT, function() {
  console.log("Server listening on: localhost:" + PORT);
});
