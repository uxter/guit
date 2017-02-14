// import root from '../root';
import { runSpecs } from '../runner';
import express from 'express';
import path from 'path';
import http from 'http';
import socketIo from 'socket.io'

const tmpDir = path.join(process.cwd(), 'tmp')
const bootstrapDir = path.join(__dirname, '../../node_modules/bootstrap/dist');
const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, '../../', 'static')));
app.use('/bootstrap/', express.static(bootstrapDir));
app.use('/data/', express.static(path.join(process.cwd(), 'tests/data')));
app.use('/tmp/', express.static(tmpDir));

let socket = null;
io.on('connection', (_socket) => {
    socket = _socket;
    _socket.on('spec::run', runSpecs);
    _socket.on('disconnect', () => { socket = null });
});

export async function onUpdateBrowser(browser) {
    if (!socket) return;
    let pathname = path.join(tmpDir, 'current.png');
    await browser.render(pathname);
    socket.emit('image::update', '/tmp/current.png?r' + Math.random());
}

export function printLog(type, cmd, title, status) {
    if (!socket) return;
    socket.emit('log', { type, cmd, title, status });
}

export function runUI(uiPort) {
    server.listen(uiPort);
}
