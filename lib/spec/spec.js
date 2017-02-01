import root from './root';

export default class Spec {

    constructor(title, fn) {
        this.title = title;
        this.suite = root.currentSuite;
        this.suite.items.push(this);
        this.fn = fn;
    }

}
