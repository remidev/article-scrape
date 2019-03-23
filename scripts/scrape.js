// scrape script
// =============

// Require axios and cheerio, making our scrapes possible
const axios = require("axios");
const cheerio = require("cheerio");

const scrape = function() {
  return axios.get("https://old.reddit.com/r/javascript/").then(function(res) {
    const $ = cheerio.load(res.data);
    console.log("scraping");
    let articles = [];
    //iterating over returned articles, and creating a newArticle object from the data
    $("div.thing").each((i, element) => {
      let head = $(element)
        .find("p.title")
        .text()
        .trim();
      let sum = $(element)
        .find("div.score.unvoted")
        .text()
        .trim();
      let url = $(element)
        .find("a.title")
        .attr("href");

      // Check to ensure nothing is left undefined
      if (head && sum && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        const headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        const sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array
        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };
        articles.push(dataToAdd);
        console.log("article added");
      }
    });
    return articles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;
