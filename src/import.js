import root from './root';
import path from 'path';
import recursiveReadSync from 'recursive-readdir-sync';
import { makeSpecsFromJson } from './make';

export function importHelpers(config) {
    let files = recursiveReadSync(config.helperDir);

    let helperFiles = (Array.isArray(config.helperFiles) ?
        config.helperFiles :
        [config.helperFiles]).map(item => {
        return new RegExp(item);
    });

    files.forEach(fileItem => helperFiles.forEach(helperFileItem => {
        if (helperFileItem.test(fileItem)) {
            Object.assign(root.helpers, require(path.join(process.cwd(), fileItem)));
        }
    }));

}

export function importSpecs(config) {
    let files = recursiveReadSync(config.specDir);

    let specFiles = (Array.isArray(config.specFiles) ?
        config.specFiles :
        [config.specFiles]).map(item => {
        return new RegExp(item);
    });

    files.forEach(fileItem => specFiles.forEach(specFileItem => {
        if (specFileItem.test(fileItem)) {
            let specsData = require(path.join(process.cwd(), fileItem));
            if (Array.isArray(specsData.specs)) {
                makeSpecsFromJson(specsData);
            }
        }
    }));

}
