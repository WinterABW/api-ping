const express = require('express');
const axios = require('axios');
const cron = require('node-cron');

const app = express();
const port = 3000 || process.env.PORT;

// Endpoint para verificar que la API 1 está activa
app.get('/ping', (req, res) => {
    res.send('API 1 is active');
});

// Tarea programada para hacer ping a otra API cada 30 segundos
cron.schedule('*/30 * * * * *', async () => {
    try {
        const response = await axios.get('https://axltbot-backend.onrender.com/status');
        console.log(`API fetch response: ${response.data}`);
    } catch (error) {
        console.error('Error pinging API fetch: ', error);
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API ping listening at http://localhost:${port}`);
});
