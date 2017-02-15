import fs from 'fs';
import path from 'path';
import builder from 'xmlbuilder';

export default class JunitReporter {

    constructor(config) {
        this.filename = config.junitFilename;
        if (!this.filename) return;
        this.suiteList = [];
        this.specList = [];
        this.reportSuiteList = [];
        this.reportSpecList = [];
        this.testSuites = {
            '@tests': 0,
            '@failures': 0,
            '@time': 0,
            testsuite: []
        };
    }

    started() {
        if (!this.filename) return;
        this.startTime = Date.now();
    }

    suiteStarted(suite) {
        if (!this.filename) return;
        this.suiteList.push(suite);
        let reportSuite = {
            startTime: Date.now(),
            data: {
                '@name': suite.path.map(item => item.title).join('.'),
                '@tests': 0,
                '@failures': 0,
                '@time': 0,
                testcase: []
            }
        };
        this.reportSuiteList.push(reportSuite);
        this.testSuites.testsuite.push(reportSuite.data);
    }

    specStarted(spec) {
        if (!this.filename) return;
        let suiteIndex = this.suiteList.indexOf(spec.suite);
        let reportSuite = this.reportSuiteList[suiteIndex];
        let reportSpec = {
            startTime: Date.now(),
            data: {
                '@classname': reportSuite.data['@name'],
                '@name': spec.title,
                '@time': 0
            }
        };
        this.specList.push(spec);
        this.reportSpecList.push(reportSpec);
    }

    specDone(spec) {
        if (!this.filename) return;
        let specIndex = this.specList.indexOf(spec);
        let suiteIndex = this.suiteList.indexOf(spec.suite);
        let reportSpec = this.reportSpecList[specIndex];
        let reportSuite = this.reportSuiteList[suiteIndex];
        this.testSuites['@tests']++;
        reportSuite.data['@tests']++;
        if (spec.error) {
            this.testSuites['@failures']++;
            reportSuite.data['@failures']++;
            reportSpec.data.failure = {
                '@type': spec.error.type,
                '@message': spec.error.message,
                '#text': spec.error.stack
            };
        }
        reportSpec.data['@time'] = (Date.now() - reportSpec.startTime) / 1000;
        reportSuite.data.testcase.push(reportSpec.data);
    }

    suiteDone(suite) {
        if (!this.filename) return;
        let suiteIndex = this.suiteList.indexOf(suite);
        let reportSuite = this.reportSuiteList[suiteIndex];
        reportSuite.data['@time'] = (Date.now() - reportSuite.startTime) / 1000;
    }

    done() {
        if (!this.filename) return;
        this.testSuites['@time'] = (Date.now() - this.startTime) / 1000;
        let xml = builder.create('testsuites', { version: '1.0', encoding: 'UTF-8' })
            .ele(this.testSuites).end({ pretty: true});
        fs.writeFileSync(path.join(process.cwd(), this.filename), xml);
    }

}
