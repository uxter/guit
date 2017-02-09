import phantom from 'phantom';
import path from 'path';
import { writeFile, readFile } from 'fs';
import { diff as objectDiff } from 'deep-object-diff';
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

    getSnapshot(ignoreAttributes = []) {
        return this.page.then(page => page.evaluate(() => {
            let getAttributes = (element) => {
                let attributes = {};
                for (let i = 0; i < (element.attributes || []).length; i++) {
                    attributes[element.attributes[i].name] = element.attributes[i].value;
                }
                return attributes;
            };
            let getStyle = (element) => {
                let rules = {};
                let computedStyle = window.getComputedStyle(element);
                if (!computedStyle) return rules;
                computedStyle.cssText.split('; ').forEach(function(rule) {
                    let chunks = rule.split(': ');
                    rules[chunks[0]] = chunks[1];
                });
                return rules;
            };
            let getChildren = (element) => {
                if (!element.children) return [];
                return Array.prototype.slice.call(element.children).map(elementToStructure);
            };
            let elementToStructure = (element) => {
                return {
                    name: element.nodeName,
                    children: getChildren(element),
                    attributes: getAttributes(element),
                    html: element.innerHTML,
                    style: getStyle(element)
                };
            };
            return elementToStructure(document.body);
        })).then(snapshot => JSON.parse(JSON.stringify(snapshot, (key, value) => {
            if (key === 'style' && !style) return;
            if (key === 'attributes' && !attributes) return;
            if (key === 'html' && !html) return;
            if (ignoreAttributes.indexOf(key) !== -1) return;
            return value;
        })));
    }

    saveSnapshot(pathname, snapshot) {
        return new Promise((resolve, reject) => {
            writeFile(path.resolve(pathname), JSON.stringify(snapshot), err => {
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

    async diffSnapshot(pathname, ignoreAttributes) {
        let actual = await this.getSnapshot(ignoreAttributes);
        let original = await this.loadSnapshot(pathname);
        return objectDiff(actual, original);
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

}

