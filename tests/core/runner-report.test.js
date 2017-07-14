import expect from 'expect';
import Composite from '../../src/core/composite';
import Runner from '../../src/core/runner';
import Suite from '../../src/core/suite';
import File from '../../src/core/file';
import Spec from '../../src/core/spec';

describe('core/runner report specs:', function () {

    describe('exceptions specs:', function () {

        it('addReporterStrategy should throw an exception if a first argument is not an object.', function () {

            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            expect(function () {
                runnerInstance.addReporterStrategy(true);
            }).toThrow('A first argument must be an object.');

        });

        it('addReporterStrategy should throw an exception if a specification of a report strategy not implement a method "started".', function () {

            class SomeReportStrategy {
                suiteStarted() {}
                specStarted() {}
                specDone() {}
                suiteDone() {}
                done() {}
            }
            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            expect(function () {
                runnerInstance.addReporterStrategy(new SomeReportStrategy());
            }).toThrow('SomeReportStrategy specification must implement a method "started".');

        });

        it('addReporterStrategy should throw an exception if a specification of a report strategy not implement a method "suiteStarted".', function () {

            class SomeReportStrategy {
                started() {}
                specStarted() {}
                specDone() {}
                suiteDone() {}
                done() {}
            }
            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            expect(function () {
                runnerInstance.addReporterStrategy(new SomeReportStrategy());
            }).toThrow('SomeReportStrategy specification must implement a method "suiteStarted".');

        });

        it('addReporterStrategy should throw an exception if a specification of a report strategy not implement a method "specStarted".', function () {

            class SomeReportStrategy {
                started() {}
                suiteStarted() {}
                specDone() {}
                suiteDone() {}
                done() {}
            }
            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            expect(function () {
                runnerInstance.addReporterStrategy(new SomeReportStrategy());
            }).toThrow('SomeReportStrategy specification must implement a method "specStarted".');

        });

        it('addReporterStrategy should throw an exception if a specification of a report strategy not implement a method "specDone".', function () {

            class SomeReportStrategy {
                started() {}
                suiteStarted() {}
                specStarted() {}
                suiteDone() {}
                done() {}
            }
            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            expect(function () {
                runnerInstance.addReporterStrategy(new SomeReportStrategy());
            }).toThrow('SomeReportStrategy specification must implement a method "specDone".');

        });

        it('addReporterStrategy should throw an exception if a specification of a report strategy not implement a method "suiteDone".', function () {

            class SomeReportStrategy {
                started() {}
                suiteStarted() {}
                specStarted() {}
                specDone() {}
                done() {}
            }
            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            expect(function () {
                runnerInstance.addReporterStrategy(new SomeReportStrategy());
            }).toThrow('SomeReportStrategy specification must implement a method "suiteDone".');

        });

        it('addReporterStrategy should throw an exception if a specification of a report strategy not implement a method "done".', function () {

            class SomeReportStrategy {
                started() {}
                suiteStarted() {}
                specStarted() {}
                specDone() {}
                suiteDone() {}
            }
            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            expect(function () {
                runnerInstance.addReporterStrategy(new SomeReportStrategy());
            }).toThrow('SomeReportStrategy specification must implement a method "done".');

        });

        it('report should throw an exception if a first argument is not a string.', function() {

            let runnerInstance = new Runner({});
            expect(function() {
                runnerInstance.report(1, new Composite());
            }).toThrow('A first argument must be a string.');

        });

        it('report should throw an exception if a method is not supported.', function() {

            let runnerInstance = new Runner({});
            expect(function() {
                runnerInstance.report('unsupportedMethod', new Composite());
            }).toThrow('Method unsupportedMethod is not supported.');

        });

        it('report should throw an exception if a second argument is not Composite instance or not null.', function() {

            let runnerInstance = new Runner({});
            expect(function() {
                runnerInstance.report('started', {});
            }).toThrow('A second argument must be an instance of Composite or null.');

        });

    });

    describe('working specs:', function () {

        it('report should call methods of reporter strategy with fails.', function(done) {

            let checkData = [
                [
                    "started"
                ],
                [
                    "suiteStarted",
                    "parentSuite"
                ],
                [
                    "specStarted",
                    "parentSpec1"
                ],
                [
                    "specDone",
                    "parentSpec1",
                    "success",
                    ""
                ],
                [
                    "suiteStarted",
                    "child1Suite"
                ],
                [
                    "specStarted",
                    "child1Spec1"
                ],
                [
                    "specDone",
                    "child1Spec1",
                    "success",
                    ""
                ],
                [
                    "specStarted",
                    "child1Spec2"
                ],
                [
                    "specDone",
                    "child1Spec2",
                    "fail",
                    "Some error."
                ],
                [
                    "specStarted",
                    "child1Spec3"
                ],
                [
                    "specDone",
                    "child1Spec3",
                    "fail",
                    "Some error."
                ],
                [
                    "suiteDone",
                    "child1Suite"
                ],
                [
                    "specStarted",
                    "parentSpec2"
                ],
                [
                    "specDone",
                    "parentSpec2",
                    "success",
                    ""
                ],
                [
                    "suiteStarted",
                    "child2Suite"
                ],
                [
                    "specStarted",
                    "child2Spec1"
                ],
                [
                    "specDone",
                    "child2Spec1",
                    "fail",
                    "Some error."
                ],
                [
                    "suiteDone",
                    "child2Suite"
                ],
                [
                    "suiteDone",
                    "parentSuite"
                ],
                [
                    "suiteStarted",
                    "parentSuite"
                ],
                [
                    "specStarted",
                    "parentSpec1"
                ],
                [
                    "specDone",
                    "parentSpec1",
                    "success",
                    ""
                ],
                [
                    "suiteStarted",
                    "child1Suite"
                ],
                [
                    "specStarted",
                    "child1Spec1"
                ],
                [
                    "specDone",
                    "child1Spec1",
                    "success",
                    ""
                ],
                [
                    "specStarted",
                    "child1Spec2"
                ],
                [
                    "specDone",
                    "child1Spec2",
                    "fail",
                    "Some error."
                ],
                [
                    "specStarted",
                    "child1Spec3"
                ],
                [
                    "specDone",
                    "child1Spec3",
                    "fail",
                    "Some error."
                ],
                [
                    "suiteDone",
                    "child1Suite"
                ],
                [
                    "specStarted",
                    "parentSpec2"
                ],
                [
                    "specDone",
                    "parentSpec2",
                    "success",
                    ""
                ],
                [
                    "suiteStarted",
                    "child2Suite"
                ],
                [
                    "specStarted",
                    "child2Spec1"
                ],
                [
                    "specDone",
                    "child2Spec1",
                    "fail",
                    "Some error."
                ],
                [
                    "suiteDone",
                    "child2Suite"
                ],
                [
                    "suiteDone",
                    "parentSuite"
                ],
                [
                    "done"
                ]
            ];

            let checkList = [];

            class SomeReportStrategy {
                started() {
                    checkList.push(['started']);
                }
                suiteStarted(instance) {
                    checkList.push([
                        'suiteStarted',
                        instance.title
                    ]);
                }
                specStarted(instance) {
                    checkList.push([
                        'specStarted',
                        instance.title
                    ]);
                }
                specDone(instance, status, message) {
                    checkList.push([
                        'specDone',
                        instance.title,
                        status,
                        message
                    ]);
                }
                suiteDone(instance) {
                    checkList.push([
                        'suiteDone',
                        instance.title
                    ]);
                }
                done() {
                    checkList.push(['done']);
                }
            }
            class BuilderStrategy {
                test() { return true; }
                build() { return parentSuite; }
            }

            let parentSuite = new Suite('parentSuite');
            let child1Suite = new Suite('child1Suite');
            let child2Suite = new Suite('child2Suite');
            let parentSpec2 = new Spec('parentSpec2', function () {
            });
            let child1Spec1 = new Spec('child1Spec1', function () {
            });
            let parentSpec1 = new Spec('parentSpec1', async function () {
                return Promise.resolve();
            });
            let child1Spec2 = new Spec('child1Spec2', async function () {
                throw new Error('Some error.');
            });
            let child1Spec3 = new Spec('child1Spec3', async function () {
                return Promise.reject(new Error('Some error.'));
            });
            let child2Spec1 = new Spec('child2Spec1', function () {
                throw new Error('Some error.');
            });

            parentSuite.addChild(parentSpec1);
            parentSuite.addChild(child1Suite);
            parentSuite.addChild(parentSpec2);
            parentSuite.addChild(child2Suite);
            child1Suite.addChild(child1Spec1);
            child1Suite.addChild(child1Spec2);
            child1Suite.addChild(child1Spec3);
            child2Suite.addChild(child2Spec1);

            let buildStrategyInstance = new BuilderStrategy();
            let runnerInstance = new Runner({
                specs: 'tests/mocks/scan-dir/**/*.txt'
            });

            runnerInstance.addBuilderStrategy(buildStrategyInstance);
            runnerInstance.addReporterStrategy(new SomeReportStrategy());
            runnerInstance.scan().then(() => runnerInstance.run()).then(() => {
                expect(JSON.stringify(checkList)).toBe(JSON.stringify(checkData));
                done();
            });

        });

    });

});
