import path from 'path';
import recursiveReadSync from 'recursive-readdir-sync';

export default function importSpecs(config) {
    let files = recursiveReadSync(config.specDir);

    let specFiles = (Array.isArray(config.specFiles) ?
        config.specFiles :
        [config.specFiles]).map(item => {
            return new RegExp(item);
        });

    files.forEach(fileItem => specFiles.forEach(specFileItem => {
        if (specFileItem.test(fileItem)) {
            require(path.join(process.cwd(), fileItem));
        }
    }));

}
