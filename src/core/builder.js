import {checkResultType} from '../utils/check-type';
import {checkResultInstance, checkArgumentInstance} from '../utils/check-instance';
import {checkClassSpec} from '../utils/check-class-spec';
import File from './file';
import Composite from './composite';

/**
 * A test suite builder
 * @class Builder
 * @public
 */
export default class Builder {

    /**
     * @constructor
     * @param {object} strategy - instance of a build strategy
     * @throws {TypeError}
     */
    constructor(strategy) {
        checkClassSpec(strategy, [
            'test',
            'build'
        ]);
        this.strategy = strategy;
    }

    /**
     * Check of a file path to an applicability of a strategy
     * @method test
     * @param {File} fileInstance - instance of File
     * @return {boolean}
     * @throws {TypeError}
     */
    test(fileInstance) {
        checkArgumentInstance(fileInstance, File, 'first');
        let result = this.strategy.test(fileInstance);
        checkResultType(result, 'boolean', this.strategy.constructor.name + '.test');
        return result;
    }

    /**
     * Make composition of Suite and Spec instances
     * async function
     * @method build
     * @param {File} fileInstance - instance of File
     * @return {Promise.<Composite>}
     * @throws {TypeError}
     */
    async build(fileInstance) {
        checkArgumentInstance(fileInstance, File, 'first');
        let result = await this.strategy.build(fileInstance);
        checkResultInstance(result, Composite, this.strategy.constructor.name + '.build');
        return result;
    }

}
