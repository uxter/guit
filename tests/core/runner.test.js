import expect from 'expect';
import Runner from '../../src/core/runner';
import Composite from '../../src/core/composite';
import File from '../../src/core/file';

describe('core/runner specs:', function () {

    describe('exceptions specs:', function () {

        it('constructor should throw an exception if a first argument is not an object.', function () {

            expect(function () {
                new Runner(1);
            }).toThrow('A first argument must be an object.');

        });

        it('addBuilderStrategy should throw an exception if a first argument is not an object.', function () {

            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            expect(function () {
                runnerInstance.addBuilderStrategy(true);
            }).toThrow('A first argument must be an object.');

        });

        it('addBuilderStrategy should throw an exception if a specification of a build strategy not implement a method "test".', function () {

            class SomeBuildStrategy {
                build() {}
            }
            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            expect(function () {
                runnerInstance.addBuilderStrategy(new SomeBuildStrategy());
            }).toThrow('SomeBuildStrategy specification must implement a method "test".');

        });

        it('addBuilderStrategy should throw an exception if a specification of a build strategy not implement a method "build".', function () {

            class SomeBuildStrategy {
                test() {}
            }
            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            expect(function () {
                runnerInstance.addBuilderStrategy(new SomeBuildStrategy());
            }).toThrow('SomeBuildStrategy specification must implement a method "build".');

        });

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

        it('runPathHelpers should reject if a first argument is not an instance of Composite.', function (done) {

            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            runnerInstance.runPathHelpers({}, 'beforeAll').catch(err => {
                expect(err.message).toBe('A first argument must be an instance of Composite.');
                done();
            });

        });

        it('runPathHelpers should reject if a second argument is not a string.', function (done) {

            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            runnerInstance.runPathHelpers(new Composite(), 1).catch(err => {
                expect(err.message).toBe('A second argument must be a string.');
                done();
            });

        });

        it('runPathHelpers should reject if method is not supported.', function (done) {

            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            runnerInstance.runPathHelpers(new Composite(), 'unsupportedMethod').catch(err => {
                expect(err.message).toBe('Helper unsupportedMethod is not supported.');
                done();
            });

        });

        it('scan should reject if config is not correct', function(done) {

            let runnerInstance = new Runner({});
            runnerInstance.scan().catch(err => {
                expect(err.message).toBe('A first argument must be a string.');
                done();
            });

        });

        it('findBuilder should throw an exception if builder is not specified.', function() {

            let runnerInstance = new Runner({});
            let fileInstance = new File('path/to/file');
            expect(function() {
                runnerInstance.findBuilder(fileInstance);
            }).toThrow('Builder for path/to/file is not specified.');


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

        it('scan should resolve txt files.', function (done) {

            let runnerInstance = new Runner({
                specs: 'tests/mocks/scan-dir/**/*.txt'
            });
            runnerInstance.scan().then(() => {
                let files = [];
                for (let file of runnerInstance.specFiles) {
                    files.push(file.path);
                }
                expect(files).toEqual([
                    'tests/mocks/scan-dir/scan-dir-test1.txt',
                    'tests/mocks/scan-dir/sub/scan-dir-test2.txt'
                ]);
                done();
            });

        });

        it('findBuilder should find one builder.', function () {

            class FirstBuildStrategy {
                test(fileInstance) {
                    let re = /\.txt$/;
                    return re.test(fileInstance.path);
                }

                build() {
                }
            }
            class SecondBuildStrategy {
                test(fileInstance) {
                    let re = /\.js$/;
                    return re.test(fileInstance.path);
                }
                build() {}
            }
            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            let firstBuildStrategyInstance = new FirstBuildStrategy();
            let secondBuildStrategyInstance = new SecondBuildStrategy();
            runnerInstance.addBuilderStrategy(firstBuildStrategyInstance);
            runnerInstance.addBuilderStrategy(secondBuildStrategyInstance);
            let builder = runnerInstance.findBuilder(new File('path/to/specs/spec.js'));
            expect(builder.strategy).toBe(secondBuildStrategyInstance);

        });

    });

});
