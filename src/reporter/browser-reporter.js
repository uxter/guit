import { printLog } from '../ui/server';

export default class BrowserReporter {

    started() {
        printLog('app', 'Started');
    }

    suiteStarted(suite) {
        printLog('suite', 'Suite started', suite.title);
    }

    specStarted(spec) {
        printLog('spec', 'Spec started', spec.title);
    }

    specDone(spec) {
        printLog('spec', 'Spec done', spec.title, !spec.error);
    }

    suiteDone(suite) {
        printLog('suite', 'Suite done', suite.title);
    }

    done() {
        printLog('app', 'Done');
    }

}
