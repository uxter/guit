import {checkArgumentType, isFunction, isString } from '../utils/check-type';
import {checkArgumentInstance} from '../utils/check-instance';
import iterable from '../decorators/iterable';

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
@iterable('list')
export default class Collection {

    /**
     * @constructor
     * @param {(function|string)} type - type of items
     * can be a class, function-constructor
     * or "boolean", "null", "undefined", "number", "string", "object", "array", "function"
     * @throws {TypeError}
     */
    constructor(type) {
        this.type = type;
        if (isFunction(type)) {
            this.checkItem = checkArgumentInstance;
        } else if (isString(type)) {
            this.checkItem = checkArgumentType;
        } else {
            throw new TypeError('A first argument must be a function or a string.');
        }
        this.list = [];
    }

    /**
     * Add an instance as an item
     * @method addItem
     * @param {*} item - an instance
     * @throws {TypeError}
     */
    addItem(item) {
        this.checkItem(item, this.type, 'first');
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
        this.checkItem(item, this.type, 'first');
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
        let clonedCollection = new Collection(this.type);
        for (let item of this) {
            clonedCollection.addItem(item);
        }
        return clonedCollection;
    }

}
