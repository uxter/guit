import {
    checkArgumentType,
    checkArgumentConstructor
} from '../utils/check-argument';

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
     */
    addChild(child) {
        checkArgumentConstructor(child, 'first', Composite);
        this.children.push(child);
        child.parent = this;
        child.path = [...this.path, child];
    }

    /**
     * Remove a child by reference to its instance
     * @method removeChild
     * @param {Composite} child - an instance of a Composite
     */
    removeChild(child) {
        checkArgumentConstructor(child, 'first', Composite);
        let index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    /**
     * Get a child instance by its index
     * @param {number} index - index of child
     * @return {(Composite|null)} - an instance of a Composite or null
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

}
