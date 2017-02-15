import root from '../root';

export default class Suite {

    constructor(title, fn, source) {
        this.path = [];
        this.beforeAllList = [];
        this.source = source;
        this.title = title;
        this.beforeEachList = [];
        this.afterEachList = [];
        this.afterAllList = [];
        this.items = [];
        if (root.currentSuite) {
            this.parent = root.currentSuite;
            this.parent.items.push(this);
            this.path = [ ...this.parent.path, this ];
        } else {
            this.path = [ this ];
            root.items.push(this);
        }
        this.fn = fn;
        this.create();
    }

    create() {
        root.currentSuite = this;
        this.fn();
        root.currentSuite = this.parent;
    }

}
