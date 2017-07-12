import Builder from './builder';
import Reporter from './reporter';
import Suite from './suite';
import Spec from './spec';
import File from './file';
import Collection from './collection';
import {scanDirectory} from '../utils/scan-directory';
import {checkArgumentType} from '../utils/check-type';
import statusable from '../decorators/statusable';

/**
 * Tests runner
 * @class Runner
 * @public
 */
@statusable('status', ['pending', 'fail', 'success'])
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
        specFiles.forEach(specPath => this.specFiles.addChild(new File(specPath)));
    }

    /**
     * Run all tests
     * async function
     * @method scan
     * @return {Promise.<void>}
     */
    async run() {
        for (let fileInstance of specFiles) {
            for (let builder of this.builders) {
                if (builder.test(fileInstance)) {
                    let compositeInstance = await builder.build(fileInstance);
                    // let currentSuite;
                    // let currentSpec;
                    await compositeInstance.traverse(currentCompositeInstance => {
                        if (currentCompositeInstance instanceof Suite) {
                            // @TODO implement
                        }
                        if (currentCompositeInstance instanceof Spec) {
                            // @TODO implement
                        }
                    }, currentCompositeInstance => {
                        // @TODO implement
                    });
                }
            }
        }
    }


}
