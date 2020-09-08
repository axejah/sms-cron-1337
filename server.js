require("dotenv").config();

const accountSid = process.env.ACC_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);
const express = require("express");
const cron = require("node-cron");

const app = express();
const port = process.env.PORT || 5000;

function sendSms(num) {
  client.messages
    .create({
      body: "HAPPY 1337!!",
      from: "LEET",
      to: num,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
}

cron.schedule("37 13 * * *", () => {
  sendSms("+31629444605");
  sendSms("+31648228243");
});

cron.schedule("* * * * *", () => {
  console.log("Application is running. SMS will be send at 13:37.");
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
