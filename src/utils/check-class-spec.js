import {checkArgumentType} from './check-type';

/**
 * Check class specification (methods list)
 * @function checkClassSpec
 * @param {object} instance - an instance of a class whose a specification should be checked
 * @param {array.<string>} methods - a list of method names
 * @throws {TypeError}
 * @public
 */
export function checkClassSpec(instance, methods) {
    checkArgumentType(instance, 'object', 'first');
    checkArgumentType(methods, 'array', 'second');
    for (let i = 0; i < methods.length; i++) {
        checkMethod(instance, methods[i]);
    }
}

/**
 * Check class method
 * @function checkMethod
 * @param {object} instance - an instance of a class whose a specification should be checked
 * @param {string} method - method name
 * @throws {TypeError}
 * @private
 */
function checkMethod(instance, method) {
    if (typeof method !== 'string') {
        throw new TypeError('A method name must be string.');
    }
    if (typeof instance[method] !== 'function') {
        let className = instance.constructor.name;
        throw new TypeError(className + ' specification must implement a method "' + method + '".');
    }
}
