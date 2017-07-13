import {checkArgumentType} from '../utils/check-type';
import fs from 'fs';

/**
 * File meta information
 * @class File
 * @public
 */
export default class File {

    /**
     * @constructor
     * @param {string} filePath - path to file
     */
    constructor(filePath) {
        checkArgumentType(filePath, 'string', 'first');
        this.path = filePath;
    }

    /**
     * Read file content
     * async function
     * @method read
     * @return {Promise.<string>}
     */
    read() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

}
