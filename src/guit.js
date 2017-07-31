/**
 *  @fileOverview   GUIT facade
 *  @description    The JavaScript framework for testing web UI.
 *  @author         Vasily Shilov <shcoder.ru@ya.ru> (https://github.com/uxter)
 *  @licence        ISC (https://github.com/uxter/guit/blob/master/LICENSE.txt)
 *  {@link          https://github.com/uxter/guit GitHub}
 *  {@link          https://www.npmjs.com/package/guit NPM}
 */

import Builder from './core/builder';
import Reporter from './core/reporter';
import {scanDirectory} from './utils/scan-directory';

let builders = [];
let reporters = [];
let specFiles = [];

/**
 * Append a build strategy
 * @function builder
 * @param {Object} strategy
 * @public
 *
 * @example
 * const reJson = /\.json$/;
 * class JsonBuildStrategy {
 *   test(filePath) {
 *     return reJson.test(filePath);
 *   },
 *   build(filePath) {
 *     let jsonData = require(filePath);
 *     let suite = new Suite(jsonData.title);
 *     // Some logic to create a composition using suite.addChild()
 *     return suite;
 *   }
 * }
 * builder(new JsonBuildStrategy());
 * builder(new OtherBuildStrategy());
 */
export function builder(strategy) {
    builders.push(new Builder(strategy));
}

/**
 * Append a report strategy
 * @function reporter
 * @param {Object} strategy
 * @public
 *
 * @example
 * class HttpReportStrategy {
 *
 *   constructor(url) {
 *     this.remote = new Remote(url);
 *   }

 *   started() {
 *     this.remote.send({
 *       title: 'Testing started'
 *       action: 'started',
 *       type: 'tests',
 *     });
 *   }
 *
 *   suiteStarted(suiteInstance) {
 *     this.remote.send({
 *       title: suiteInstance.title,
 *       action: 'started',
 *       type: 'suite',
 *       pathLength: suiteInstance.path.length
 *     });
 *   }
 *
 *   specStarted(specInstance) {
 *     this.remote.send({
 *       title: specInstance.title,
 *       action: 'started',
 *       type: 'spec',
 *       pathLength: specInstance.path.length
 *     });
 *   }
 *
 *   specDone(specInstance) {
 *     this.remote.send({
 *       title: specInstance.title,
 *       action: 'done',
 *       type: 'spec',
 *       pathLength: specInstance.path.length
 *     });
 *   }
 *
 *   suiteDone(suiteInstance) {
 *     this.remote.send({
 *       title: suiteInstance.title,
 *       action: 'done',
 *       type: 'suite',
 *       pathLength: suiteInstance.path.length
 *     });
 *   }
 *
 *   done() {
 *     this.remote.send({
 *       title: 'Testing done'
 *       action: 'done',
 *       type: 'tests',
 *     });
 *   }
 *
 * }
 *
 * reporter(new HttpReportStrategy(url));
 * reporter(new OtherReportStrategy(path));
 */
export function reporter(strategy) {
    reporters.push(new Reporter(strategy));
}

/**
 * Search for spec files
 * async function
 * @function scan
 * @param {{specs: <string>}} config - pattern of path to specs
 * @return {Promise.<void>}
 * @public
 *
 * @example
 * scan({
 *   specs: 'tests/specs/*.js'
 * });
 */
export async function scan(config) {
    specFiles = await scanDirectory(config.specs);
}

export function test(filePath) {

}

export function testAll() {

}
