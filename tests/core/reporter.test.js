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

            class SomeReportStrategy {
                suiteStarted() {}
                specStarted() {}
                specDone() {}
                suiteDone() {}
                done() {}
            }
            expect(function () {
                new Reporter(new SomeReportStrategy());
            }).toThrow('SomeReportStrategy specification must implement a method "started".');

        });

        it('constructor should throw an exception if a specification of a report strategy not implement a method "suiteStarted".', function () {

            class SomeReportStrategy {
                started() {}
                specStarted() {}
                specDone() {}
                suiteDone() {}
                done() {}
            }
            expect(function () {
                new Reporter(new SomeReportStrategy());
            }).toThrow('SomeReportStrategy specification must implement a method "suiteStarted".');

        });

        it('constructor should throw an exception if a specification of a report strategy not implement a method "specStarted".', function () {

            class SomeReportStrategy {
                started() {}
                suiteStarted() {}
                specDone() {}
                suiteDone() {}
                done() {}
            }
            expect(function () {
                new Reporter(new SomeReportStrategy());
            }).toThrow('SomeReportStrategy specification must implement a method "specStarted".');

        });

        it('constructor should throw an exception if a specification of a report strategy not implement a method "specDone".', function () {

            class SomeReportStrategy {
                started() {}
                suiteStarted() {}
                specStarted() {}
                suiteDone() {}
                done() {}
            }
            expect(function () {
                new Reporter(new SomeReportStrategy());
            }).toThrow('SomeReportStrategy specification must implement a method "specDone".');

        });

        it('constructor should throw an exception if a specification of a report strategy not implement a method "suiteDone".', function () {

            class SomeReportStrategy {
                started() {}
                suiteStarted() {}
                specStarted() {}
                specDone() {}
                done() {}
            }
            expect(function () {
                new Reporter(new SomeReportStrategy());
            }).toThrow('SomeReportStrategy specification must implement a method "suiteDone".');

        });

        it('constructor should throw an exception if a specification of a report strategy not implement a method "done".', function () {

            class SomeReportStrategy {
                started() {}
                suiteStarted() {}
                specStarted() {}
                specDone() {}
                suiteDone() {}
            }
            expect(function () {
                new Reporter(new SomeReportStrategy());
            }).toThrow('SomeReportStrategy specification must implement a method "done".');

        });

        class SomeReportStrategy {
            started() {}
            suiteStarted() {}
            specStarted() {}
            specDone() {}
            suiteDone() {}
            done() {}
        }

        it('suiteStarted should throw an exception if a first argument is not an object', function () {

            let reporterInstance = new Reporter(new SomeReportStrategy());
            expect(function () {
                reporterInstance.suiteStarted(1);
            }).toThrow('A first argument must be an object.');

        });

        it('suiteStarted should throw an exception if a first argument is not an instance of Suite', function () {

            let reporterInstance = new Reporter(new SomeReportStrategy());
            expect(function () {
                reporterInstance.suiteStarted({});
            }).toThrow('A first argument must be an instance of Suite.');

        });

        it('specStarted should throw an exception if a first argument is not an object', function () {

            let reporterInstance = new Reporter(new SomeReportStrategy());
            expect(function () {
                reporterInstance.specStarted(1);
            }).toThrow('A first argument must be an object.');

        });

        it('specStarted should throw an exception if a first argument is not an instance of Spec', function () {

            let reporterInstance = new Reporter(new SomeReportStrategy());
            expect(function () {
                reporterInstance.specStarted({});
            }).toThrow('A first argument must be an instance of Spec.');

        });

        it('specDone should throw an exception if a first argument is not an object', function () {

            let reporterInstance = new Reporter(new SomeReportStrategy());
            expect(function () {
                reporterInstance.specDone(1);
            }).toThrow('A first argument must be an object.');

        });

        it('specDone should throw an exception if a first argument is not an instance of Spec', function () {

            let reporterInstance = new Reporter(new SomeReportStrategy());
            expect(function () {
                reporterInstance.specDone({});
            }).toThrow('A first argument must be an instance of Spec.');

        });

        it('specDone should throw an exception if a second argument is not a string', function () {

            let reporterInstance = new Reporter(new SomeReportStrategy());
            expect(function () {
                reporterInstance.specDone(new Spec('some spec', () => {}), 1, 'msg');
            }).toThrow('A second argument must be a string.');

        });

        it('specDone should throw an exception if status is not supported', function () {

            let reporterInstance = new Reporter(new SomeReportStrategy());
            expect(function () {
                reporterInstance.specDone(new Spec('some spec', () => {}), 'pending', 'msg');
            }).toThrow('Status pending is not supported.');

        });

        it('specDone should throw an exception if a third argument is not a string', function () {

            let reporterInstance = new Reporter(new SomeReportStrategy());
            expect(function () {
                reporterInstance.specDone(new Spec('some spec', () => {}), 'fail', 1);
            }).toThrow('A third argument must be a string.');

        });

        it('suiteDone should throw an exception if a first argument is not an object', function () {

            let reporterInstance = new Reporter(new SomeReportStrategy());
            expect(function () {
                reporterInstance.suiteDone(1);
            }).toThrow('A first argument must be an object.');

        });

        it('suiteDone should throw an exception if a first argument is not an instance of Suite', function () {

            let reporterInstance = new Reporter(new SomeReportStrategy());
            expect(function () {
                reporterInstance.suiteDone({});
            }).toThrow('A first argument must be an instance of Suite.');

        });

    });

    describe('working specs:', function () {

        it('started should call strategy.started', function (done) {

            class SomeReportStrategy {
                started() {
                    done();
                }
                suiteStarted() {}
                specStarted() {}
                specDone() {}
                suiteDone() {}
                done() {}
            }
            let reporterInstance = new Reporter(new SomeReportStrategy());
            reporterInstance.started();

        });

        it('suiteStarted should call strategy.suiteStarted', function (done) {

            class SomeReportStrategy {
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
            let reporterInstance = new Reporter(new SomeReportStrategy());
            reporterInstance.suiteStarted(new Suite('Some specs', function() {}));

        });

        it('specStarted should call strategy.specStarted', function (done) {

            class SomeReportStrategy {
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
            let reporterInstance = new Reporter(new SomeReportStrategy());
            reporterInstance.specStarted(new Spec('should', function() {}));

        });

        it('specDone should call strategy.specDone', function (done) {

            class SomeReportStrategy {
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
            let reporterInstance = new Reporter(new SomeReportStrategy());
            reporterInstance.specDone(new Spec('should', function() {}), 'success', '');

        });

        it('suiteDone should call strategy.suiteDone', function (done) {

            class SomeReportStrategy {
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
            let reporterInstance = new Reporter(new SomeReportStrategy());
            reporterInstance.suiteDone(new Suite('Some specs', function() {}));

        });

        it('done should call strategy.done', function (done) {

            class SomeReportStrategy {
                started() {}
                suiteStarted() {}
                specStarted() {}
                specDone() {}
                suiteDone() {}
                done() {
                    done();
                }
            }
            let reporterInstance = new Reporter(new SomeReportStrategy());
            reporterInstance.done();

        });

    });

});
