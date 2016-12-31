import GUIT from './lib/guit';
import expect from 'expect';
import { bold, red, green } from 'colors/safe';

function it(title, cb) {
    this.items.push({ title, type: 'it', cb: cb });
}

function beforeEach(cb) {
    this.items.push({ type: 'beforeEach', cb: cb });
}

function beforeAll(cb) {
    this.items.push({ type: 'beforeAll', cb: cb });
}

function afterEach(cb) {
    this.items.push({ type: 'afterEach', cb: cb });
}

function afterAll(cb) {
    this.items.push({ type: 'afterAll', cb: cb });
}

let tests = [];
let report = [];

global.expect = expect;
global.describe = function(title, cb) {
    let context = { title, items: [] };
    global.it = it.bind(context);
    global.beforeEach = beforeEach.bind(context);
    global.beforeAll = beforeAll.bind(context);
    global.afterEach = afterEach.bind(context);
    global.afterAll = afterAll.bind(context);
    cb.call(context);
    tests.push(context);
};

export default {
    create: function(config) {
        return new GUIT(config);
    },
    run: async function run(cb) {
        for (let test of tests) {
            report[test.title] = {};
            console.log(bold(test.title));
            let allContext = {};
            for (let item of test.items) {
                if (item.type === 'beforeAll') {
                    await item.cb.call(allContext);
                }
            }
            for (let item of test.items) {
                if (item.type === 'it') {
                    let eachContext = {...allContext};
                    for (let item of test.items) {
                        if (item.type === 'beforeEach') {
                            await item.cb.call(eachContext);
                        }
                    }
                    try {
                        await item.cb.call(eachContext);
                        report[test.title][item.title] = { status: true };
                        console.info('    ' + green(item.title + ' - ' + bold('OK')));
                    } catch (e) {
                        report[test.title][item.title] = {
                            status: false,
                            message: e.message
                        };
                        console.error('    ' + red(item.title + ' - ' + bold('Fail')));
                        console.error('        ' + red(e.message));
                    }
                    for (let item of test.items) {
                        if (item.type === 'afterEach') {
                            await item.cb.call(eachContext);
                        }
                    }
                }
            }
            for (let item of test.items) {
                if (item.type === 'afterAll') {
                    await item.cb.call(allContext);
                }
            }
        }
        typeof cb === 'function' && cb(report);
        return report;
    }
};
