import {
    configure,
    runSpecs,
    addReporter,
    TerminalReporter,
    JunitReporter
} from '../src/guit';

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

describe('Top Level suite 2:', function() {

    it('spec 2', function() {
        expect(2).toBe(2);
    });

    describe('Nested suite 2:', function() {
        it('nested spec 2', async function() {
            await new Promise(resolve => {
                setTimeout(() => {
                    expect(false).toBe(true);
                    resolve();
                }, 100);
            });
        });
        it('spec 3', function() {
            expect(2).toBe(2);
        });
    });

    it('spec 4', function() {
        expect(2).toBe(2);
    });
    it('spec 5', function() {
        expect(2).toBe(1);
    });
    it('spec 6', function() {
        expect(2).toBe(2);
    });

    describe('Nested suite 3', function() {
        it('nested spec 7', async function() {
            await new Promise(resolve => {
                setTimeout(() => {
                    expect(true).toBe(true);
                    resolve();
                }, 200);
            });
        });
    });

});

configure({ report: { junitFilename: 'tmp/junitresults.xml' } });
addReporter(TerminalReporter);
addReporter(JunitReporter);
runSpecs();
