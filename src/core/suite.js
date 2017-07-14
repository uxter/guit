import {checkArgumentType} from '../utils/check-type';
import Composite from './composite';
import Collection from './collection';

/**
 * Supported helpers list
 * @type {Array.<string>}
 * @public
 */
export const supportedHelpersList = [
    'beforeAll',
    'beforeEach',
    'afterEach',
    'afterAll'
];

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
    constructor(title) {
        checkArgumentType(title, 'string', 'first');
        super();
        this.title = title;
        this.beforeAllList = new Collection('function');
        this.beforeEachList = new Collection('function');
        this.afterEachList = new Collection('function');
        this.afterAllList = new Collection('function');
    }

    /**
     * Add helper than runs before all specs
     * @method addBeforeAllHelper
     * @param {function} helper - function than runs before all specs
     * @throws {TypeError}
     */
    addBeforeAllHelper(helper) {
        this.beforeAllList.addItem(helper);
    }

    /**
     * Add helper than runs before each specs
     * @method addBeforeEachHelper
     * @param {function} helper - function than runs before each specs
     * @throws {TypeError}
     */
    addBeforeEachHelper(helper) {
        this.beforeEachList.addItem(helper);
    }

    /**
     * Add helper than runs after each specs
     * @method addAfterEachHelper
     * @param {function} helper - function than runs after each specs
     * @throws {TypeError}
     */
    addAfterEachHelper(helper) {
        this.afterEachList.addItem(helper);
    }

    /**
     * Add helper than runs after all specs
     * @method addAfterAllHelper
     * @param {function} helper - function than runs after all specs
     * @throws {TypeError}
     */
    addAfterAllHelper(helper) {
        this.afterAllList.addItem(helper);
    }

}
