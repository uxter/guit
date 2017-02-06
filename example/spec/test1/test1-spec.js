describe('Top Level suite 1:', function() {

    it('spec 1', function() {
        expect(1).toBe(1);
    });

    describe('Nested suite 1:', function() {
        it('nested spec 1', function() {
            expect(true).toBe(true);
        });
    });

});
