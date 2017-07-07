import expect from 'expect';
import Suite from '../../src/core/suite';

describe('core/suite specs:', function () {

    describe('exceptions specs:', function () {

        it('constructor should throw an exception if a first argument is not a string.', function () {

            expect(function () {
                new Suite(1);
            }).toThrow('A first argument must be a string.');

        });

        it('constructor should throw an exception if a second argument is not a function.', function () {

            expect(function () {
                new Suite('Some specs:', 2);
            }).toThrow('A second argument must be a function.');

        });

        it('addBeforeAllHelper should throw an exception if a first argument is not a function.', function () {

            let suiteInstance = new Suite('Some specs:', function() {});
            expect(function () {
                suiteInstance.addBeforeAllHelper(1);
            }).toThrow('A first argument must be a function.');

        });

        it('addBeforeEachHelper should throw an exception if a first argument is not a function.', function () {

            let suiteInstance = new Suite('Some specs:', function() {});
            expect(function () {
                suiteInstance.addBeforeEachHelper(1);
            }).toThrow('A first argument must be a function.');

        });

        it('addAfterEachHelper should throw an exception if a first argument is not a function.', function () {

            let suiteInstance = new Suite('Some specs:', function() {});
            expect(function () {
                suiteInstance.addAfterEachHelper(1);
            }).toThrow('A first argument must be a function.');

        });

        it('addAfterAllHelper should throw an exception if a first argument is not a function.', function () {

            let suiteInstance = new Suite('Some specs:', function() {});
            expect(function () {
                suiteInstance.addAfterAllHelper(1);
            }).toThrow('A first argument must be a function.');

        });

    });

    describe('working specs:', function () {

        it('addBeforeAllHelper should add helper.', function () {
            let suiteInstance = new Suite('Parent specs:', function() {});
            let helper = function() {};
            suiteInstance.addBeforeAllHelper(helper);
            expect(suiteInstance.beforeAllList[0]).toBe(helper);
        });

        it('addBeforeEachHelper should add helper.', function () {
            let suiteInstance = new Suite('Parent specs:', function() {});
            let helper = function() {};
            suiteInstance.addBeforeEachHelper(helper);
            expect(suiteInstance.beforeEachList[0]).toBe(helper);
        });

        it('addAfterAllHelper should add helper.', function () {
            let suiteInstance = new Suite('Parent specs:', function() {});
            let helper = function() {};
            suiteInstance.addAfterAllHelper(helper);
            expect(suiteInstance.afterAllList[0]).toBe(helper);
        });

        it('addAfterEachHelper should add helper.', function () {
            let suiteInstance = new Suite('Parent specs:', function() {});
            let helper = function() {};
            suiteInstance.addAfterEachHelper(helper);
            expect(suiteInstance.afterEachList[0]).toBe(helper);
        });

        it('create should run creator.', function () {
            let isExecuted = false;
            let suiteInstance = new Suite('Parent specs:', function() {
                isExecuted = true;
            });
            suiteInstance.create();
            expect(isExecuted).toBe(true);
        });

    });

});
