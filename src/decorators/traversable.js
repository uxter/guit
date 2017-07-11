import {checkArgumentType} from '../utils/check-type';
import Collection from '../core/collection';

/**
 * Create decorator for adding adding a method "traverse" into target class
 * @function traversable
 * @param {string} property - a property to traversable
 * @return {function} - traversableDecorate
 * @throws {TypeError}
 * @public
 */
export default function traversable(property) {
    checkArgumentType(property, 'string', 'first');
    /**
     * Decorator for adding adding a method "traverse" into target class
     * @function traversableDecorate
     * @param {function} target - class, instance of which has an iterable property
     * @throws {TypeError}
     * @public
     */
    return function traversableDecorate(target) {
        checkArgumentType(target, 'function', 'first');
        /**
         * Async method for traversing of a composition
         * @function traverse
         * @param execute - async function
         * @return {Promise.<void>}
         * @public
         */
        target.prototype.traverse = async function traverse(execute) {
            if (!(this[property] instanceof Collection)) {
                throw new TypeError('Property ' + property + ' must be an instance of Collection.');
            }
            checkArgumentType(execute, 'function', 'first');
            await execute(this);
            for (let child of this[property]) {
                await child.traverse(execute);
            }
        };
    };

}
