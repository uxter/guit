import root from './root';
let reporterList = [];

export function addReporter(reporter) {
    reporterList.push(new reporter(root.config));
}

function callReporterMethod(reporter, methodName, data) {
    typeof reporter[methodName] === 'function' && reporter[methodName](data);
}

function eachReporter(name, data) {
    reporterList.forEach(reporter => callReporterMethod(reporter, name, data));
}

export function startedLog() {
    eachReporter('started');
}

export function suiteStartedLog(suite) {
    eachReporter('suiteStarted', suite);
}

export function specStartedLog(spec) {
    eachReporter('specStarted', spec);
}

export function specDoneLog(spec) {
    eachReporter('specDone', spec);
}

export function suiteDoneLog(suite) {
    eachReporter('suiteDone', suite);
}

export function doneLog() {
    eachReporter('done');
}
