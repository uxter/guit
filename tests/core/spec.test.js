import expect from 'expect';
import Spec from '../../src/core/spec';

describe('core/spec specs:', function () {

    describe('exceptions specs:', function () {

        it('constructor should throw an exception if a first argument is not a string.', function () {

            expect(function () {
                new Spec(1);
            }).toThrow('A first argument must be a string.');

        });

        it('constructor should throw an exception if a second argument is not a function.', function () {

            expect(function () {
                new Spec('Some specs:', 2);
            }).toThrow('A second argument must be a function.');

        });

        it('run should throw an exception if a first argument is not an object.', function () {

            let isExecuted = false;
            let specInstance = new Spec('Parent specs:', function() {
                isExecuted = true;
            });

            specInstance.run().catch((err) => {
                expect(err.message).toBe('A first argument must be an object.');
            });

        });

    });

    describe('working specs:', function () {

        it('executor should resolve.', function (done) {

            let isExecuted = false;
            let specInstance = new Spec('Parent specs:', function() {
                isExecuted = true;
            });

            specInstance.run({}).then(() => {
                expect(isExecuted).toBe(true);
                done();
            });

        });

        it('executor should reject.', function (done) {

            let specInstance = new Spec('Parent specs:', function() {
                throw new Error('Test fail exception.');
            });

            specInstance.run({}).catch(err => {
                expect(err.message).toBe('Test fail exception.');
                done();
            });

        });

        it('async executor should resolve.', function (done) {

            let isExecuted = false;
            let specInstance = new Spec('Parent specs:', async function() {
                await new Promise(resolve => {
                    setTimeout(() => {
                        isExecuted = true;
                        resolve();
                    }, 1);
                });
            });

            specInstance.run({}).then(() => {
                expect(isExecuted).toBe(true);
                done();
            });

        });

        it('async executor should reject.', function (done) {

            let specInstance = new Spec('Parent specs:', async function() {
                let data = await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject('Test fail exception.');
                    }, 1);
                });
                return data + 1;
            });

            specInstance.run({}).catch(err => {
                expect(err).toBe('Test fail exception.');
                done();
            });

        });

        it('async executor should reject when an exception is thrown.', function (done) {

            let specInstance = new Spec('Parent specs:', async function() {
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(1);
                    }, 1);
                });
                throw new Error('Test fail exception.');
            });

            specInstance.run({}).catch(err => {
                expect(err.message).toBe('Test fail exception.');
                done();
            });

        });

    });

});
