import fs from 'fs';
import path from 'path';
import root from '../root';
import runServer from './server';
import { importHelpers, importSpecs } from '../import';
import { runSpecs } from '../runner';
import { addReporter } from '../report';
import BrowserReporter from '../reporter/browser-reporter';

const tmpDir = path.join(process.cwd(), 'tmp');

function bindEvents(socket, config) {

    root.socket = socket;

    socket.on('helpers::load', () => {
        root.helpers = {};
        if (config.helperDir) {
            importHelpers({
                helperDir: config.helperDir,
                helperFiles: config.helperFiles
            });
        }
        socket.emit('helpers::list', Object.keys(root.helpers));
    });

    socket.on('specs::load', () => {
        root.items = [];
        if (config.specDir) {
            importSpecs({
                specDir: config.specDir,
                specFiles: config.specFiles
            });
        }
        let specsList = root.items
            .filter(item => !!item.source)
            .map(item => item.source);
        socket.emit('specs::list', specsList);
    });


    socket.on('specs::run', () => {
        root.currentSuite = null;
        root.currentSpec = null;
        runSpecs(true);
    });

    socket.on('call::action', (data) => {
        if (data.action === 'checkUI') {
            data.args.push(true);
        }
        if (root.helpers[data.action]) {
            root.helpers[data.action].apply(root.socket, data.args);
        }
    });

    socket.on('specs::save', (data) => {
        if (!data.filename) {
            return;
        }
        let filename = path.join(process.cwd(), data.filename);
        delete data.filename;
        fs.writeFile(filename, JSON.stringify(data, null, 4), (err) => {
            if(err) {
                return console.log(err);
            }
            console.log('The file was saved!');
        });
    });

    socket.on('disconnect', () => { delete root.socket; });

}

export async function onUpdateBrowser(browser) {
    if (!root.socket) return;
    let pathname = path.join(tmpDir, 'current.png');
    await browser.render(pathname);
    root.socket.emit('browser::update', '/tmp/current.png?r' + Math.random());
}

export function printLog(type, cmd, title, status) {
    if (!root.socket) return;
    root.socket.emit('log::write', { type, cmd, title, status });
}

export function runUI(config) {
    Object.assign(root.config, config);
    addReporter(BrowserReporter);
    runServer(config).on('connection', (socket) => {
        bindEvents(socket, config);
    });
}
