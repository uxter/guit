import colors from 'colors/safe';

export default class TerminalReporter {

    constructor() {
        this.print = global.console && global.console.log || (() => {});
        this.totalSpecsExecuted = 0;
        this.totalSpecsFailed = 0;
        this.failures = [];
        this.isSuiteJustDone = false;
    }

    indent(depth) {
        return new Array(depth + 1).join('  ');
    }

    printWithIndent(str, depth = 0) {
        this.print(this.indent(depth) + str);
    }

    printFailures() {
        this.print('********************************');
        this.print('*           Failures           *');
        this.print('********************************');
        this.print('');
        this.failures.forEach((spec, i) => {
            this.print((i + 1) + ') '+ spec.suite.path.map(suite => suite.title).join(' ==> '));
            this.printWithIndent(colors.red('[FAILED] ' + spec.title), 1);
            this.printWithIndent(colors.red('- ' + spec.error.message), 2);
            this.print('');
        });
        this.print('********************************');
    }

    started() {
        this.startTime = Date.now();
        this.print('Started');
    }

    suiteStarted(suite) {
        this.isSuiteJustDone = false;
        this.print('');
        this.printWithIndent(suite.title, suite.path.length);
    }

    specDone(spec) {
        let depth = spec.suite.path.length + 1;
        this.totalSpecsExecuted++;
        if (this.isSuiteJustDone) this.print('');
        this.isSuiteJustDone = false;
        if (spec.error) {
            this.totalSpecsFailed++;
            this.failures.push(spec);
            this.printWithIndent(colors.red('[FAILED] ' + spec.title), depth);
            this.printWithIndent(colors.red('- ' + spec.error.message), depth + 1);
        } else {
            this.printWithIndent(colors.green('[OK] ' + spec.title), depth);
        }
    }

    suiteDone() {
        this.isSuiteJustDone = true;
    }

    done() {
        let statusStr = this.totalSpecsFailed > 0 ?
            colors.red('(' + this.totalSpecsFailed + ' FAILED)') :
            colors.green('(SUCCESS)');
        let duration = (Date.now() - this.startTime) / 1000;
        let str = 'Executed ' + this.totalSpecsExecuted + ' specs ' +
            statusStr + ' in ' + duration + ' sec.';
        this.print('');
        if (this.totalSpecsFailed > 0) {
            this.printFailures();
        }
        this.print(str);
    }

}
