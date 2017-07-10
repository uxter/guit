import {checkArgumentType} from '../utils/check-type';
import Composite from './composite';

/**
 * A container that has a set of tests.
 * (Composite)
 * @class Suite
 * @public
 */
export default class Suite extends Composite {

    /**
     * @constructor
     * @param {string} title - A test suite name
     * @param {function} creator - A test suite creator
     * @throws {TypeError}
     */
    constructor(title, creator) {
        checkArgumentType(title, 'string', 'first');
        checkArgumentType(creator, 'function', 'second');
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
     * @throws {TypeError}
     */
    addBeforeAllHelper(helper) {
        checkArgumentType(helper, 'function', 'first');
        this.beforeAllList.push(helper);
    }

    /**
     * Add helper than runs before each specs
     * @method addBeforeEachHelper
     * @param {function} helper - function than runs before each specs
     * @throws {TypeError}
     */
    addBeforeEachHelper(helper) {
        checkArgumentType(helper, 'function', 'first');
        this.beforeEachList.push(helper);
    }

    /**
     * Add helper than runs after each specs
     * @method addAfterEachHelper
     * @param {function} helper - function than runs after each specs
     * @throws {TypeError}
     */
    addAfterEachHelper(helper) {
        checkArgumentType(helper, 'function', 'first');
        this.afterEachList.push(helper);
    }

    /**
     * Add helper than runs after all specs
     * @method addAfterAllHelper
     * @param {function} helper - function than runs after all specs
     * @throws {TypeError}
     */
    addAfterAllHelper(helper) {
        checkArgumentType(helper, 'function', 'first');
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
