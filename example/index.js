import {
    configure,
    runSpecs,
    addReporter,
    TerminalReporter,
    JunitReporter,
    importSpecs
} from '../src/guit';

importSpecs({
    specDir: 'example/spec',
    specFiles: [
        ".*-spec.js"
    ]
});

configure({ report: { junitFilename: 'tmp/junitresults.xml' } });

addReporter(TerminalReporter);
addReporter(JunitReporter);
runSpecs();
