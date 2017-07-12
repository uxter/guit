import expect from 'expect';
import File from '../../src/core/file';

describe('core/file specs:', function () {

    describe('exceptions specs:', function () {

        it('constructor should throw an exception if a first argument is not a string.', function () {

            expect(function () {
                new File(1);
            }).toThrow('A first argument must be a string.');

        });

        it('setStatus should throw an exception if a status is not supported.', function () {

            let fileInstance = new File('path/to/file');
            expect(function () {
                fileInstance.setStatus('pending');
            }).toThrow('Status pending is not supported.');

        });

    });

    describe('working specs:', function () {

        it('should set and get status.', function () {

            let fileInstance = new File('path/to/file');
            expect(fileInstance.getStatus()).toBe('initial');
            fileInstance.setStatus('success');
            expect(fileInstance.getStatus()).toBe('success');
            fileInstance.setStatus('fail');
            expect(fileInstance.getStatus()).toBe('fail');

        });

    });

});
