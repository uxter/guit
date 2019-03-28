# :hammer: The development of [the new major version 2](https://github.com/uxter/guit/tree/v2) is being conducted at the moment. [![Build Status](https://travis-ci.org/uxter/guit.svg?branch=v2)](https://travis-ci.org/uxter/guit) [![Coverage Status](https://codecov.io/gh/uxter/guit/branch/v2/graph/badge.svg)](https://codecov.io/gh/uxter/guit) [![Dependency Status](https://david-dm.org/uxter/guit.svg)](https://david-dm.org/uxter/guit) [![Join the chat at https://gitter.im/es-guit](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/es-guit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

-----

[![GUIT](https://rawgithub.com/uxter/guit/master/images/guit-logo.png)](https://github.com/uxter/guit)

The JavaScript framework for testing web UI

[![npm package](https://nodei.co/npm/guit.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/guit)

## Installation
```sh
# Local installation:
npm install --save-dev guit

# Global installation:
npm install -g guit
```

## Usage

To run your tests in command line

```sh
guit --help
#
#  Usage: guit [options]
#
#  Options:
#
#    -h, --help               output usage information
#    --spec-dir <dir>         Specify spec's dir to find
#    --spec-files <regex>     Specify spec's file regex to run
#    --helper-dir <dir>       Specify helper's dir to find
#    --helper-files <regex>   Specify helper's file regex to import
#    --junit-filename <file>  Specify junit results file to save
#
```

Run the tests using

`guit --spec-dir ./example/spec/ --spec-files \\-spec\\.js$`

To run your tests using npm, you may specify scripts in `package.json`

```json
{
  "scripts": {
    "test": "guit --spec-dir ./example/spec/ --spec-files \\-spec\\.js$"
  }
}
```

Run the tests using `npm test`

## Configuration

You may specify the config in `.guitrc`

```json
{
    "helperDir": "helper",
    "helperFiles": ".*-helper.js",
    "specDir": "spec",
    "specFiles": [
        ".*-spec.js",
        ".*-spec.json"
    ],
    "junitFilename": "junitresults.xml"
}
```

Alternatively, you may specify the field `guit` in your `package.json`

```json
{
  "guit": {
    "helperDir": "helper",
    "helperFiles": ".*-helper.js",
    "specDir": "spec",
    "specFiles": [
      ".*-spec.js",
      ".*-spec.json"
    ],
    "junitFilename": "junitresults.xml"
  }
}
```

And specify scripts in `package.json`

```json
{
  "scripts": {
    "test": "guit"
  }
}
```

## Global methods

`describe("<SUITE DESCRIPTION>", <FUNCTION>);`    
`it("<CASE DESCRIPTION>", <FUNCTION>);` (support async await)    
`beforeAll(<FUNCTION>);` (support async await)    
`beforeEach(<FUNCTION>);` (support async await)    
`afterEach(<FUNCTION>);` (support async await)    
`afterAll(<FUNCTION>);` (support async await)    
`expect(<ACTUAL>)`

guit uses [expect](https://github.com/mjackson/expect)

Usage methods for create specs

```js
describe('Suite 1:', function() {

    beforeAll(function() {
        this.config = {};
    });

    beforeEach(function() {
        this.data = {};
    });

    it('Spec 1', function() {
        expect({}).toEqual({});
    });

    afterEach(function() {
        delete this.data;
    });

    afterAll(function() {
        delete this.config;
    });

});
```

Usage with async await

```js
import { runServer, stopServer } from 'path/to/server';
import { sendRequest } from 'path/to/client'

describe('Suite 1:', function() {

    beforeAll(async function() {
        await runServer();
    });

    it('Spec 1', async function() {
        let response1 = await sendRequest({a: 1});
        let response2 = await sendRequest({a: 2});
        expect(response1).toNotEqual(response2);
    });

    afterAll(async function() {
        await stopServer();
    });

});
```

Usage json file for create specs
```json
{
  "title": "Suite 1:",
  "beforeAll": "beforeAllForSuite1",
  "afterAll": "afterAllForSuite1",
  "beforeEach": "beforeEachForSuite1",
  "afterEach": "afterEachForSuite1",
  "specs": [
    {
      "title": "Open page:",
      "it": [
        {
          "action": "open",
          "args": [ "http://127.0.0.1:3000/" ]
        },
        {
          "action": "sleep",
          "args": [ 1000 ]
        },
        {
          "action": "checkView",
          "args": [ "main-page" ]
        }
      ]
    },
    {
      "title": "Click button:",
      "it": [
        {
          "action": "mouseEvent",
          "args": [ "click", 110, 300 ]
        },
        {
          "action": "sleep",
          "args": [ 1000 ]
        },
        {
          "action": "checkView",
          "args": [ "main-page-001" ]
        }
      ]
    }
  ]
}
```

### Helpers

Helper file example
```js
export async function open(url) {
    await this.browser.open(url);
}

export async function sleep(time) {
    await this.browser.sleep(time);
}

export async function mouseEvent(type, x, y) {
    await this.browser.mouseEvent(type, x, y);
}

export async function keyboardEvent(type, key) {
    await this.browser.keyboardEvent(type, key);
}

export async function beforeAllForSuite1 {
    // start this.browser
    // start this.server
}

export async function afterAllForSuite1 {
    // stop this.browser
    // stop this.server
}

export async function beforeEachForSuite1 {
    // ...
}

export async function afterEachForSuite1 {
    // ...
}
```

## Tools

### Browser

```js
import { Browser } from 'guit';
```

Initializing

```js
let browserInstance = await new Browser({
    width: <WIDTH px>,
    height: <WIDTH px>,
    checkTimeout: <TIME ms>,
    doneTimeout: <TIME ms>
});
```

Methods

Open page in browser
```js
await browserInstance.open(<URL>);
```

Close page
```js
await browserInstance.close();
```

Close browser
```js
await browserInstance.exit();
```

Render view into image
```js
await browserInstance.render(<IMAGE PATH>);
```

Sleep
```js
await browserInstance.sleep(<TIME ms>);
```

Fire mouse event
```js
await browserInstance.mouseEvent(
    <TYPE>,
    <POSITION X>,
    <POSITION X>,
    <BUTTON left|right>
);
```

Fire keyboard event
```js
await browserInstance.keyboardEvent(<TYPE>, <KEY>);
```

Return snapshot of computed style
```js
await browserInstance.getSnapshot(<IGNORE ATTRIBUTES (array)>);
```

Save snapshot of computed style
```js
await browserInstance.saveSnapshot(<PATH TO FILE>, <SNAPSHOT>);
```

Load snapshot of computed style
```js
await browserInstance.loadSnapshot(<PATH TO FILE>);
```

Compare current snapshot with saved snapshot
```js
await browserInstance.diffSnapshot(
    <ACTUAL SNAPSHOT>,
    <ORIGINAL SNAPSHOT>,
    <DEVIATION ATTRIBUTES (object)>
);
```

Compare current snapshot with saved snapshot
```js
await browserInstance.diffView(
    <PATH TO ACTUAL IMAGE>,
    <PATH TO EXPECTED IMAGE>,
    <PATH TO DIFF IMAGE>
);
```

Usage Browser

```js
import { runServer } from '../server';
import { Browser } from 'guit';

describe('Page specs:', function() {

    beforeEach(async function() {
        this.closeServer = await runServer(3179);
        this.browser = await new Browser({
            width: 1280,
            height: 1024,
            checkTimeout: 100,
            doneTimeout: 5000,
            args: [
                '--proxy=http://127.0.0.1:8080' // http proxy server
            ]
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
```

[Supported args](https://github.com/ariya/phantomjs/blob/master/src/config.cpp#L47)

### Add custom reporter

```js
import { addReporter } from 'guit';
```

Usage `addReporter(CustomReporterClass)`

```js
export default class CustomReporterClass {

    constructor(config) { /* ... */}

    started() { /* ... */}

    suiteStarted(suite) { /* ... */}

    specStarted(spec) { /* ... */}

    specDone(spec) { /* ... */}

    suiteDone(suite) { /* ... */ }

    done() { /* ... */ }

}
```

## Dependencies
[babel-cli](https://www.npmjs.com/package/babel-cli) * 
[babel-plugin-transform-object-rest-spread](https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread) * 
[babel-polyfill](https://www.npmjs.com/package/babel-polyfill) * 
[babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015) * 
[babel-preset-es2017](https://www.npmjs.com/package/babel-preset-es2017) * 
[colors](https://www.npmjs.com/package/colors) * 
[commander](https://www.npmjs.com/package/commander) * 
[deep-object-diff](https://www.npmjs.com/package/deep-object-diff) * 
[expect](https://www.npmjs.com/package/expect) * 
[image-diff](https://www.npmjs.com/package/image-diff) * 
[phantom](https://www.npmjs.com/package/phantom) * 
[recursive-readdir-sync](https://www.npmjs.com/package/recursive-readdir-sync) * 
[xmlbuilder](https://www.npmjs.com/package/xmlbuilder) * 
[express](https://www.npmjs.com/package/express) * 
[nodemon](https://www.npmjs.com/package/nodemon)

## Note on Patches/Pull Requests

1. Fork the project.
2. Make your feature addition or bug fix.
3. Send me a pull request.
