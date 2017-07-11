import expect from 'expect';
import Composite from '../../src/core/composite';

describe('core/composite specs:', function () {

    describe('exceptions specs:', function () {

        it('addChild should throw an exception if a first argument is not an object.', function () {

            let compositeInstance = new Composite('Some item', function() {});
            expect(function () {
                compositeInstance.addChild(false);
            }).toThrow('A first argument must be an object.');

        });

        it('addChild should throw an exception if a first argument is not an instance of Composite.', function () {

            let compositeInstance = new Composite('Some item', function() {});
            expect(function () {
                compositeInstance.addChild({});
            }).toThrow('A first argument must be an instance of Composite.');

        });

        it('removeChild should throw an exception if a first argument is not an instance of Composite.', function () {

            let compositeInstance = new Composite('Some item', function() {});
            expect(function () {
                compositeInstance.removeChild({});
            }).toThrow('A first argument must be an instance of Composite.');

        });

        it('getChild should throw an exception if a first argument is not a number.', function () {

            let compositeInstance = new Composite('Some item', function() {});
            expect(function () {
                compositeInstance.getChild();
            }).toThrow('A first argument must be a number.');

        });

    });

    describe('working specs:', function () {

        it('addChild should add child, getChild should return first child.', function () {

            let compositeParentInstance = new Composite('Parent item', function() {});
            let compositeChildInstance = new Composite('Child item', function() {});
            compositeParentInstance.addChild(compositeChildInstance);
            expect(compositeParentInstance.getChild(0)).toBe(compositeChildInstance);

        });

        it('getChild should return null.', function () {

            let compositeParentInstance = new Composite('Parent item', function() {});
            let compositeChildInstance = new Composite('Child item', function() {});
            compositeParentInstance.addChild(compositeChildInstance);
            expect(compositeParentInstance.getChild(1)).toBe(null);

        });

        it('removeChild should remove child.', function () {

            let compositeParentInstance = new Composite('Parent item', function() {});
            let compositeChildInstance = new Composite('Child item', function() {});
            compositeParentInstance.addChild(compositeChildInstance);
            compositeParentInstance.removeChild(compositeChildInstance);
            expect(compositeParentInstance.children.hasItems()).toBe(false);

        });

        it('removeChild should\'n remove anything.', function () {

            let compositeParentInstance = new Composite('Parent item', function() {});
            let compositeChildInstance = new Composite('Child item', function() {});
            let compositeOtherInstance = new Composite('Other item', function() {});
            compositeParentInstance.addChild(compositeChildInstance);
            compositeParentInstance.removeChild(compositeOtherInstance);
            expect(compositeParentInstance.children.getItem(0)).toBe(compositeChildInstance);

        });

        it('hasChildren should return false.', function () {

            let compositeInstance = new Composite('Parent item', function() {});
            expect(compositeInstance.hasChildren()).toBe(false);

        });

        it('hasChildren should return true.', function () {

            let compositeParentInstance = new Composite('Parent item', function() {});
            let compositeChildInstance = new Composite('Child item', function() {});
            compositeParentInstance.addChild(compositeChildInstance);
            expect(compositeParentInstance.hasChildren()).toBe(true);

        });

    });

});
