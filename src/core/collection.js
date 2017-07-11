import {checkArgumentType} from '../utils/check-type';
import {checkArgumentInstance} from '../utils/check-instance';

/**
 * Typed collection
 * @class Collection
 * @public
 *
 * @example
 * let compositeCollection = new Collection(Composite);
 * let compositeItem = new Composite();
 * compositeCollection.addItem(compositeItem);
 * compositeCollection.hasItems();
 * compositeCollection.getItem(0);
 * compositeCollection.removeItem(compositeItem);
 *
 * let iterable = compositeCollection.makeIterable();
 * for (let compositeItem of iterable) {
 *   // use compositeItem
 * }
 */
export default class Collection {

    /**
     * @constructor
     * @param {(function)} type - type of items (class or function-constructor),
     * @throws {TypeError}
     */
    constructor(type) {
        checkArgumentType(type, 'function', 'first');
        this.type = type;
        this.list = [];
    }

    /**
     * Add an instance as an item
     * @method addItem
     * @param {*} item - an instance
     * @throws {TypeError}
     */
    addItem(item) {
        checkArgumentInstance(item, this.type, 'first');
        this.list.push(item);
    }

    /**
     * Get an item by its index
     * @method getItem
     * @param {number} index - index of an item
     * @return {(*|null)} - item or null
     * @throws {TypeError}
     */
    getItem(index) {
        checkArgumentType(index, 'number', 'first');
        return this.list[index] || null;
    }

    /**
     * Remove an item by reference to its instance
     * @method removeItem
     * @param {*} item - an instance
     * @throws {TypeError}
     */
    removeItem(item) {
        checkArgumentInstance(item, this.type, 'first');
        let index = this.list.indexOf(item);
        if (index > -1) {
            this.list.splice(index, 1);
        }
    }

    /**
     * Check the availability of items
     * @method hasItems
     * @return {boolean}
     */
    hasItems() {
        return this.list.length > 0;
    }

    /**
     * Clone current collection
     * Return new instance of Collection that contains same list of items
     * @method clone
     * @return {Collection}
     */
    clone() {
        let iterable = this.makeIterable();
        let clonedCollection = new Collection(this.type);
        for (let item of iterable) {
            clonedCollection.addItem(item);
        }
        return clonedCollection;
    }

    /**
     * Return an object that provides a next() method which returns the next item in the sequence.
     * next returns an object with two properties: done and value.
     * @method makeIterator
     * @return {{next: (function())}}
     */
    makeIterator() {
        let nextIndex = 0;
        return {
            next: () => {
                if (nextIndex < this.list.length) {
                    return {
                        value: this.list[nextIndex++],
                        done: false
                    };
                } else {
                    return {
                        done: true
                    };
                }
            }
        };
    }

    /**
     * Return a zero arguments function that returns an object,
     * conforming to the iterator protocol.
     * @method makeIterable
     * @return {*} iterable
     */
    makeIterable() {
        let self = this;
        return {
            [Symbol.iterator]() {
                return self.makeIterator();
            }
        };
    }

}
