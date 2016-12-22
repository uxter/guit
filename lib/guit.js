import phantom from 'phantom';
import Progress from './progress';

class GUIT {

    constructor(config) {
        this.checkTimeout = config.checkTimeout;
        this.doneTimeout = config.doneTimeout;
        this.viewportSize = { width: config.width, height: config.height };
        this.page = phantom.create().then(instance => this.createPage(instance));
    }

    createPage(instance) {
        return instance.createPage().then(page => {
            page.property('viewportSize', this.viewportSize);
            return page;
        });
    }

    progress() {
        return new Promise((resolve, reject) => this.page
            .then(page => new Progress(page, resolve, this.checkTimeout, this.doneTimeout))
            .catch(reject));
    }

    open(url) {
        let p = this.progress();
        this.page.then(page => page.open(url));
        return p;
    }

    render(path) {
        return this.page.then(page => page.render(path));
    }

}

export default GUIT;