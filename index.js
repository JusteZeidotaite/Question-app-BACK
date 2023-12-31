const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");

const answerRouter = require("./api/routes/answer");
const questionGroupRouter = require("./api/routes/question");
const user = require("./api/routes/user");
require("dotenv").config();
const mongoose = require("mongoose");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(answerRouter);
app.use(questionGroupRouter);
app.use(user);

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log("err", err);
  });

app.listen(process.env.PORT, () => {
  console.log("Your app is alive!!!!!");
});