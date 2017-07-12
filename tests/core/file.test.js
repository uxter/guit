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

        it('read should throw an exception if a file is not exists.', function (done) {

            let fileInstance = new File('path/to/file');
            fileInstance.read().catch(err => {
                expect(err.code).toBe('ENOENT');
                done();
            });

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

        it('read should return file content.', function (done) {

            let expectedContent = 'describe(\'Some specs:\', function () {\n\n    ' +
                'it(\'should do something.\', function () {\n\n        ' +
                '// something\n\n    });\n\n});';
            let fileInstance = new File('./tests/mocks/read-file.js');
            fileInstance.read().then(content => {
                expect(content.indexOf(expectedContent)).toBe(0);
                done();
            });

        });

    });

});
