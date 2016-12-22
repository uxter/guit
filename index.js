import GUIT from './lib/guit';

const g = new GUIT({
    width: 320,
    height: 480,
    checkTimeout: 100,
    doneTimeout: 5000
});

(async function() {
    await g.open('http://localhost/');
    await g.render('test.png');
})();
