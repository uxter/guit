import express from 'express';
import path from 'path';
import http from 'http';
import socketIo from 'socket.io'

const tmpDir = path.join(process.cwd(), 'tmp');
const bootstrapDir = path.join(__dirname, '../../node_modules/bootstrap/dist');

export default function runServer(config) {

    let app = express();
    let server = http.Server(app);
    let io = socketIo(server);

    app.use(express.static(path.join(__dirname, '../../', 'static')));
    app.use('/bootstrap/', express.static(bootstrapDir));
    app.use('/data/', express.static(path.join(process.cwd(), 'tests/data')));
    app.use('/tmp/', express.static(tmpDir));

    server.listen(config.uiPort);

    return io;

}
