import express from 'express';
import http from 'http';
import path from 'path';
const app = express();
const server = http.createServer(app);
app.use(express.static(path.join(__dirname, 'static')));
export function runServer(port) {
    return new Promise(resolve => server.listen(port, () => {
        console.log('Example server listening on port ' + port + '!');
        resolve(server.close.bind(server));
    }));
}
