import {checkArgumentType, isArray} from '../utils/check-type';

/**
 * Create decorator for adding a method [Symbol.iterator] into target Class
 * @function iterable
 * @param {string} property - a property to iterate
 * @return {function} - iterableDecorate
 * @throws {TypeError}
 * @public
 */
export default function iterable(property) {
    checkArgumentType(property, 'string', 'first');
    /**
     * Add a method [Symbol.iterator] into target Class
     * @function iterableDecorate
     * @param {function} target - target Class or function-constructor
     * @throws {TypeError}
     * @private
     */
    return function iterableDecorate(target) {
        checkArgumentType(target, 'function', 'first');
        target.prototype[Symbol.iterator] = function() {
            let nextIndex = 0;
            return {
                /**
                 * A zero arguments function
                 * that returns an object with two properties "value" and "done"
                 * "value" - any value returned by an iterator, can be omitted when done is true.
                 * "done" - has the value true if an iterator is past the end else has the value false
                 * @function next
                 * @return {{value: <*>, done: <boolean>}}
                 * @private
                 */
                next: () => {
                    if (!isArray(this[property])) {
                        throw new TypeError('Property ' + property + ' is not specified.');
                    }
                    if (nextIndex < this[property].length) {
                        return {
                            value: this[property][nextIndex++],
                            done: false
                        };
                    } else {
                        return {
                            done: true
                        };
                    }
                }
            };
        };
    };
}
