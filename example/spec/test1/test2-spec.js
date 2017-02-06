describe('Top Level suite 2:', function() {

    describe('Nested suite 2:', function() {
        it('nested spec 2', async function() {
            await new Promise(resolve => {
                setTimeout(() => {
                    expect(false).toBe(false);
                    resolve();
                }, 100);
            });
        });
        it('spec 3', function() {
            expect(2).toBe(2);
        });
    });

});