var cors = require("cors");
const express = require("express");
const app = new express();
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.static("client"));

app.use(cors());

let api_key = process.env.API_KEY,
  api_url = process.env.API_URL;

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: "2020-08-01",
  authenticator: new IamAuthenticator({
    apikey: api_key,
  }),
  serviceUrl: api_url,
});

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/url/emotion", (req, res) => {
  naturalLanguageUnderstanding
    .analyze({
      features: {
        emotion: {
          document: true,
        },
      },
      url: req.query.url,
    })
    .then((analysisResults) => {
      res.send(analysisResults);
    })
    .catch((err) => {
      console.log("error:", err);
    });
});

app.get("/url/sentiment", (req, res) => {
  naturalLanguageUnderstanding
    .analyze({
      features: {
        sentiment: {
          document: true,
        },
      },
      url: req.query.url,
    })
    .then((analysisResults) => {
      res.send(analysisResults);
    })
    .catch((err) => {
      console.log("error:", err);
    });
});

app.get("/text/emotion", (req, res) => {
  console.log(req.query);
  naturalLanguageUnderstanding
    .analyze({
      features: {
        emotion: {
          document: true,
        },
      },
      text: req.query.text,
    })
    .then((analysisResults) => {
      res.send(analysisResults);
    })
    .catch((err) => {
      console.log("error:", err);
    });
});

app.get("/text/sentiment", (req, res) => {
  naturalLanguageUnderstanding
    .analyze({
      features: {
        sentiment: {
          document: true,
        },
      },
      text: req.query.text,
    })
    .then((analysisResults) => {
      res.send(analysisResults);
    })
    .catch((err) => {
      console.log("error:", err);
    });
});

let server = app.listen(8080, () => {
  console.log("Listening", server.address().port);
});
