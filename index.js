import Suite from './lib/spec/suite';
import Spec from './lib/spec/spec';
import { beforeAll, beforeEach, afterEach, afterAll } from './lib/spec/helpers';
import expect from './lib/expect';
import root from './lib/root';

global.describe = (title, fn) => new Suite(title, fn);
global.it = (title, fn) => new Spec(title, fn);
global.beforeAll = beforeAll;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.afterAll = afterAll;
global.expect = expect;

export function configure(config = {}) { root.config = config; }
export { runSpecs } from './lib/runner';
export { addReporter } from './lib/report';

export function make(config) {
    // @TODO handle JSON
}
