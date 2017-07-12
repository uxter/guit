import {checkArgumentType} from '../utils/check-type';
import statusable from '../decorators/statusable';

/**
 * File meta information
 * @class File
 * @public
 */
@statusable('status', ['fail', 'success'])
export default class File {

    /**
     * @constructor
     * @param {string} filePath - path to file
     */
    constructor(filePath) {
        checkArgumentType(filePath, 'string', 'first');
        this.path = filePath;
    }

}
