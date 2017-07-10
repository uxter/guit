import expect from 'expect';
import {
    checkArgumentInstance,
    checkResultInstance
} from '../../src/utils/check-instance';

describe('utils/check-instance specs:', function () {

    describe('checkArgumentInstance specs:', function () {

        it('should throw an exception if a first argument is not an object.', function () {

            expect(function () {
                checkArgumentInstance(1, 1, 1);
            }).toThrow('A first argument must be an object.');

            expect(function () {
                checkArgumentInstance(null, 1, 1);
            }).toThrow('A first argument must be an object.');

        });

        it('should throw an exception if a second argument is not a function.', function () {

            expect(function () {
                checkArgumentInstance({}, 1, 1);
            }).toThrow('A second argument must be a function.');

        });

        it('should throw an exception if a third argument is not a string.', function () {

            expect(function () {
                checkArgumentInstance({}, function() {}, 1);
            }).toThrow('A third argument must be a string.');

        });

        it('should throw an exception if an argument is not an instance of constructor.', function () {

            function SomeConstructor() {}
            function OtherConstructor() {}

            let someInstance = new SomeConstructor();
            expect(function () {
                checkArgumentInstance(someInstance, OtherConstructor, 'second');
            }).toThrow('A second argument must be an instance of OtherConstructor.');

        });

        it('should return undefined if an argument is an instance of constructor.', function () {

            function SomeConstructor() {
            }

            let someInstance = new SomeConstructor();
            expect(checkArgumentInstance(someInstance, SomeConstructor, 'second')).toBe(undefined);

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
            expect(checkArgumentInstance(childInstance, Parent, 'third')).toBe(undefined);

        });

    });

    describe('checkResultInstance specs:', function () {

        it('should throw an exception if a first argument is not an object.', function () {

            expect(function () {
                checkResultInstance(1, 1, 1);
            }).toThrow('A first argument must be an object.');

            expect(function () {
                checkResultInstance(null, 1, 1);
            }).toThrow('A first argument must be an object.');

        });

        it('should throw an exception if a second argument is not a function.', function () {

            expect(function () {
                checkResultInstance({}, 1, 1);
            }).toThrow('A second argument must be a function.');

        });

        it('should throw an exception if a third argument is not a string.', function () {

            expect(function () {
                checkResultInstance({}, function() {}, 1);
            }).toThrow('A third argument must be a string.');

        });

        it('should throw an exception if a result is not an instance of constructor.', function () {

            function SomeConstructor() {}
            function OtherConstructor() {}

            let someInstance = new SomeConstructor();
            expect(function () {
                checkResultInstance(someInstance, OtherConstructor, 'functionName');
            }).toThrow('functionName must return an instance of OtherConstructor.');

        });

        it('should return undefined if a result is an instance of constructor.', function () {

            function SomeConstructor() {}

            let someInstance = new SomeConstructor();
            expect(checkResultInstance(someInstance, SomeConstructor, 'functionName')).toBe(undefined);

        });

        it('should return undefined if a result is an instance of child constructor.', function () {

            class Parent {
                constructor() {}
            }

            class Child extends Parent {
                constructor() {
                    super();
                }
            }

            let childInstance = new Child();
            expect(checkResultInstance(childInstance, Parent, 'functionName')).toBe(undefined);

        });

    });

});
