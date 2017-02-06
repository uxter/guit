import { runServer } from '../server';
import { Browser } from '../../src/guit';

describe('Page specs:', function() {

    beforeEach(async function() {
        this.closeServer = await runServer(3179);
        this.browser = await new Browser({
            width: 1280,
            height: 1024,
            checkTimeout: 100,
            doneTimeout: 5000
        });
    });

    it('page spec', async function() {
        await this.browser.open('http://localhost:3179/');
        // await this.browser.render('example/spec/test3-page.png');
        let diff = await this.browser.diffView(
            'tmp/test3-page.png',
            'example/spec/test3-page.png',
            'tmp/test3-page-diff.png',
        );
        expect(diff.percentage).toBe(0);
    });

    afterEach(function() {
        this.browser.close();
        this.closeServer();
    });

});