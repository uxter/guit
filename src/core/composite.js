import {checkArgumentType} from '../utils/check-type';
import {checkArgumentInstance} from '../utils/check-instance';

/**
 * An implementation of the pattern "Composite".
 * @class Composite
 * @public
 */
export default class Composite {

    /**
     * @constructor
     */
    constructor() {
        this.path = [];
        this.parent = null;
        this.children = [];
    }

    /**
     * Add an instance as a child
     * @method addChild
     * @param {Composite} child - an instance of a Composite
     * @throws {TypeError}
     */
    addChild(child) {
        checkArgumentInstance(child, Composite, 'first');
        this.children.push(child);
        child.parent = this;
        child.path = [...this.path, child];
    }

    /**
     * Remove a child by reference to its instance
     * @method removeChild
     * @param {Composite} child - an instance of a Composite
     * @throws {TypeError}
     */
    removeChild(child) {
        checkArgumentInstance(child, Composite, 'first');
        let index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    /**
     * Get a child instance by its index
     * @param {number} index - index of child
     * @return {(Composite|null)} - an instance of a Composite or null
     * @throws {TypeError}
     */
    getChild(index) {
        checkArgumentType(index, 'number', 'first');
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

}
