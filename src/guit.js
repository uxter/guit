/**
 *  @fileOverview   GUIT facade
 *  @description    The JavaScript framework for testing web UI.
 *  @author         Vasily Shilov <shcoder.ru@ya.ru> (https://github.com/shcoder-ru)
 *  @licence        ISC (https://github.com/shcoder-ru/guit/blob/master/LICENSE.txt)
 *  {@link          https://github.com/shcoder-ru/guit GitHub}
 *  {@link          https://www.npmjs.com/package/guit NPM}
 */

import Builder from './core/builder';
import {scanDirectory} from './utils/scan-directory';

let builders = [];
let reporters = [];
let specFiles = [];
let helperFiles = [];

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
 * @TODO implement Reporter
export function reporter(strategy) {
    reporters.push(new Reporter(strategy));
}
 */

export async function scan(config) {
    await Promise.all([
        scanDirectory(config.helpers),
        scanDirectory(config.specs)
    ]).then(files => {
        helperFiles = files[0];
        specFiles = files[1];
    })
}

export function test(filePath) {

}

export function testAll() {

}
