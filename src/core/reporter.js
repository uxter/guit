import {checkArgumentInstance} from '../utils/check-instance';
import {checkArgumentType} from '../utils/check-type';
import {checkClassSpec} from '../utils/check-class-spec';
import Suite from './suite';
import Spec from './spec';

/**
 * Reporter methods list
 * @type {Array.<string>}
 * @public
 */
export const reporterMethodsList = [
    'started',
    'suiteStarted',
    'specStarted',
    'specDone',
    'suiteDone',
    'done'
];

/**
 * Supported statuses list
 * @type {Array.<string>}
 * @private
 */
const supportedStatusesList = [
    'fail',
    'success'
];

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
        checkClassSpec(strategy, reporterMethodsList);
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
     * @param {string} status - must be fail or success
     * @param {string} failMessage - must be a string
     * @throws {TypeError}
     */
    specDone(specInstance, status, failMessage) {
        checkArgumentInstance(specInstance, Spec, 'first');
        checkArgumentType(status, 'string', 'second');
        if (supportedStatusesList.indexOf(status) === -1) {
            throw new Error('Status ' + status + ' is not supported.');
        }
        checkArgumentType(failMessage, 'string', 'third');
        this.strategy.specDone(specInstance, status, failMessage);
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
