import Suite from './lib/spec/suite';
import Spec from './lib/spec/spec';
import { beforeAll, beforeEach, afterEach, afterAll } from './lib/spec/helpers';
import expect from 'expect';
export { runSpecs } from './lib/spec/runner';

global.describe = (title, fn) => new Suite(title, fn);
global.it = (title, fn) => new Spec(title, fn);
global.beforeAll = beforeAll;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.afterAll = afterAll;

global.expect = expect;

/*
value => {
    let exp = expect(value);
    return new Proxy(exp, {
        get: function(target, name) {
            if (name in target && name.indexOf('to') === 0 && typeof target[name] === 'function') {
                return () => {
                    try {
                        return target[name].apply(this, arguments);
                    } catch(e) {
                        // @TODO call reporter method
                        console.log(e);
                    }
                }
            }
        }
    });
};
*/

export function make(config) {
    // @TODO handle JSON
}

export function addReporter(reporter) {

}
