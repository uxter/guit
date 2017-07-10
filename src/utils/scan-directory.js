import glob from 'glob';
import {checkArgumentType} from './check-type';

/**
 * Scan folder by pattern
 * @function scanDirectory
 * @param {string} pattern - magic pattern such as tests/*.js
 * @return {Promise}
 * @public
 */
export async function scanDirectory(pattern) {
    checkArgumentType(pattern, 'string', 'first');
    return new Promise((resolve, reject) => {
        /**
         * Recursive Read Dir callback
         * @function done
         * @param {Error} err - error
         * @param {array.<string>} filesList - list of files
         * @private
         */
        function done(err, filesList) {
            if (err) {
                reject(err);
            } else {
                resolve(filesList);
            }
        }
        scanDirectory.scanner(pattern, {}, done);
    });
}

scanDirectory.scanner = glob;
