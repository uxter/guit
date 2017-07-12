import expect from 'expect';
import statusable from '../../src/decorators/statusable';

describe('decorators/statusable specs:', function () {

    describe('exceptions specs:', function () {

        it('statusable should throw an exception if a first argument is not a string.', function () {

            expect(function () {
                statusable(true);
            }).toThrow('A first argument must be a string.');

        });

        it('statusable should throw an exception if a second argument is not an array.', function () {

            expect(function () {
                statusable('status', true);
            }).toThrow('A second argument must be an array.');

        });

        it('statusable should throw an exception if statuses array contains not a string.', function () {

            expect(function () {
                statusable('status', ['pending', true]);
            }).toThrow('Status must be a string.');

        });

        it('statusableDecorate should throw an exception if a first argument is not a function.', function () {

            expect(function () {
                statusable('status', ['fail', 'success'])(true);
            }).toThrow('A first argument must be a function.');

        });

        it('setStatus should throw an exception if a first argument is not a string.', function () {

            @statusable('status', ['fail', 'success'])
            class SomeClass {}
            let someInstance = new SomeClass();
            expect(function () {
                someInstance.setStatus(true);
            }).toThrow('A first argument must be a string.');

        });

        it('setStatus should throw an exception if a status is not supported.', function () {

            @statusable('status', ['fail', 'success'])
            class SomeClass {}
            let someInstance = new SomeClass();
            expect(function () {
                someInstance.setStatus('pending');
            }).toThrow('Status pending is not supported.');

        });

    });

    describe('working specs:', function () {

        it('should set and get status', function () {

            @statusable('status', ['fail', 'success'])
            class SomeClass {}
            let someInstance = new SomeClass();
            expect(someInstance.getStatus()).toBe('initial');
            someInstance.setStatus('success');
            expect(someInstance.getStatus()).toBe('success');
            someInstance.setStatus('fail');
            expect(someInstance.getStatus()).toBe('fail');

        });

    });

});
