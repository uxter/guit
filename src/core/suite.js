import {
    checkArgumentType,
    checkArgumentConstructor
} from '../utils/check-argument';

/**
 * A container that has a set of tests.
 * (Composite)
 * @class Suite
 * @public
 */
export default class Suite {

    /**
     * @param {string} title - A test suite name
     * @param {function} creator - A test suite creator
     * @constructor
     */
    constructor(title, creator) {
        checkArgumentType(title, 'first', 'string');
        checkArgumentType(creator, 'second', 'function');
        this.path = [];
        this.title = title;
        this.beforeAllList = [];
        this.beforeEachList = [];
        this.afterEachList = [];
        this.afterAllList = [];
        this.parent = null;
        this.children = [];
        this.creator = creator;
    }

    /**
     * Add an instance as a child
     * @method addChild
     * @param {Suite} child - an instance of a Suite
     */
    addChild(child) {
        checkArgumentConstructor(child, 'first', Suite);
        this.children.push(child);
        child.parent = this;
        child.path = [...this.path, child];
    }

    /**
     * Remove a child by reference to its instance
     * @method removeChild
     * @param {Suite} child - an instance of a Suite
     */
    removeChild(child) {
        checkArgumentConstructor(child, 'first', Suite);
        let index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    /**
     * Get a child instance by its index
     * @param {number} index - index of child
     * @return {(Suite|null)} - an instance of a Suite or null
     */
    getChild(index) {
        checkArgumentType(index, 'first', 'number');
        return this.children[index] || null;
    }

    /**
     * Check the availability of children
     * @method hasChildren
     * @return {boolean}
     */
    hasChildren() {
        return this.children.length > 0;
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
     * Get helpers that run before all specs
     * @method getBeforeAllHelpersList
     * @return {Array.<function>} - array or functions that run before all specs
     */
    getBeforeAllHelpersList() {
        return this.beforeAllList;
    }

    /**
     * Get helpers that run before each specs
     * @method getBeforeEachHelpersList
     * @return {Array.<function>} - array or functions that run before each specs
     */
    getBeforeEachHelpersList() {
        return this.beforeEachList;
    }

    /**
     * Get helpers that run after each specs
     * @method getAfterEachHelpersList
     * @return {Array.<function>} - array or functions that run after each specs
     */
    getAfterEachHelpersList() {
        return this.afterEachList;
    }

    /**
     * Get helpers that run after all specs
     * @method getAfterAllHelpersList
     * @return {Array.<function>} - array or functions that run after all specs
     */
    getAfterAllHelpersList() {
        return this.afterAllList;
    }

    /**
     * Run suite creator
     * @method create
     */
    create() {
        this.creator();
    }

}
