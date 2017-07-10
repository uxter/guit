import {checkArgumentType} from '../utils/check-type';
import Composite from './composite';

/**
 * Specification of test cases.
 * @class Spec
 * @public
 */
export default class Spec extends Composite {

    /**
     * @constructor
     * @param {string} title - A test specification name
     * @param {function} executor - A test specification executor
     * @throws {TypeError}
     */
    constructor(title, executor) {
        checkArgumentType(title, 'string', 'first');
        checkArgumentType(executor, 'function', 'second');
        super();
        this.title = title;
        this.executor = executor;
    }

    /**
     * Run test specification executor
     * @method run
     */
    run() {
        this.executor();
    }

}
