const express = require('express');
const getHello = require('./routes/getHello');
const app = express();
const {collectDefaultMetrics, register} = require("prom-client");

collectDefaultMetrics();

app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.get("/", getHello);

app.listen(3000, () => console.log('Listening on port 3000'));

const gracefulShutdown = () => {
  process.exit();
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);
