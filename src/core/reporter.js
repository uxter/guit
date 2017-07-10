import {checkArgumentInstance} from '../utils/check-instance';
import {checkClassSpec} from '../utils/check-class-spec';
import Suite from './suite';
import Spec from './spec';

/**
 * A reporter
 * @class Reporter
 * @public
 */
export default class Reporter {

    /**
     * @constructor
     * @param {object} strategy - instance of a reporter strategy
     * @throws {TypeError}
     */
    constructor(strategy) {
        checkClassSpec(strategy, [
            'started',
            'suiteStarted',
            'specStarted',
            'specDone',
            'suiteDone',
            'done'
        ]);
        this.strategy = strategy;
    }

    /**
     * Call when testing is started
     * @method started
     */
    started() {
        this.strategy.started();
    }

    /**
     * Call when Suite is started
     * @method suiteStarted
     * @param {Suite} suiteInstance
     * @throws {TypeError}
     */
    suiteStarted(suiteInstance) {
        checkArgumentInstance(suiteInstance, Suite, 'first');
        this.strategy.suiteStarted(suiteInstance);
    }

    /**
     * Call when Spec is started
     * @method specStarted
     * @param {Spec} specInstance
     * @throws {TypeError}
     */
    specStarted(specInstance) {
        checkArgumentInstance(specInstance, Spec, 'first');
        this.strategy.specStarted(specInstance);
    }

    /**
     * Call when Spec is done
     * @method specDone
     * @param {Spec} specInstance
     * @throws {TypeError}
     */
    specDone(specInstance) {
        checkArgumentInstance(specInstance, Spec, 'first');
        this.strategy.specDone(specInstance);
    }

    /**
     * Call when Suite is done
     * @method suiteDone
     * @param {Suite} suiteInstance
     * @throws {TypeError}
     */
    suiteDone(suiteInstance) {
        checkArgumentInstance(suiteInstance, Suite, 'first');
        this.strategy.suiteDone(suiteInstance);
    }

    /**
     * Call when testing is done
     * @method done
     */
    done() {
        this.strategy.done();
    }

}
