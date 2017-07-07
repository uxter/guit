import {checkArgumentType} from '../utils/check-argument';
import Composite from './composite';

/**
 * Specification of test cases.
 * @class Spec
 * @public
 */
export default class Spec extends Composite {

    /**
     * @param {string} title - A test specification name
     * @param {function} executor - A test specification executor
     * @constructor
     */
    constructor(title, executor) {
        checkArgumentType(title, 'first', 'string');
        checkArgumentType(executor, 'second', 'function');
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
