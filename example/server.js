import express from 'express';
import http from 'http';
const app = express();
const server = http.createServer(app);
app.use(express.static('static'));
export function runServer(port) {
    return new Promise(resolve => server.listen(port, () => {
        console.log('Example server listening on port 3000!');
        resolve(server.close.bind(server));
    }));
}
