// import { runServer } from './server';
import guit from '../index';

// runServer(3000).then(close => setTimeout(close, 5000)).catch((err) => err);

describe('Test 1', function() {
    it('Should be 1', async function() {
        expect(true).toBeFalsy();
        await new Promise((resolve, reject) => setTimeout(resolve, 100));
        expect(true).toBeTruthy();
    });
    it('Should be 2', async function() {
        expect(true).toBeTruthy();
        await new Promise((resolve, reject) => setTimeout(resolve, 400));
        expect(true).toBeFalsy();
    });
});

describe('Test 2', function() {
    it('Should be 3', async function() {
        expect(true).toBeTruthy();
        await new Promise((resolve, reject) => setTimeout(resolve, 100));
        expect(true).toBeTruthy();
    });
    it('Should be 4', async function() {
        expect(true).toBeFalsy();
        expect(true).toBeTruthy();
    });
});

guit.run(report => console.log(report));


/*
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
*/
