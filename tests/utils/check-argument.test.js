import expect from 'expect';
import {
    checkArgumentType,
    checkArgumentConstructor
} from '../../src/utils/check-argument';

describe('utils/check-argument specs:', function () {

    describe('checkArgumentType specs:', function () {

        it('should throw an exception if a second argument is not a string.', function () {

            expect(function () {
                checkArgumentType(1, 1, 1);
            }).toThrow('A second argument must be a string.');

        });

        it('should throw an exception if a third argument is not a string.', function () {

            expect(function () {
                checkArgumentType(1, 'first', 1);
            }).toThrow('A third argument must be a string.');

        });

        it('should throw an exception if an argument is not a string.', function () {

            expect(function () {
                checkArgumentType(1, 'first', 'string');
            }).toThrow('A first argument must be a string.');

        });

        it('should throw an exception if an argument is not an object.', function () {

            expect(function () {
                checkArgumentType(1, 'second', 'object');
            }).toThrow('A second argument must be an object.');

            expect(function () {
                checkArgumentType(null, 'second', 'object');
            }).toThrow('A second argument must be an object.');

        });

        it('should throw an exception if an argument is not an undefined.', function () {

            expect(function () {
                checkArgumentType(1, 'third', 'undefined');
            }).toThrow('A third argument must be an undefined.');

        });

        it('should return undefined if an argument is an object.', function () {

            expect(checkArgumentType({}, 'fourth', 'object')).toBe(undefined);

        });

    });

    describe('checkArgumentConstructor specs:', function () {

        it('should throw an exception if a first argument is not an object.', function () {

            expect(function () {
                checkArgumentConstructor(1, 1, 1);
            }).toThrow('A first argument must be an object.');

            expect(function () {
                checkArgumentConstructor(null, 1, 1);
            }).toThrow('A first argument must be an object.');

        });

        it('should throw an exception if a second argument is not a string.', function () {

            expect(function () {
                checkArgumentConstructor({}, 1, 1);
            }).toThrow('A second argument must be a string.');

        });

        it('should throw an exception if a third argument is not a function.', function () {

            expect(function () {
                checkArgumentConstructor({}, 'first', 1);
            }).toThrow('A third argument must be a function.');

        });

        it('should throw an exception if an argument is not an instance of constructor.', function () {

            function SomeConstructor() {}
            function OtherConstructor() {}
            let someInstance = new SomeConstructor();
            expect(function () {
                checkArgumentConstructor(someInstance, 'second', OtherConstructor);
            }).toThrow('A second argument must be an instance of OtherConstructor.');

        });

        it('should return undefined if an argument is an instance of constructor.', function () {

            function SomeConstructor() {}
            let someInstance = new SomeConstructor();
            expect(checkArgumentConstructor(someInstance, 'second', SomeConstructor)).toBe(undefined);

        });

        it('should return undefined if an argument is an instance of child constructor.', function () {

            class Parent {
                constructor() {}
            }

            class Child extends Parent {
                constructor() {
                    super();
                }
            }

            let childInstance = new Child();
            expect(checkArgumentConstructor(childInstance, 'third', Parent)).toBe(undefined);

        });

    });

});
