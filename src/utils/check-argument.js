/**
 * Check type of argument
 * @function checkArgumentType
 * @param {*} argument - argument whose type should be checked
 * @param {string} position - can be "first", "second", ...
 * @param {string} type - can be "string", "function", ...
 * @throws {TypeError}
 * @public
 */
export function checkArgumentType(argument, position, type) {
    if (typeof position !== 'string') {
        throw new TypeError('A second argument must be a string.');
    }
    if (typeof type !== 'string') {
        throw new TypeError('A third argument must be a string.');
    }
    let wrongTypeOf = type === 'object' && argument === null || typeof argument !== type;
    let n = type === 'object' || type === 'undefined' ? 'n' : '';
    if (wrongTypeOf) {
        throw new TypeError('A ' + position + ' argument must be a' + n + ' ' + type + '.');
    }
}

/**
 * Check whether an argument in its prototype chain has the prototype property of a constructor
 * @function checkArgumentConstructor
 * @param {*} argument - argument whose constructor should be checked
 * @param {string} position - can be "first", "second", ...
 * @param {constructor} constructor - class or function-constructor
 * @throws {TypeError}
 * @public
 */
export function checkArgumentConstructor(argument, position, constructor) {
    checkArgumentType(argument, 'first', 'object');
    checkArgumentType(position, 'second', 'string');
    checkArgumentType(constructor, 'third', 'function');
    if (!(argument instanceof constructor)) {
        throw new TypeError('A ' + position + ' argument must be an instance of ' + constructor.name + '.');
    }
}
