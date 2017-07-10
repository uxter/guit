import expect from 'expect';
import Builder from '../../src/core/builder';
import Composite from '../../src/core/composite';
import Suite from '../../src/core/suite';

describe('core/builder specs:', function () {

    describe('exceptions specs:', function () {

        it('constructor should throw an exception if a first argument is not an object.', function () {

            expect(function () {
                new Builder(1);
            }).toThrow('A first argument must be an object.');

        });

        it('constructor should throw an exception if a specification of a build strategy not implement a method "test".', function () {

            class SomeBuildStrategy {}
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

        it('test should throw an exception if a first argument is not a string', function () {

            class SomeBuildStrategy {
                test() {}
                build() {}
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            expect(function () {
                builderInstance.test(1);
            }).toThrow('A first argument must be a string.');

        });

        it('build should throw an exception if a first is not a string', function () {

            class SomeBuildStrategy {
                test() {}
                build() {}
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            expect(function () {
                builderInstance.build(1);
            }).toThrow('A first argument must be a string.');

        });

        it('test should throw an exception if a result is not a boolean', function () {

            class SomeBuildStrategy {
                test() {}
                build() {}
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            expect(function () {
                builderInstance.test('/path/to/spec-file.js');
            }).toThrow('SomeBuildStrategy.test must return a boolean.');

        });

        it('build should throw an exception if a result is not an instance of Composite', function () {

            class SomeBuildStrategy {
                test() {}
                build() {
                    return {};
                }
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            expect(function () {
                builderInstance.build('/path/to/spec-file.js');
            }).toThrow('SomeBuildStrategy.build must return an instance of Composite.');

        });

    });

    describe('working specs:', function () {

        it('test should return false', function () {

            class SomeBuildStrategy {
                test(filePath) {
                    let re = /\.js$/;
                    return re.test(filePath);
                }
                build() {}
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            expect(builderInstance.test('/path/to/spec-file.json')).toBe(false);

        });

        it('test should return true', function () {

            class SomeBuildStrategy {
                test(filePath) {
                    let re = /\.js$/;
                    return re.test(filePath);
                }
                build() {}
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            expect(builderInstance.test('/path/to/spec-file.js')).toBe(true);

        });

        it('build should return an instance of Composite', function () {

            class SomeBuildStrategy {
                test(filePath) {
                    let re = /\.js$/;
                    return re.test(filePath);
                }
                build() {
                    return new Suite('Some specs:', function() {});
                }
            }
            let builderInstance = new Builder(new SomeBuildStrategy());
            expect(builderInstance.build('/path/to/spec-file.js') instanceof Composite).toBe(true);

        });

    });

});
