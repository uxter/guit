function getAttributes(actual, original) {
    actual = actual || {};
    original = original || {};
    return Object.keys(actual.attributes || {}).length >= Object.keys(original.attributes || {}) &&
        actual.attributes || original.attributes;
}

export function addDetails(diff, actual, original) {
    let result = {};
    if (typeof diff !== 'object' || Object.keys(diff).length === 0) return result;
    let attrs = getAttributes(actual, original);
    if (attrs) {
        result = { $$attributes: attrs };
    }
    Object.assign(result, diff);
    actual = actual || {};
    actual.children = actual.children || {};
    actual.attributes = actual.attributes || {};
    actual.style = actual.style || {};
    original = original || {};
    original.children = original.children || {};
    original.attributes = original.attributes || {};
    original.style = original.style || {};
    if (typeof result.attributes === 'object') {
        Object.keys(result.attributes).map(key => {
            result.attributes[key] = {
                $$actual: actual.attributes[key],
                $$original: original.attributes[key]
            };
        });
    }
    if (typeof result.style === 'object') {
        Object.keys(result.style).map(key => {
            result.style[key] = {
                $$actual: actual.style[key],
                $$original: original.style[key]
            };
        });
    }
    if (typeof result.children !== 'object' || Object.keys(result.children).length === 0) return result;
    Object.keys(result.children).map(key => {
        if (typeof result.children[key] === 'object') {
            result.children[key] = addDetails(result.children[key], actual.children[key], original.children[key]);
        }
    });
    return result;
}
