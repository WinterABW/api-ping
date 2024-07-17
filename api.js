const express = require("express");
const axios = require("axios");
const cron = require("node-cron");

const app = express();
const port = 3000 || process.env.PORT;

// Lista de URLs a las que se les va a hacer ping
const urls = [
  "https://axltbot-backend.onrender.com/status",
  "https://apiping2.onrender.com/ping",
  'https://tesis-4w8o.onrender.com',
];

app.get("/ping", (req, res) => {
  res.send("API 1 is active");
});

// Tarea programada para hacer ping a todas las URLs cada minuto
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

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API ping listening at http://localhost:${port}`);
});
