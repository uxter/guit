import root from './root';

export function beforeAll(fn) {
    root.currentSuite.beforeAllList.push(fn);
}

export function beforeEach(fn) {
    root.currentSuite.beforeEachList.push(fn);
}

export function afterEach(fn) {
    root.currentSuite.afterEachList.push(fn);
}

export function afterAll(fn) {
    root.currentSuite.afterAllList.push(fn);
}
