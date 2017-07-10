import expect from 'expect';
import {scanDirectory} from '../../src/utils/scan-directory';

describe('utils/scan-directory specs:', function() {

    it('should reject if a scanner return an error', function(done) {

        let savedScanner = scanDirectory.scanner;
        scanDirectory.scanner = function(path, opts, cb) {
            setTimeout(() => cb(new Error('Some error'), null), 10);
        };

        scanDirectory('tests/mocks/scan-dir/**/*.json').catch(err => {
            expect(err instanceof Error).toBe(true);
            expect(err.message).toBe('Some error');
            done();
        });

        scanDirectory.scanner = savedScanner;
    });

    it('should reject if a first argument is not a string.', function(done) {

        scanDirectory(null).catch(err => {
            expect(err instanceof TypeError).toBe(true);
            expect(err.message).toBe('A first argument must be a string.');
            done();
        });

    });

    it('should resolve json files.', function(done) {

        scanDirectory('tests/mocks/scan-dir/**/*.json').then(files => {
            expect(files).toEqual([
                'tests/mocks/scan-dir/scan-dir-test1.json',
                'tests/mocks/scan-dir/sub/scan-dir-test2.json'
            ]);
            done();
        })

    });

    it('should resolve txt files.', function(done) {

        scanDirectory('tests/mocks/scan-dir/**/*.txt').then(files => {
            expect(files).toEqual([
                'tests/mocks/scan-dir/scan-dir-test1.txt',
                'tests/mocks/scan-dir/sub/scan-dir-test2.txt'
            ]);
            done();
        })

    });

});
