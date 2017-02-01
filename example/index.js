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

describe('Top Level suite', function() {

    it('spec', function() {

        expect(2).toBe(1);
    });

    describe('Nested suite', function() {

        it('nested spec', async function() {
            await new Promise(resolve => {
                setTimeout(() => {
                    expect(false).toBe(true);
                    resolve();
                }, 3000);
            });
        });

    });

    describe('Nested suite 2', function() {

        it('nested spec 2', async function() {
            await new Promise(resolve => {
                setTimeout(() => {
                    expect(false).toBe(true);
                    resolve();
                }, 2000);
            });
        });

    });

});

guit.runSpecs().catch(e => {
    console.log(e);
});