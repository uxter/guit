import expect from 'expect';
import Runner from '../../src/core/runner';

describe('core/runner specs:', function () {

    describe('exceptions specs:', function () {

        it('constructor should throw an exception if a first argument is not an object.', function () {

            expect(function () {
                new Runner(1);
            }).toThrow('A first argument must be an object.');

        });

        it('setStatus should throw an exception if a status is not supported.', function () {

            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            expect(function () {
                runnerInstance.setStatus('done');
            }).toThrow('Status done is not supported.');

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

            class SomeReporStrategy {
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
                runnerInstance.addReporterStrategy(new SomeReporStrategy());
            }).toThrow('SomeReporStrategy specification must implement a method "started".');

        });

        it('addReporterStrategy should throw an exception if a specification of a report strategy not implement a method "suiteStarted".', function () {

            class SomeReporStrategy {
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
                runnerInstance.addReporterStrategy(new SomeReporStrategy());
            }).toThrow('SomeReporStrategy specification must implement a method "suiteStarted".');

        });

        it('addReporterStrategy should throw an exception if a specification of a report strategy not implement a method "specStarted".', function () {

            class SomeReporStrategy {
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
                runnerInstance.addReporterStrategy(new SomeReporStrategy());
            }).toThrow('SomeReporStrategy specification must implement a method "specStarted".');

        });

        it('addReporterStrategy should throw an exception if a specification of a report strategy not implement a method "specDone".', function () {

            class SomeReporStrategy {
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
                runnerInstance.addReporterStrategy(new SomeReporStrategy());
            }).toThrow('SomeReporStrategy specification must implement a method "specDone".');

        });

        it('addReporterStrategy should throw an exception if a specification of a report strategy not implement a method "suiteDone".', function () {

            class SomeReporStrategy {
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
                runnerInstance.addReporterStrategy(new SomeReporStrategy());
            }).toThrow('SomeReporStrategy specification must implement a method "suiteDone".');

        });

        it('addReporterStrategy should throw an exception if a specification of a report strategy not implement a method "done".', function () {

            class SomeReporStrategy {
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
                runnerInstance.addReporterStrategy(new SomeReporStrategy());
            }).toThrow('SomeReporStrategy specification must implement a method "done".');

        });

    });

    describe('working specs:', function () {

    });

});
