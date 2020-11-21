import express from 'express';
import path from 'path';
import serveStatic from 'serve-static';

const app = express();

app.use(serveStatic(path.join(__dirname, '/dist')));
const port = process.env.PORT || 8080;

app.listen(port);
console.log(`app is listening on port: ${port}`);

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/src/app.vue'));
});
