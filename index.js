import GUIT from './lib/guit';
import assert from 'assert';

const g = new GUIT({
    width: 1280,
    height: 1024,
    checkTimeout: 100,
    doneTimeout: 5000
});

(async function() {
    await g.open('http://localhost/');
    // await g.render('example-screenshot.png');
    let calculatedSnapshot = await g.getSnapshot();
    // await g.saveSnapshot('example-snapshot.json', snapshot);
    let savedSnapshot = await g.loadSnapshot('example-snapshot.json');
    assert.deepEqual(calculatedSnapshot, savedSnapshot);
})();
