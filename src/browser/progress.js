class Progress {

    constructor(config) {
        this.__onDone = config.done;
        this.__requests = 0;
        this.__timer = 0;
        this.__doneTimer = 0;
        this.page = config.page;
        this.checkTimeout = config.checkTimeout;
        this.onRequested = this.onResourceRequested.bind(this);
        this.onReceived = this.onResourceReceived.bind(this);
        this.onError = this.onResourceError.bind(this);
        this.bindEvents();
        this.checkRequests();
        this.__doneTimer = setTimeout(() => this.done(), config.doneTimeout);
    }

    bindEvents() {
        this.page.on('onResourceRequested', this.onRequested);
        this.page.on('onResourceReceived', this.onReceived);
        this.page.on('onResourceError', this.onError);
    }

    unbindEvents() {
        this.page.off('onResourceRequested', this.onRequested);
        this.page.off('onResourceReceived', this.onReceived);
        this.page.off('onResourceError', this.onError);
    }

    onResourceRequested() {
        this.__requests++;
        if (this.__timer) {
            clearTimeout(this.__timer);
            this.__timer = false;
        }
        clearTimeout(this.__timer);
    }

    onResourceReceived(res) {
        if (res.stage === 'end') {
            this.__requests--;
        }
        this.checkRequests();
    }

    checkRequests() {
        if (this.__requests === 0) {
            if (this.__timer) {
                clearTimeout(this.__timer);
                this.__timer = false;
            }
            this.__timer = setTimeout(() => this.done(), this.checkTimeout);
        }
    }

    done() {
        this.unbindEvents();
        clearTimeout(this.__doneTimer);
        this.__onDone(this.page);
    }

    onResourceError() {
        this.onResourceReceived({stage: 'end'});
    }

}

export default Progress;
