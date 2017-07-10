import expect from 'expect';
import {checkClassSpec} from '../../src/utils/check-class-spec';

describe('utils/check-class-spec specs:', function () {

    it('should throw an exception if a first argument is not an object.', function () {

        expect(function () {
            checkClassSpec(1, 1);
        }).toThrow('A first argument must be an object.');

    });

    it('should throw an exception if a second argument is not an array.', function () {

        expect(function () {
            checkClassSpec({}, 1);
        }).toThrow('A second argument must be an array.');

    });

    it('should throw an exception if a method name is not a string.', function () {

        expect(function () {
            checkClassSpec({}, [true]);
        }).toThrow('A method name must be string.');

    });

    it('should throw an exception if a method is not implemented.', function () {

        class TestClass {}
        let instance = new TestClass();

        expect(function () {
            checkClassSpec(instance, ['testMethod']);
        }).toThrow('TestClass specification must implement a method "testMethod".');

    });

    it('should return an undefined', function () {

        class TestClass {
            testMethod() {}
            foo() {}
        }
        let instance = new TestClass();

        expect(checkClassSpec({}, [])).toBe(undefined);
        expect(checkClassSpec(instance, [
            'testMethod',
            'foo'
        ])).toBe(undefined);

    });

});
