import expect from 'expect';
import Suite from '../../src/core/suite';

describe('core/suite specs:', function () {

    it('should throw an exception if a first argument is not a string.', function () {

        expect(function () {
            new Suite(1);
        }).toThrow('A first argument must be a string.');

    });

});
