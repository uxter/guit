import expect from 'expect';
import Collection from '../../src/core/collection';

describe('core/collection specs:', function () {

    describe('exceptions specs:', function () {

        it('constructor should throw an exception if a first argument is not a function.', function () {

            expect(function () {
                new Collection(null);
            }).toThrow('A first argument must be a function.');

        });

        it('addItem should throw an exception if a first argument is not an instance of SomeClass.', function () {

            class SomeClass {}
            let someCollection = new Collection(SomeClass);
            expect(function () {
                someCollection.addItem({});
            }).toThrow('A first argument must be an instance of SomeClass.');

        });

        it('removeItem should throw an exception if a first argument is not an instance of SomeClass.', function () {

            class SomeClass {}
            let someCollection = new Collection(SomeClass);
            expect(function () {
                someCollection.removeItem({});
            }).toThrow('A first argument must be an instance of SomeClass.');

        });

        it('getItem should throw an exception if a first argument is not a number.', function () {

            class SomeClass {}
            let someCollection = new Collection(SomeClass);
            expect(function () {
                someCollection.getItem(true);
            }).toThrow('A first argument must be a number.');

        });

    });

    describe('working specs:', function () {

        it('addItem should add child, getItem should return first item.', function () {
            class SomeClass {}
            let someCollection = new Collection(SomeClass);
            let someInstance = new SomeClass();
            someCollection.addItem(someInstance);
            expect(someCollection.getItem(0)).toBe(someInstance);
        });

        it('getItem should return null.', function () {
            class SomeClass {}
            let someCollection = new Collection(SomeClass);
            let someInstance = new SomeClass();
            someCollection.addItem(someInstance);
            expect(someCollection.getItem(1)).toBe(null);
        });

        it('removeItem should remove item.', function () {
            class SomeClass {}
            let someCollection = new Collection(SomeClass);
            let someInstance = new SomeClass();
            someCollection.addItem(someInstance);
            someCollection.removeItem(someInstance);
            expect(someCollection.list).toEqual([]);
        });

        it('removeItem should\'n remove anything.', function () {
            class SomeClass {}
            let someCollection = new Collection(SomeClass);
            let someInstance = new SomeClass();
            let otherInstance = new SomeClass();
            someCollection.addItem(someInstance);
            someCollection.removeItem(otherInstance);
            expect(someCollection.list[0]).toBe(someInstance);
        });

        it('hasItems should return false.', function () {
            class SomeClass {}
            let someCollection = new Collection(SomeClass);
            expect(someCollection.hasItems()).toBe(false);
        });

        it('hasItems should return true.', function () {
            class SomeClass {}
            let someCollection = new Collection(SomeClass);
            let someInstance = new SomeClass();
            someCollection.addItem(someInstance);
            expect(someCollection.hasItems()).toBe(true);
        });

        it('makeIterator should return an object that provides a next() method', function () {
            class SomeClass {}
            let someCollection = new Collection(SomeClass);
            let iterator = someCollection.makeIterator();
            expect(typeof iterator.next).toBe('function');
        });

        it('iterator should return a next item', function () {
            class SomeClass {}
            let someCollection = new Collection(SomeClass);
            let firstInstance = new SomeClass();
            let secondInstance = new SomeClass();
            let thirdInstance = new SomeClass();
            [firstInstance, secondInstance, thirdInstance].forEach(item => someCollection.addItem(item));
            let iterator = someCollection.makeIterator();
            expect(iterator.next()).toEqual({
                value: firstInstance,
                done: false
            });
            expect(iterator.next()).toEqual({
                value: secondInstance,
                done: false
            });
            expect(iterator.next()).toEqual({
                value: thirdInstance,
                done: false
            });
            expect(iterator.next()).toEqual({
                done: true
            });
        });

    });

});
