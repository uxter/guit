import phantom from 'phantom';
import {writeFile, readFile} from 'fs';
import imageDiff from 'image-diff';
import Progress from './progress';

export default class Browser {

    constructor(config) {
        this.checkTimeout = config.checkTimeout;
        this.doneTimeout = config.doneTimeout;
        this.viewportSize = { width: config.width, height: config.height };
        this.page = phantom.create().then(instance => this.createPage(instance));
    }

    createPage(instance) {
        return instance.createPage().then(page => {
            page.property('viewportSize', this.viewportSize);
            return page;
        });
    }

    progress() {
        return new Promise(resolve => this.page
            .then(page => new Progress({
                page,
                done: resolve,
                checkTimeout: this.checkTimeout,
                doneTimeout: this.doneTimeout
            })));
    }

    open(url) {
        let p = this.progress();
        return this.page.then(page => page.open(url));
        return p;
    }

    close() {
        return this.page.then(page => page.close());
    }

    exit() {
        return this.page.then(page => page.phantom.exit());
    }

    render(path) {
        return this.page.then(page => page.render(path));
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }

    mouseEvent(type, x, y, button = 'left') {
        return this.page.then(page => page.sendEvent(type, x, y, button));
    }

    getSnapshot() {
        return this.page.then(page => page.evaluate(() => Array.prototype.slice
            .call(document.querySelectorAll('*'))
            .map((el) => window.getComputedStyle(el).cssText.split('; ').map(rule => {
                let result = {};
                let chunks = rule.split(': ');
                result[chunks[0]] = chunks[1];
                return result;
            }))));
    }

    saveSnapshot(pathname, snapshot) {
        return new Promise((resolve, reject) => {
            writeFile(pathname, JSON.stringify(snapshot), err => {
                if (err) reject();
                else resolve();
            });
        });
    }

    loadSnapshot(pathname) {
        return new Promise((resolve, reject) => {
            readFile(pathname, (err, data) => {
                if (err) reject();
                else resolve(JSON.parse(data));
            });
        });
    }

    async diffView(actualImage, expectedImage, diffImage) {
        await this.render(actualImage);
        return await new Promise((resolve, reject) => {
            imageDiff.getFullResult({
                actualImage: actualImage,
                expectedImage: expectedImage,
                diffImage: diffImage,
            }, (err, result) => (err ? reject() : resolve(result)));
        });
    }

}

