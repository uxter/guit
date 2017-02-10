import path from 'path';
import { writeFile, readFile } from 'fs';
import { detailedDiff as objectDiff } from 'deep-object-diff';

export default class Snapshot {

    constructor(page) {
        this.page = page;
        this.reUnit = /[\d\.]/g;
        this.reValue = /[\d\.]+/g;
    }

    get(ignoreAttributes = []) {
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
                computedStyle.cssText.split('; ').forEach(function (rule) {
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
            for (let i = 0; i < ignoreAttributes.length; i++) {
                if (ignoreAttributes[i] instanceof RegExp && ignoreAttributes[i].test(key)) return;
                if (ignoreAttributes[i] === key) return;
            }
            return value;
        })));
    }

    save(pathname, snapshot) {
        return new Promise((resolve, reject) => {
            writeFile(path.resolve(pathname), JSON.stringify(snapshot), err => {
                if (err) reject();
                else resolve();
            });
        });
    }

    load(pathname) {
        return new Promise((resolve, reject) => {
            readFile(pathname, (err, data) => {
                if (err) reject();
                else resolve(JSON.parse(data));
            });
        });
    }

    checkDeviation(attr1, attr2, deviation) {
        deviation = deviation instanceof Array ? deviation : [deviation];
        if (attr1.replace(this.reUnit, '') !== attr2.replace(this.reUnit, '')) return false;
        let _v1 = attr1.match(this.reValue) || [];
        let _v2 = attr2.match(this.reValue) || [];
        let v1 = _v1.length > _v2.length ? _v1 : _v2;
        let v2 = _v1.length > _v2.length ? _v2 : _v1;
        for (let i = 0; i < v1.length; i++) {
            if (typeof deviation[i] === 'undefined') return false;
            if (typeof v2[i] === 'undefined') return false;
            if (Math.abs(v2[i] - v1[i]) > deviation[i]) return false;
        }
        return true;
    }

    fixDeviation(actual, original, deviationAttributes, _key) {
        if (typeof actual === 'object' && typeof original === 'object') {
            for (let key in actual) {
                if (key in original) {
                    actual[key] = this.fixDeviation(actual[key], original[key], deviationAttributes, key);
                }
            }
        }
        if (typeof actual !== 'object' &&
            typeof original !== 'object' &&
            typeof _key !== 'undefined' &&
            _key in deviationAttributes &&
            this.checkDeviation('' + actual, '' + original, deviationAttributes[_key])) {
            return original;
        }
        return actual;
    }

    diff(actual, original, deviationAttributes = {}) {
        this.fixDeviation(actual, original, deviationAttributes);
        return objectDiff(actual, original);
    }

}
