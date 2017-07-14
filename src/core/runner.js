import Builder from './builder';
import Reporter, {reporterMethodsList} from './reporter';
import Suite, {supportedHelpersList} from './suite';
import Spec from './spec';
import File from './file';
import Collection from './collection';
import Composite from './composite';
import {scanDirectory} from '../utils/scan-directory';
import {checkArgumentType} from '../utils/check-type';
import {checkArgumentInstance} from '../utils/check-instance';

/**
 * Tests runner
 * @class Runner
 * @public
 */
export default class Runner {

    /**
     * @constructor
     * @param {object} config - configuration object
     * @throws {TypeError}
     */
    constructor(config) {
        checkArgumentType(config, 'object', 'first');
        this.config = config;
        this.builders = new Collection(Builder);
        this.reporters = new Collection(Reporter);
        this.specFiles = new Collection(File);
        this.contextMap = new Map();
        this.failsMap = new Map();
    }

    /**
     * Append a build strategy
     * @method addBuilderStrategy
     * @param {object} strategy - a builder strategy
     * @throws {TypeError}
     * @public
     */
    addBuilderStrategy(strategy) {
        this.builders.addItem(new Builder(strategy));
    }

    /**
     * Append a report strategy
     * @method addReporterStrategy
     * @param {object} strategy - a reporter strategy
     * @throws {TypeError}
     * @public
     */
    addReporterStrategy(strategy) {
        this.reporters.addItem(new Reporter(strategy));
    }

    /**
     * Scan spec files and add into collections
     * async function
     * @method scan
     * @return {Promise.<void>}
     */
    async scan() {
        let specFiles = await scanDirectory(this.config.specs);
        specFiles.forEach(specPath => this.specFiles.addItem(new File(specPath)));
    }

    /**
     * Run all tests
     * async function
     * @method scan
     * @return {Promise.<void>}
     */
    async run() {
        this.report('started');
        for (let fileInstance of this.specFiles) {
            let builder = this.findBuilder(fileInstance);
            let compositeInstance = await builder.build(fileInstance);
            let execute = this.makeBranchStartedHandler();
            let done = this.makeBranchDoneHandler();
            await compositeInstance.traverse(execute, done);
        }
        this.report('done');
    }

    /**
     * Find builder for fileInstance
     * @method findBuilder
     * @param {File} fileInstance - an instance of File
     * @return {Builder}
     * @throws {Error}
     */
    findBuilder(fileInstance) {
        for (let builder of this.builders) {
            if (builder.test(fileInstance)) {
                return builder;
            }
        }
        throw new Error('Builder for ' + fileInstance.path + ' is not specified.');
    }

    /**
     * Make handler to run when branch is started
     * @method makeBranchStartedHandler
     * @return {function(Composite)}
     */
    makeBranchStartedHandler() {
        /**
         * Run to execute current Composite instance
         * @param {Composite} currentCompositeInstance - an instance of Composite
         * @return {Promise.<void>}
         */
        return async currentCompositeInstance => {
            let context = {...(this.contextMap.get(currentCompositeInstance.parent) || {})};
            this.contextMap.set(currentCompositeInstance, context);
            if (currentCompositeInstance instanceof Suite) {
                await this.runPathHelpers(currentCompositeInstance, 'beforeAll');
                this.report('suiteStarted', currentCompositeInstance);
            }
            if (currentCompositeInstance instanceof Spec) {
                await this.runPathHelpers(currentCompositeInstance, 'beforeEach');
                this.report('specStarted', currentCompositeInstance);
                try {
                    await currentCompositeInstance.run(context);
                } catch(err) {
                    this.failsMap(currentCompositeInstance, 'fail', err.message);
                }
            }
        };
    }

    /**
     * Make handler to run when branch is complete
     * @method makeBranchDoneHandler
     * @return {function(Composite)}
     */
    makeBranchDoneHandler() {
        /**
         * Run when branch is complete
         * @function makeBranchDoneHandler
         * @param {Composite} currentCompositeInstance - an instance of Composite
         */
        return async currentCompositeInstance => {
            if (currentCompositeInstance instanceof Suite) {
                this.report('suiteDone', currentCompositeInstance);
                await this.runPathHelpers(currentCompositeInstance, 'afterAll');
            }
            if (currentCompositeInstance instanceof Spec) {
                this.report('specDone', currentCompositeInstance);
                await this.runPathHelpers(currentCompositeInstance, 'afterEach');
            }
        };
    }

    /**
     * Call method for each reporter
     * @method report
     * @param {string} method - method that should be called
     * @param {Composite|null} compositeInstance - an instance of Composite
     * @throws {TypeError}
     * @throws {Error}
     */
    report(method, compositeInstance = null) {
        checkArgumentType(method, 'string', 'first');
        if (reporterMethodsList.indexOf(method) === -1) {
            throw new Error('Method ' + method + ' is not supported.');
        }
        if (compositeInstance && !(compositeInstance instanceof Composite)) {
            throw new TypeError('A second argument must be an instance of Composite or null.');
        }
        let args = [compositeInstance];
        if (method === 'specDone') {
            let fail = this.failsMap.get(compositeInstance);
            args.push(fail ? 'fail' : 'success');
            args.push(fail || '');
        }
        for (let reporterInstance of this.reporters) {
            reporterInstance[method].apply(reporterInstance, args);
        }
    }

    /**
     * Run all helpers with name helperName in path of Composite instance
     * async function
     * @method runPathHelpers
     * @param {Composite} currentCompositeInstance - an instance of Composite
     * @param {String} helperName - can be beforeAll, beforeEach, afterEach or afterAll
     * @return {Promise.<void>}
     */
    async runPathHelpers(currentCompositeInstance, helperName) {
        checkArgumentInstance(currentCompositeInstance, Composite, 'first');
        checkArgumentType(helperName, 'string', 'second');
        if (supportedHelpersList.indexOf(helperName) === -1) {
            throw new Error('Helper ' + helperName + ' is not supported.');
        }
        let context = this.contextMap.get(currentCompositeInstance);
        let pathItemsList = [];
        for (let pathItem of currentCompositeInstance.path) {
            pathItemsList.push(pathItem);
        }
        if (helperName.indexOf('after') === 0) {
            pathItemsList.reverse();
            if (helperName === 'afterAll') {
                pathItemsList.unshift(pathItemsList.pop());
            }
        }
        for (let pathItem of pathItemsList) {
            if (pathItem instanceof Suite) {
                for (let helper of pathItem[helperName + 'List']) {
                    await helper.call(context);
                }
            }
        }
    }

}
