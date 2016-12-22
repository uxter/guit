import phantom from 'phantom';

(async function() {

    const instance = await phantom.create();
    const page = await instance.createPage();

    await page.on('onResourceRequested', requestData => {
        console.info('Requesting', requestData.url)
    });

    const status = await page.open('http://localhost/');
    console.log(status);

    const content = await page.property('content');
    console.log(content);

    await instance.exit();

}());