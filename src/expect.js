import root from './root';
import expect from 'expect';

let methods = [
    'toExist', 'toNotExist', 'toBe', 'toNotBe', 'toEqual',
    'toNotEqual', 'toThrow', 'toNotThrow', 'toBeA', 'toNotBeA',
    'toMatch', 'toNotMatch', 'toBeLessThan', 'toBeLessThanOrEqualTo', 'toBeGreaterThan',
    'toBeGreaterThanOrEqualTo', 'toInclude', 'toExclude', 'toIncludeKeys', 'toIncludeKey',
    'toExcludeKeys', 'toExcludeKey', 'toHaveBeenCalled', 'toHaveBeenCalledWith', 'toNotHaveBeenCalled',
    'toBeAn', 'toNotBeAn', 'toBeTruthy', 'toBeFalsy', 'toBeFewerThan',
    'toBeMoreThan', 'toContain', 'toNotContain', 'toNotInclude', 'toContainKeys',
    'toNotContainKeys', 'toNotIncludeKeys', 'toContainKey', 'toNotContainKey', 'toNotIncludeKey'
];

function getHandler(target, name) {
    if (typeof target[name] !== 'function') {
        return target[name];
    }
    return function() {
        try {
            target[name].apply(target, arguments);
        } catch(error) {
            error.type = name;
            root.currentSpec.error = error;
        }
    }
}

function wrapMethods(target) {
    methods.forEach(name => {
        if (name in target) {
            let method = target[name];
            target[name] = function() {
                try {
                    method.apply(target, arguments);
                } catch(error) {
                    error.type = name;
                    root.currentSpec.error = error;
                }
            };
        }
    });
    return target;
}

export default function() {
    let exp = expect.apply(this, arguments);
    if (global.Proxy) {
        return new Proxy(exp, {get: getHandler});
    } else {
        return wrapMethods(exp);
    }
}
