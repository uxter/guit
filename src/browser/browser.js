import phantom from 'phantom';
import path from 'path';
import imageDiff from 'image-diff';
import Progress from './progress';
import Snapshot from './snapshot';

export default class Browser {

    constructor(config) {
        this.checkTimeout = config.checkTimeout;
        this.doneTimeout = config.doneTimeout;
        this.viewportSize = { width: config.width, height: config.height };
        this.page = phantom.create(config.args || [])
            .then(instance => this.createPage(instance));
        this.snapshot = new Snapshot(this.page);
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
        this.page.then(page => page.open(url)).catch(() => {});
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
        let p = this.progress();
        this.page.then(page => page.sendEvent(type, x, y, button)).catch(() => {});
        return p;
    }

    keyboardEvent(type, key) {
        let p = this.progress();
        this.page.then(page => page.sendEvent(type, key)).catch(() => {});
        return p;
    }

    async diffView(actualImage, expectedImage, diffImage) {
        await this.render(path.resolve(actualImage));
        return await new Promise((resolve, reject) => {
            imageDiff.getFullResult({
                actualImage: path.resolve(actualImage),
                expectedImage: path.resolve(expectedImage),
                diffImage: path.resolve(diffImage),
            }, (err, result) => (err ? reject(err) : resolve(result)));
        });
    }

    getSnapshot() {
        return this.snapshot.get.apply(this.snapshot, arguments);
    }

    saveSnapshot() {
        return this.snapshot.save.apply(this.snapshot, arguments);
    }

    loadSnapshot() {
        return this.snapshot.load.apply(this.snapshot, arguments);
    }

    diffSnapshot() {
        return this.snapshot.diff.apply(this.snapshot, arguments);
    }

}
