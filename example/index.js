import * as guit from '../index';

describe('Top Level suite', function() {

    it('spec', function() {

        expect(1).toBe(1);
    });

    describe('Nested suite', function() {

        it('nested spec', function() {

            expect(true).toBe(true);
        });

    });

});

describe('Top Level suite 2', function() {

    it('spec 2', function() {

        expect(2).toBe(1);
    });

    describe('Nested suite 2', function() {

        it('nested spec 2', async function() {
            await new Promise(resolve => {
                setTimeout(() => {
                    expect(false).toBe(true);
                    resolve();
                }, 3000);
            });
        });

    });

    describe('Nested suite 3', function() {

        it('nested spec 3', async function() {
            await new Promise(resolve => {
                setTimeout(() => {
                    expect(true).toBe(false);
                    resolve();
                }, 2000);
            });
        });

    });

});

guit.addReporter(function() {
    let obj = {};
    return new Proxy(obj, {
        get: function(target, name) {
            return function(data = {}) {
                console.log(name, data.title, data.error && '>>> ' + data.error.message);
            }
        }
    });
});
guit.runSpecs();