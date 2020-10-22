// server.js
import express from 'express';
import serveStatic from 'serve-static';

const app = express();

app.use(serveStatic(__dirname + "/dist"));
const port = process.env.PORT || 8080;

app.listen(port);
