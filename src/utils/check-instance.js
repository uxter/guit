import {checkArgumentType} from './check-type';

/**
 * Check whether an argument in its prototype chain has the prototype property of a constructor
 * @function checkArgumentInstance
 * @param {object} argument - argument whose type should be checked
 * @param {function} constructor - class or function-constructor
 * @param {string} position - can be "first", "second", ...
 * @throws {TypeError}
 * @public
 */
export function checkArgumentInstance(argument, constructor, position) {
    checkArgs(argument, constructor, position);
    checkInstance(argument, constructor, 'A ' + position + ' argument must be an instance of ' + constructor.name + '.');
}

/**
 * Check whether a result in its prototype chain has the prototype property of a constructor
 * @function checkResultInstance
 * @param {object} result - result whose type should be checked
 * @param {function} constructor - class or function-constructor
 * @param {string} name - function name
 * @throws {TypeError}
 * @public
 */
export function checkResultInstance(result, constructor, name) {
    checkArgs(result, constructor, name);
    checkInstance(result, constructor, name + ' must return an instance of ' + constructor.name + '.');
}

/**
 * Check type of first, second and third arguments of public functions
 * @function checkArgs
 * @param {object} first
 * @param {function} second
 * @param {string} third
 * @throws {TypeError}
 * @private
 */
function checkArgs(first, second, third) {
    checkArgumentType(first, 'object', 'first');
    checkArgumentType(second, 'function', 'second');
    checkArgumentType(third, 'string', 'third');
}

/**
 * Check whether a variable in its prototype chain has the prototype property of a constructor
 * @function checkInstance
 * @param {*} variable - variable whose constructor should be checked
 * @param {constructor} constructor - class or function-constructor
 * @param {string} message - message of exception
 * @throws {TypeError}
 * @private
 */
function checkInstance(variable, constructor, message) {
    if (!(variable instanceof constructor)) {
        throw new TypeError(message);
    }
}
