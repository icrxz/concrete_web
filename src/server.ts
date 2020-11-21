import express from 'express';
import path from 'path';
import serveStatic from 'serve-static';

const app = express();

app.use(serveStatic(path.join(__dirname, '/dist')));
const port = process.env.PORT || 8080;

app.listen(port);
console.log(`app is listening on port: ${port}`);
