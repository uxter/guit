import expect from 'expect';
import Suite from '../../src/core/suite';

describe('core/suite specs:', function () {

    it('should throw an exception if a first argument is not a string.', function () {

        expect(function () {
            new Suite(1);
        }).toThrow('A first argument must be a string.');

    });

    it('should throw an exception if a second argument is not a function.', function () {

        expect(function () {
            new Suite('Some specs:', 2);
        }).toThrow('A second argument must be a function.');

    });

    it('should ...', function () {
        let suiteInstance = new Suite('Some specs:', function() {});
        // expect(suiteInstance).toType(Suite);
    });

});
