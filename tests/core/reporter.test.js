import expect from 'expect';
import Reporter from '../../src/core/reporter';
import Suite from '../../src/core/suite';
import Spec from '../../src/core/spec';

describe('core/reporter specs:', function () {

    describe('exceptions specs:', function () {

        it('constructor should throw an exception if a first argument is not an object.', function () {

            expect(function () {
                new Reporter(1);
            }).toThrow('A first argument must be an object.');

        });

        it('constructor should throw an exception if a specification of a report strategy not implement a method "started".', function () {

            class SomeReporStrategy {
                suiteStarted() {}
                specStarted() {}
                specDone() {}
                suiteDone() {}
                done() {}
            }
            expect(function () {
                new Reporter(new SomeReporStrategy());
            }).toThrow('SomeReporStrategy specification must implement a method "started".');

        });

        it('constructor should throw an exception if a specification of a report strategy not implement a method "suiteStarted".', function () {

            class SomeReporStrategy {
                started() {}
                specStarted() {}
                specDone() {}
                suiteDone() {}
                done() {}
            }
            expect(function () {
                new Reporter(new SomeReporStrategy());
            }).toThrow('SomeReporStrategy specification must implement a method "suiteStarted".');

        });

        it('constructor should throw an exception if a specification of a report strategy not implement a method "specStarted".', function () {

            class SomeReporStrategy {
                started() {}
                suiteStarted() {}
                specDone() {}
                suiteDone() {}
                done() {}
            }
            expect(function () {
                new Reporter(new SomeReporStrategy());
            }).toThrow('SomeReporStrategy specification must implement a method "specStarted".');

        });

        it('constructor should throw an exception if a specification of a report strategy not implement a method "specDone".', function () {

            class SomeReporStrategy {
                started() {}
                suiteStarted() {}
                specStarted() {}
                suiteDone() {}
                done() {}
            }
            expect(function () {
                new Reporter(new SomeReporStrategy());
            }).toThrow('SomeReporStrategy specification must implement a method "specDone".');

        });

        it('constructor should throw an exception if a specification of a report strategy not implement a method "suiteDone".', function () {

            class SomeReporStrategy {
                started() {}
                suiteStarted() {}
                specStarted() {}
                specDone() {}
                done() {}
            }
            expect(function () {
                new Reporter(new SomeReporStrategy());
            }).toThrow('SomeReporStrategy specification must implement a method "suiteDone".');

        });

        it('constructor should throw an exception if a specification of a report strategy not implement a method "done".', function () {

            class SomeReporStrategy {
                started() {}
                suiteStarted() {}
                specStarted() {}
                specDone() {}
                suiteDone() {}
            }
            expect(function () {
                new Reporter(new SomeReporStrategy());
            }).toThrow('SomeReporStrategy specification must implement a method "done".');

        });

        class SomeReporStrategy {
            started() {}
            suiteStarted() {}
            specStarted() {}
            specDone() {}
            suiteDone() {}
            done() {}
        }

        it('suiteStarted should throw an exception if a first argument is not an object', function () {

            let reporterInstance = new Reporter(new SomeReporStrategy());
            expect(function () {
                reporterInstance.suiteStarted(1);
            }).toThrow('A first argument must be an object.');

        });

        it('suiteStarted should throw an exception if a first argument is not an instance of Suite', function () {

            let reporterInstance = new Reporter(new SomeReporStrategy());
            expect(function () {
                reporterInstance.suiteStarted({});
            }).toThrow('A first argument must be an instance of Suite.');

        });

        it('specStarted should throw an exception if a first argument is not an object', function () {

            let reporterInstance = new Reporter(new SomeReporStrategy());
            expect(function () {
                reporterInstance.specStarted(1);
            }).toThrow('A first argument must be an object.');

        });

        it('specStarted should throw an exception if a first argument is not an instance of Spec', function () {

            let reporterInstance = new Reporter(new SomeReporStrategy());
            expect(function () {
                reporterInstance.specStarted({});
            }).toThrow('A first argument must be an instance of Spec.');

        });

        it('specDone should throw an exception if a first argument is not an object', function () {

            let reporterInstance = new Reporter(new SomeReporStrategy());
            expect(function () {
                reporterInstance.specDone(1);
            }).toThrow('A first argument must be an object.');

        });

        it('specDone should throw an exception if a first argument is not an instance of Spec', function () {

            let reporterInstance = new Reporter(new SomeReporStrategy());
            expect(function () {
                reporterInstance.specDone({});
            }).toThrow('A first argument must be an instance of Spec.');

        });

        it('suiteDone should throw an exception if a first argument is not an object', function () {

            let reporterInstance = new Reporter(new SomeReporStrategy());
            expect(function () {
                reporterInstance.suiteDone(1);
            }).toThrow('A first argument must be an object.');

        });

        it('suiteDone should throw an exception if a first argument is not an instance of Suite', function () {

            let reporterInstance = new Reporter(new SomeReporStrategy());
            expect(function () {
                reporterInstance.suiteDone({});
            }).toThrow('A first argument must be an instance of Suite.');

        });

    });

    describe('working specs:', function () {

        it('started should call strategy.started', function (done) {

            class SomeReporStrategy {
                started() {
                    done();
                }
                suiteStarted() {}
                specStarted() {}
                specDone() {}
                suiteDone() {}
                done() {}
            }
            let reporterInstance = new Reporter(new SomeReporStrategy());
            reporterInstance.started();

        });

        it('suiteStarted should call strategy.suiteStarted', function (done) {

            class SomeReporStrategy {
                started() {}
                suiteStarted(suiteInstance) {
                    expect(suiteInstance instanceof Suite).toBe(true);
                    done();
                }
                specStarted() {}
                specDone() {}
                suiteDone() {}
                done() {}
            }
            let reporterInstance = new Reporter(new SomeReporStrategy());
            reporterInstance.suiteStarted(new Suite('Some specs', function() {}));

        });

        it('specStarted should call strategy.specStarted', function (done) {

            class SomeReporStrategy {
                started() {}
                suiteStarted() {}
                specStarted(specInstance) {
                    expect(specInstance instanceof Spec).toBe(true);
                    done();
                }
                specDone() {}
                suiteDone() {}
                done() {}
            }
            let reporterInstance = new Reporter(new SomeReporStrategy());
            reporterInstance.specStarted(new Spec('should', function() {}));

        });

        it('specDone should call strategy.specDone', function (done) {

            class SomeReporStrategy {
                started() {}
                suiteStarted() {}
                specStarted() {}
                specDone(specInstance) {
                    expect(specInstance instanceof Spec).toBe(true);
                    done();
                }
                suiteDone() {}
                done() {}
            }
            let reporterInstance = new Reporter(new SomeReporStrategy());
            reporterInstance.specDone(new Spec('should', function() {}));

        });

        it('suiteDone should call strategy.suiteDone', function (done) {

            class SomeReporStrategy {
                started() {}
                suiteStarted() {}
                specStarted() {}
                specDone() {}
                suiteDone(suiteInstance) {
                    expect(suiteInstance instanceof Suite).toBe(true);
                    done();
                }
                done() {}
            }
            let reporterInstance = new Reporter(new SomeReporStrategy());
            reporterInstance.suiteDone(new Suite('Some specs', function() {}));

        });

        it('done should call strategy.done', function (done) {

            class SomeReporStrategy {
                started() {}
                suiteStarted() {}
                specStarted() {}
                specDone() {}
                suiteDone() {}
                done() {
                    done();
                }
            }
            let reporterInstance = new Reporter(new SomeReporStrategy());
            reporterInstance.done();

        });

    });

});
