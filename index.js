import GUIT from './lib/guit';

const g = new GUIT({
    width: 320,
    height: 480,
    checkTimeout: 100,
    doneTimeout: 5000
});

(async function() {
    await g.open('http://localhost/');
    await g.render('tmp/test1.png');
    await g.mouseEvent('click', 175, 344, 'left');
    await g.render('tmp/test2.png');
    await g.mouseEvent('click', 146, 86, 'left');
    await g.render('tmp/test3.png');
    await g.mouseEvent('click', 280, 341, 'left');
    await g.sleep(1000); // animation
    await g.render('tmp/test4.png');
})();
