import Suite from './spec/suite';
import Spec from './spec/spec';
import { beforeAll, beforeEach, afterEach, afterAll } from './spec/helpers';
import { addReporter } from './report';
import expect from './expect';
import root from './root';

global.describe = (title, fn) => new Suite(title, fn);
global.it = (title, fn) => new Spec(title, fn);
global.beforeAll = beforeAll;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.afterAll = afterAll;
global.expect = expect;

export function configure(config = {}) { Object.assign(root.config, config); }
export { default as TerminalReporter } from './reporter/terminal-reporter';
export { default as JunitReporter } from './reporter/junit-reporter';
export { runSpecs } from './runner';
export { addReporter };
export { default as importSpecs } from './import';

export function make(config) {
    // @TODO create specs from JSON
}
