/**
 * Check type of argument
 * @function checkArgumentType
 * @param {*} argument - argument whose type should be checked
 * @param {string} type - can be "boolean", "null", "undefined", "number", "string", "object", "array", "function"
 * @param {string} position - can be "first", "second", ...
 * @throws {TypeError}
 * @public
 */
export function checkArgumentType(argument, type, position) {
    checkArgs(type, position);
    checkType(argument, type, 'A ' + position + ' argument must be ' + getArticle(type) + ' ' + type + '.');
}

/**
 * Check type of result
 * @function checkResultType
 * @param {*} result - result whose type should be checked
 * @param {string} type - can be "boolean", "null", "undefined", "number", "string", "object", "array", "function"
 * @param {string} name - function name
 * @throws {TypeError}
 * @public
 */
export function checkResultType(result, type, name) {
    checkArgs(type, name);
    checkType(result, type, name + ' must return ' + getArticle(type) + ' ' + type + '.');
}

/**
 * Check whether a variable is an object
 * @function isObject
 * @param {*} variable - variable whose type should be checked
 * @return {boolean}
 * @public
 */
export function isObject(variable) {
    return variable !== null && typeof variable === 'object';
}

/**
 * Check whether a variable is a null
 * @function isNull
 * @param {*} variable - variable whose type should be checked
 * @return {boolean}
 * @public
 */
export function isNull(variable) {
    return variable === null;
}

/**
 * Check whether a variable is an array
 * @function isArray
 * @param {*} variable - variable whose type should be checked
 * @return {boolean}
 * @public
 */
export function isArray(variable) {
    return Array.isArray(variable);
}

/**
 * Check whether a variable is a number
 * @function isNumber
 * @param {*} variable - variable whose type should be checked
 * @return {boolean}
 * @public
 */
export function isNumber(variable) {
    return typeof variable === 'number' && !isNaN(variable);
}

/**
 * Check whether a variable is a boolean
 * @function isBoolean
 * @param {*} variable - variable whose type should be checked
 * @return {boolean}
 * @public
 */
export function isBoolean(variable) {
    return typeof variable === 'boolean';
}

/**
 * Check whether a variable is a string
 * @function isString
 * @param {*} variable - variable whose type should be checked
 * @return {boolean}
 * @public
 */
export function isString(variable) {
    return typeof variable === 'string';
}

/**
 * Check whether a variable is a function
 * @function isFunction
 * @param {*} variable - variable whose type should be checked
 * @return {boolean}
 * @public
 */
export function isFunction(variable) {
    return typeof variable === 'function';
}

/**
 * Check whether a variable is an undefined
 * @function isUndefined
 * @param {*} variable - variable whose type should be checked
 * @return {boolean}
 * @public
 */
export function isUndefined(variable) {
    return typeof variable === 'undefined';
}

/**
 * Check type
 * @function checkType
 * @param {*} variable - variable whose type should be checked
 * @param {string} type - can be "boolean", "null", "undefined", "number", "string", "object", "array", "function"
 * @param {string} message - message of exception
 * @throws {TypeError}
 * @private
 */
function checkType(variable, type, message) {
    let wrongTypeOf = false;
    switch (type) {
        case 'object':
            wrongTypeOf = !isObject(variable);
            break;
        case 'null':
            wrongTypeOf = !isNull(variable);
            break;
        case 'array':
            wrongTypeOf = !isArray(variable);
            break;
        case 'number':
            wrongTypeOf = !isNumber(variable);
            break;
        default:
            wrongTypeOf = typeof variable !== type;
            break;
    }
    if (wrongTypeOf) {
        throw new TypeError(message);
    }
}

/**
 * Check type of second and third arguments of public functions
 * @function checkArgs
 * @param {string} second
 * @param {string} third
 * @throws {TypeError}
 * @private
 */
function checkArgs(second, third) {
    if (!isString(second)) {
        throw new TypeError('A second argument must be a string.');
    }
    if (!isString(third)) {
        throw new TypeError('A third argument must be a string.');
    }
}

/**
 * Get "a" or "an"
 * @function getArticle
 * @param {string} type
 * @return {string}
 * @private
 */
function getArticle(type) {
    return type === 'object' || type === 'undefined' || type === 'array' ? 'an' : 'a';
}
