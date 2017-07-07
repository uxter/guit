import {checkArgumentType} from '../utils/check-argument';
import Composite from './composite';

/**
 * A container that has a set of tests.
 * (Composite)
 * @class Suite
 * @public
 */
export default class Suite extends Composite {

    /**
     * @param {string} title - A test suite name
     * @param {function} creator - A test suite creator
     * @constructor
     */
    constructor(title, creator) {
        checkArgumentType(title, 'first', 'string');
        checkArgumentType(creator, 'second', 'function');
        super();
        this.title = title;
        this.beforeAllList = [];
        this.beforeEachList = [];
        this.afterEachList = [];
        this.afterAllList = [];
        this.creator = creator;
    }

    /**
     * Add helper than runs before all specs
     * @method addBeforeAllHelper
     * @param {function} helper - function than runs before all specs
     */
    addBeforeAllHelper(helper) {
        checkArgumentType(helper, 'first', 'function');
        this.beforeAllList.push(helper);
    }

    /**
     * Add helper than runs before each specs
     * @method addBeforeEachHelper
     * @param {function} helper - function than runs before each specs
     */
    addBeforeEachHelper(helper) {
        checkArgumentType(helper, 'first', 'function');
        this.beforeEachList.push(helper);
    }

    /**
     * Add helper than runs after each specs
     * @method addAfterEachHelper
     * @param {function} helper - function than runs after each specs
     */
    addAfterEachHelper(helper) {
        checkArgumentType(helper, 'first', 'function');
        this.afterEachList.push(helper);
    }

    /**
     * Add helper than runs after all specs
     * @method addAfterAllHelper
     * @param {function} helper - function than runs after all specs
     */
    addAfterAllHelper(helper) {
        checkArgumentType(helper, 'first', 'function');
        this.afterAllList.push(helper);
    }

    /**
     * Run suite creator
     * @method create
     */
    create() {
        this.creator();
    }

}
