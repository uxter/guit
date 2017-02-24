describe('Top Level suite 1:', function() {

    it('spec 1', function() {
        expect(1).toBe(1);
    });

    describe('Nested suite 1:', function() {
        it('nested spec 1', async function() {
            await new Promise(resolve => {
                setTimeout(function() {
                    resolve();
                }, 1000);
            });
            expect(true).toBe(false);
        });
    });

});
