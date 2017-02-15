import Suite from './spec/suite';
import Spec from './spec/spec';

export function makeSpecsFromJson(data) {

    new Suite(data.title, function() {

        ['beforeAll', 'afterAll', 'beforeEach', 'afterEach'].map(methodName => {
            if (data[methodName]) global[methodName](async function() {
                await this[data[methodName]].call(this);
            });
        });

        data.specs.map(spec => {
            new Spec(spec.title, async function() {
                for (let i = 0; i < spec.it.length; i++) {
                    await this[spec.it[i].action].apply(this, spec.it[i].args);
                }
            });
        });

    }, data);

}
