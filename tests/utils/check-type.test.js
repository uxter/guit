import expect from 'expect';
import {
    checkArgumentType,
    checkResultType,
    isFunction,
    isString,
    isNull,
    isObject,
    isArray,
    isBoolean,
    isNumber,
    isUndefined
} from '../../src/utils/check-type';

describe('utils/check-type specs:', function () {

    describe('checkArgumentType specs:', function () {

        it('should throw an exception if a second argument is not a string.', function () {

            expect(function () {
                checkArgumentType(1, 1, 1);
            }).toThrow('A second argument must be a string.');

        });

        it('should throw an exception if a third argument is not a string.', function () {

            expect(function () {
                checkArgumentType(1, 'string', 1);
            }).toThrow('A third argument must be a string.');

        });

        it('should throw an exception if an argument is not a string.', function () {

            expect(function () {
                checkArgumentType(1, 'string', 'first');
            }).toThrow('A first argument must be a string.');

        });

        it('should throw an exception if an argument is not an object.', function () {

            expect(function () {
                checkArgumentType(1, 'object', 'second');
            }).toThrow('A second argument must be an object.');

            expect(function () {
                checkArgumentType(null, 'object', 'second');
            }).toThrow('A second argument must be an object.');

        });

        it('should throw an exception if an argument is not an undefined.', function () {

            expect(function () {
                checkArgumentType(1, 'undefined', 'third');
            }).toThrow('A third argument must be an undefined.');

        });

        it('should throw an exception if an argument is not an array.', function () {

            expect(function () {
                checkArgumentType(true, 'array', 'first');
            }).toThrow('A first argument must be an array.');

        });

        it('should return undefined if an argument is an object.', function () {

            expect(checkArgumentType({}, 'object', 'first')).toBe(undefined);

        });

        it('should return undefined if an argument is a null.', function () {

            expect(checkArgumentType(null, 'null', 'second')).toBe(undefined);

        });

        it('should return undefined if an argument is an array.', function () {

            expect(checkArgumentType([], 'array', 'third')).toBe(undefined);

        });

        it('should return undefined if an argument is a number.', function () {

            expect(checkArgumentType(1, 'number', 'first')).toBe(undefined);

        });

    });

    describe('checkResultType specs:', function () {

        it('should throw an exception if a second argument is not a string.', function () {

            expect(function () {
                checkResultType(1, 1, 1);
            }).toThrow('A second argument must be a string.');

        });

        it('should throw an exception if a third argument is not a string.', function () {

            expect(function () {
                checkResultType(1, 'string', 1);
            }).toThrow('A third argument must be a string.');

        });

        it('should throw an exception if a result is not a string.', function () {

            expect(function () {
                checkResultType(1, 'string', 'functionName');
            }).toThrow('functionName must return a string.');

        });

        it('should throw an exception if a result is not an object.', function () {

            expect(function () {
                checkResultType(1, 'object', 'functionName');
            }).toThrow('functionName must return an object.');

            expect(function () {
                checkResultType(null, 'object', 'functionName');
            }).toThrow('functionName must return an object.');

        });

        it('should throw an exception if a result is not an undefined.', function () {

            expect(function () {
                checkResultType(1, 'undefined', 'functionName');
            }).toThrow('functionName must return an undefined.');

        });

        it('should return undefined if a result is an object.', function () {

            expect(checkArgumentType({}, 'object', 'functionName')).toBe(undefined);

        });

        it('should return undefined if a result is a null.', function () {

            expect(checkArgumentType(null, 'null', 'functionName')).toBe(undefined);

        });

        it('should return undefined if a result is an array.', function () {

            expect(checkArgumentType([], 'array', 'functionName')).toBe(undefined);

        });

        it('should return undefined if a result is a number.', function () {

            expect(checkArgumentType(1, 'number', 'functionName')).toBe(undefined);

        });

    });

    describe('is[Type] specs:', function () {

        it('isFunction should return true.', function () {
            expect(isFunction(function() {})).toBe(true);
        });

        it('isFunction should return false.', function () {
            expect(isFunction(1)).toBe(false);
        });

        it('isString should return true.', function () {
            expect(isString('1')).toBe(true);
        });

        it('isString should return false.', function () {
            expect(isString(1)).toBe(false);
        });

        it('isNull should return true.', function () {
            expect(isNull(null)).toBe(true);
        });

        it('isNull should return false.', function () {
            expect(isNull('null')).toBe(false);
        });

        it('isObject should return true.', function () {
            expect(isObject({})).toBe(true);
        });

        it('isObject should return false.', function () {
            expect(isObject('{}')).toBe(false);
            expect(isObject(null)).toBe(false);
        });

        it('isArray should return true.', function () {
            expect(isArray([])).toBe(true);
        });

        it('isArray should return false.', function () {
            expect(isArray({})).toBe(false);
        });

        it('isBoolean should return true.', function () {
            expect(isBoolean(true)).toBe(true);
            expect(isBoolean(false)).toBe(true);
        });

        it('isBoolean should return false.', function () {
            expect(isBoolean({})).toBe(false);
            expect(isBoolean(1)).toBe(false);
        });

        it('isNumber should return true.', function () {
            expect(isNumber(1)).toBe(true);
            expect(isNumber(Infinity)).toBe(true);
        });

        it('isNumber should return false.', function () {
            expect(isNumber(NaN)).toBe(false);
            expect(isNumber('1')).toBe(false);
        });

        it('isUndefined should return true.', function () {
            expect(isUndefined()).toBe(true);
        });

        it('isUndefined should return false.', function () {
            expect(isUndefined('')).toBe(false);
            expect(isUndefined(0)).toBe(false);
        });

    });

});
