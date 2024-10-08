const express = require("express");
const axios = require("axios");
const cron = require("node-cron");

const app = express();
const port = 3000 || process.env.PORT;

const urls = [
  "https://axltbot-backend.onrender.com/status",
  "https://apiping2.onrender.com/ping",
  'https://tesis-4w8o.onrender.com',
  'https://uniswamp-back.onrender.com',
];

app.get("/ping", (req, res) => {
  res.send("API 1 is active");
});

cron.schedule('*/30 * * * * *', async () => {
  for (const url of urls) {
    try {
      const response = await axios.get(url);
      console.log(`Response from ${url}: ${response.data}`);
    } catch (error) {
      console.error(`Error pinging ${url}: `, error);
    }
  }
});

app.listen(port, () => {
  console.log(`API ping listening at http://localhost:${port}`);
});
