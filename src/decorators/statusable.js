import {checkArgumentType, isString} from '../utils/check-type';

/**
 * Create decorator for adding methods setStatus and getStatus into target Class
 * @function statusable
 * @param {string} property - property to save status
 * @param {Array.<string>} statuses - an array of statuses
 * @return {function} - statusableDecorate
 * @throws {TypeError}
 * @public
 */
export default function statusable(property, statuses) {
    checkArgumentType(property, 'string', 'first');
    checkArgumentType(statuses, 'array', 'second');
    statuses.forEach(status => {
        if (!isString(status)) {
            throw new TypeError('Status must be a string.');
        }
    });
    /**
     * Add methods setStatus and getStatus into target Class
     * @function statusableDecorate
     * @param {function} target - target Class or function-constructor
     * @throws {TypeError}
     * @throws {Error}
     * @private
     */
    return function statusableDecorate(target) {
        checkArgumentType(target, 'function', 'first');

        /**
         * Set status into property
         * @method setStatus
         * @param {string} status
         */
        target.prototype.setStatus = function(status) {
            checkArgumentType(status, 'string', 'first');
            if (statuses.indexOf(status) === -1) {
                throw new Error('Status ' + status + ' is not supported.');
            }
            this[property] = status;
        };

        /**
         * Get status from property
         * @method getStatus
         * @return {string|"initial"} - return "initial" if status was not saved
         */
        target.prototype.getStatus = function() {
            return this[property] || 'initial';
        };

    };
}
