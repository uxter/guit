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

        it('addChild should throw an exception if a first argument is not an object.', function () {

            let suiteInstance = new Suite('Some specs:', function() {});
            expect(function () {
                suiteInstance.addChild(false);
            }).toThrow('A first argument must be an object.');

        });

        it('addChild should throw an exception if a first argument is not an instance of Suite.', function () {

            let suiteInstance = new Suite('Some specs:', function() {});
            expect(function () {
                suiteInstance.addChild({});
            }).toThrow('A first argument must be an instance of Suite.');

        });

        it('removeChild should throw an exception if a first argument is not an instance of Suite.', function () {

            let suiteInstance = new Suite('Some specs:', function() {});
            expect(function () {
                suiteInstance.removeChild({});
            }).toThrow('A first argument must be an instance of Suite.');

        });

        it('getChild should throw an exception if a first argument is not a number.', function () {

            let suiteInstance = new Suite('Some specs:', function() {});
            expect(function () {
                suiteInstance.getChild();
            }).toThrow('A first argument must be a number.');

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

        it('addChild should add child.', function () {
            let suiteParentInstance = new Suite('Parent specs:', function() {});
            let suiteChildInstance = new Suite('Child specs:', function() {});
            suiteParentInstance.addChild(suiteChildInstance);
            expect(suiteParentInstance.children[0]).toBe(suiteChildInstance);
        });

        it('getChild should return first child.', function () {
            let suiteParentInstance = new Suite('Parent specs:', function() {});
            let suiteChildInstance = new Suite('Child specs:', function() {});
            suiteParentInstance.addChild(suiteChildInstance);
            expect(suiteParentInstance.getChild(0)).toBe(suiteChildInstance);
        });

        it('getChild should return null.', function () {
            let suiteParentInstance = new Suite('Parent specs:', function() {});
            let suiteChildInstance = new Suite('Child specs:', function() {});
            suiteParentInstance.addChild(suiteChildInstance);
            expect(suiteParentInstance.getChild(1)).toBe(null);
        });

        it('removeChild should remove child.', function () {
            let suiteParentInstance = new Suite('Parent specs:', function() {});
            let suiteChildInstance = new Suite('Child specs:', function() {});
            suiteParentInstance.addChild(suiteChildInstance);
            suiteParentInstance.removeChild(suiteChildInstance);
            expect(suiteParentInstance.children).toEqual([]);
        });

        it('removeChild should\'n remove anything.', function () {
            let suiteParentInstance = new Suite('Parent specs:', function() {});
            let suiteChildInstance = new Suite('Child specs:', function() {});
            let suiteOtherInstance = new Suite('Other specs:', function() {});
            suiteParentInstance.addChild(suiteChildInstance);
            suiteParentInstance.removeChild(suiteOtherInstance);
            expect(suiteParentInstance.children[0]).toBe(suiteChildInstance);
        });

        it('hasChildren should return false.', function () {
            let suiteInstance = new Suite('Parent specs:', function() {});
            expect(suiteInstance.hasChildren()).toBe(false);
        });

        it('hasChildren should return true.', function () {
            let suiteParentInstance = new Suite('Parent specs:', function() {});
            let suiteChildInstance = new Suite('Child specs:', function() {});
            suiteParentInstance.addChild(suiteChildInstance);
            expect(suiteParentInstance.hasChildren()).toBe(true);
        });

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
