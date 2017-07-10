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
            wrongTypeOf = variable === null || typeof variable !== type;
            break;
        case 'null':
            wrongTypeOf = variable !== null;
            break;
        case 'array':
            wrongTypeOf = !Array.isArray(variable);
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
    if (typeof second !== 'string') {
        throw new TypeError('A second argument must be a string.');
    }
    if (typeof third !== 'string') {
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
