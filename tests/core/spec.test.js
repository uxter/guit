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

    });

    describe('working specs:', function () {

        it('run should run executor.', function () {
            let isExecuted = false;
            let specInstance = new Spec('Parent specs:', function() {
                isExecuted = true;
            });
            specInstance.run();
            expect(isExecuted).toBe(true);
        });

    });

});
