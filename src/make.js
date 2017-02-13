export function makeSpecsFromJson(data) {

    describe(data.title, function() {

        ['beforeAll', 'afterAll', 'beforeEach', 'afterEach'].map(methodName => {
            if (data[methodName]) global[methodName](async function() {
                await this[data[methodName]].call(this);
            });
        });

        data.specs.map(spec => {
            it(spec.title, async function() {
                for (let i = 0; i < spec.it.length; i++) {
                    await this[spec.it[i].action].apply(this, spec.it[i].args);
                }
            });
        });

    });

}
