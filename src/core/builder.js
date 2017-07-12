import {checkArgumentType, checkResultType} from '../utils/check-type';
import {checkResultInstance} from '../utils/check-instance';
import {checkClassSpec} from '../utils/check-class-spec';
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
     * @param {string} filePath
     * @return {boolean}
     * @throws {TypeError}
     */
    test(filePath) {
        checkArgumentType(filePath, 'string', 'first');
        let result = this.strategy.test(filePath);
        checkResultType(result, 'boolean', this.strategy.constructor.name + '.test');
        return result;
    }

    /**
     * Make composition of Suite and Spec instances
     * async function
     * @method build
     * @param {string} filePath
     * @return {Promise.<Composite>}
     * @throws {TypeError}
     */
    async build(filePath) {
        checkArgumentType(filePath, 'string', 'first');
        let result = await this.strategy.build(filePath);
        checkResultInstance(result, Composite, this.strategy.constructor.name + '.build');
        return result;
    }

}
