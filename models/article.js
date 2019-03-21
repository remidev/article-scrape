let mongose = require("mongoose");

// Article Schema
let articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  athor: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

let Article = (module.exports = mongose.model("Article", articleSchema));
