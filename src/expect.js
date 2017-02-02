import root from './root';
import expect from 'expect';

export default function() {
    let exp = expect.apply(this, arguments);
    return new Proxy(exp, {
        get: function(target, name) {
            return function() {
                try {
                    target[name].apply(target, arguments);
                } catch(error) {
                    error.type = name;
                    root.currentSpec.error = error;
                }
            }
        }
    });
}
