import expect from 'expect';
import Builder from '../../src/core/builder';
import Composite from '../../src/core/composite';
import Suite from '../../src/core/suite';
import File from '../../src/core/file';

describe('core/builder specs:', function () {

    describe('exceptions specs:', function () {

        it('constructor should throw an exception if a first argument is not an object.', function () {

            expect(function () {
                new Builder(1);
            }).toThrow('A first argument must be an object.');

        });

        it('constructor should throw an exception if a specification of a build strategy not implement a method "test".', function () {

            class SomeBuildStrategy {
                build() {}
            }
            expect(function () {
                new Builder(new SomeBuildStrategy());
            }).toThrow('SomeBuildStrategy specification must implement a method "test".');

        });

        it('constructor should throw an exception if a specification of a build strategy not implement a method "build".', function () {

            class SomeBuildStrategy {
                test() {}
            }
            expect(function () {
                new Builder(new SomeBuildStrategy());
            }).toThrow('SomeBuildStrategy specification must implement a method "build".');

        });

        it('test should throw an exception if a first argument is not an object', function () {

            class SomeBuildStrategy {
                test() {}
                build() {}
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            expect(function () {
                builderInstance.test(1);
            }).toThrow('A first argument must be an object.');

        });

        it('test should throw an exception if a first argument is not an instance of File', function () {

            class SomeBuildStrategy {
                test() {}
                build() {}
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            expect(function () {
                builderInstance.test({});
            }).toThrow('A first argument must be an instance of File.');

        });

        it('build should reject if a first is not an object', function (done) {

            class SomeBuildStrategy {
                test() {}
                build() {}
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            builderInstance.build(1).catch(err => {
                expect(err.message).toBe('A first argument must be an object.');
                done();
            });

        });

        it('build should reject if a first is not an instance of File', function (done) {

            class SomeBuildStrategy {
                test() {}
                build() {}
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            builderInstance.build({}).catch(err => {
                expect(err.message).toBe('A first argument must be an instance of File.');
                done();
            });

        });

        it('test should throw an exception if a result is not a boolean.', function () {

            class SomeBuildStrategy {
                test() {}
                build() {}
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            expect(function () {
                builderInstance.test(new File('/path/to/spec-file.js'));
            }).toThrow('SomeBuildStrategy.test must return a boolean.');

        });

        it('build should reject if a result is not an instance of Composite', function (done) {

            class SomeBuildStrategy {
                test() {}
                build() {
                    return {};
                }
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            builderInstance.build(new File('/path/to/spec-file.js')).catch(err => {
                expect(err.message).toBe('SomeBuildStrategy.build must return an instance of Composite.');
                done();
            });

        });

    });

    describe('working specs:', function () {

        it('test should return false', function () {

            class SomeBuildStrategy {
                test(fileInstance) {
                    let re = /\.js$/;
                    return re.test(fileInstance.path);
                }
                build() {}
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            expect(builderInstance.test(new File('/path/to/spec-file.json'))).toBe(false);

        });

        it('test should return true', function () {

            class SomeBuildStrategy {
                test(fileInstance) {
                    let re = /\.js$/;
                    return re.test(fileInstance.path);
                }
                build() {}
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            expect(builderInstance.test(new File('/path/to/spec-file.js'))).toBe(true);

        });

        it('build should return an instance of Composite', function (done) {

            class SomeBuildStrategy {
                test(fileInstance) {
                    let re = /\.js$/;
                    return re.test(fileInstance.path);
                }
                build() {
                    return new Suite('Some specs:', function() {});
                }
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            builderInstance.build(new File('/path/to/spec-file.js')).then(result => {
                expect(result instanceof Composite).toBe(true);
                done();
            });

        });

    });

});
