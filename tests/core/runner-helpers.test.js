import expect from 'expect';
import Composite from '../../src/core/composite';
import Runner from '../../src/core/runner';
import Suite from '../../src/core/suite';
import Spec from '../../src/core/spec';

/*
 Composition structure

 Suite('parentSuite')
 |
 |---Spec('parentSpec1')
 |
 |---Suite('child1Suite')
 |     |
 |     |---Spec('child1Spec1')
 |     |
 |     |---Spec('child1Spec2')
 |     |
 |     |---Spec('child1Spec3')
 |
 |---Spec('parentSpec2')
 |
 |---Suite('child2Suite')
 |
 |---Spec('child2Spec1')

 */
function makeComposition(checkList) {
    let [
        parentSuite, child1Suite, child2Suite,
        parentSpec2, child1Spec1, parentSpec1,
        child1Spec2, child1Spec3, child2Spec1
    ] = [
        'parentSuite', 'child1Suite', 'child2Suite',
        'parentSpec2', 'child1Spec1', 'parentSpec1',
        'child1Spec2', 'child1Spec3', 'child2Spec1'
    ].map(name => new (name.indexOf('Spec') !== -1 ? Spec : Suite)(name, function () {
        this[name] = true;
        addIntoCheckList(checkList, {
            name: name,
            context: this
        });
    }));
    parentSuite.addChild(parentSpec1);
    parentSuite.addChild(child1Suite);
    parentSuite.addChild(parentSpec2);
    parentSuite.addChild(child2Suite);
    child1Suite.addChild(child1Spec1);
    child1Suite.addChild(child1Spec2);
    child1Suite.addChild(child1Spec3);
    child2Suite.addChild(child2Spec1);
    return [
        parentSuite, child1Suite, child2Suite,
        parentSpec2, child1Spec1, parentSpec1,
        child1Spec2, child1Spec3, child2Spec1
    ];
}

function addHelper(itemsList, checkList, helperName) {
    itemsList.map(data => {
        data[0]['add' + helperName + 'Helper'](function () {
            let name = data[0].title + '-' + helperName + (data[1] || '');
            this[name] = true;
            addIntoCheckList(checkList, {
                name: name,
                context: this
            });
        });
    });
}

async function runWithHelper(helperName) {
    let checkList = [];
    let [
        parentSuite, child1Suite
    ] = makeComposition(checkList);
    addHelper([
        [parentSuite, 1],
        [parentSuite, 2],
        [child1Suite]
    ], checkList, helperName);
    class BuilderStrategy {
        test() { return true; }
        build() { return parentSuite; }
    }
    let buildStrategyInstance = new BuilderStrategy();
    let runnerInstance = new Runner({
        specs: 'tests/mocks/scan-dir/**/*.txt'
    });
    runnerInstance.addBuilderStrategy(buildStrategyInstance);
    await runnerInstance.scan();
    await runnerInstance.run();
    return checkList;
}

function addIntoCheckList(checkList, data) {
    checkList.push({
        name: data.name,
        context: {...data.context}
    });
}

describe('core/runner runPathHelpers specs:', function () {

    describe('exceptions specs:', function () {

        it('runHelpers reject if a first argument is not an object.', function (done) {

            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            runnerInstance.runHelpers(true, 'beforeAll').catch(err => {
                expect(err.message).toBe('A first argument must be an object.');
                done();
            });

        });

        it('runHelpers reject if a first argument is not an instance of Composite.', function (done) {

            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            runnerInstance.runHelpers({}, 'beforeAll').catch(err => {
                expect(err.message).toBe('A first argument must be an instance of Composite.');
                done();
            });

        });

        it('runHelpers reject if a second argument is not a string.', function (done) {

            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            runnerInstance.runHelpers(new Composite(), true).catch(err => {
                expect(err.message).toBe('A second argument must be a string.');
                done();
            });

        });

        it('runHelpers reject if a second argument is unsupported helper.', function (done) {

            let runnerInstance = new Runner({
                specs: 'path/to/specs'
            });
            runnerInstance.runHelpers(new Composite(), 'unsupportedHelper').catch(err => {
                expect(err.message).toBe('Helper unsupportedHelper is not supported.');
                done();
            });

        });

    });

    describe('working specs:', function () {

        it('runPathHelpers should run beforeAll from all items of path.', function (done) {

            let checkData = [
                {
                    "name": "parentSuite-BeforeAll1",
                    "context": {
                        "parentSuite-BeforeAll1": true
                    }
                },
                {
                    "name": "parentSuite-BeforeAll2",
                    "context": {
                        "parentSuite-BeforeAll1": true,
                        "parentSuite-BeforeAll2": true
                    }
                },
                {
                    "name": "parentSpec1",
                    "context": {
                        "parentSuite-BeforeAll1": true,
                        "parentSuite-BeforeAll2": true,
                        "parentSpec1": true
                    }
                },
                {
                    "name": "child1Suite-BeforeAll",
                    "context": {
                        "parentSuite-BeforeAll1": true,
                        "parentSuite-BeforeAll2": true,
                        "child1Suite-BeforeAll": true
                    }
                },
                {
                    "name": "child1Spec1",
                    "context": {
                        "parentSuite-BeforeAll1": true,
                        "parentSuite-BeforeAll2": true,
                        "child1Suite-BeforeAll": true,
                        "child1Spec1": true
                    }
                },
                {
                    "name": "child1Spec2",
                    "context": {
                        "parentSuite-BeforeAll1": true,
                        "parentSuite-BeforeAll2": true,
                        "child1Suite-BeforeAll": true,
                        "child1Spec2": true
                    }
                },
                {
                    "name": "child1Spec3",
                    "context": {
                        "parentSuite-BeforeAll1": true,
                        "parentSuite-BeforeAll2": true,
                        "child1Suite-BeforeAll": true,
                        "child1Spec3": true
                    }
                },
                {
                    "name": "parentSpec2",
                    "context": {
                        "parentSuite-BeforeAll1": true,
                        "parentSuite-BeforeAll2": true,
                        "parentSpec2": true
                    }
                },
                {
                    "name": "child2Spec1",
                    "context": {
                        "parentSuite-BeforeAll1": true,
                        "parentSuite-BeforeAll2": true,
                        "child2Spec1": true
                    }
                }
            ];

            runWithHelper('BeforeAll').then(checkList => {
                expect(JSON.stringify(checkList)).toBe(JSON.stringify([
                    ...checkData, // first file
                    ...checkData // second file
                ]));
                done();
            });

        });

        it('runPathHelpers should run beforeEach from all items of path.', function (done) {

            let checkData = [
                {
                    "name": "parentSuite-BeforeEach1",
                    "context": {
                        "parentSuite-BeforeEach1": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach2",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true
                    }
                },
                {
                    "name": "parentSpec1",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true,
                        "parentSpec1": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach1",
                    "context": {
                        "parentSuite-BeforeEach1": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach2",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true
                    }
                },
                {
                    "name": "child1Suite-BeforeEach",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true,
                        "child1Suite-BeforeEach": true
                    }
                },
                {
                    "name": "child1Spec1",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true,
                        "child1Suite-BeforeEach": true,
                        "child1Spec1": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach1",
                    "context": {
                        "parentSuite-BeforeEach1": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach2",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true
                    }
                },
                {
                    "name": "child1Suite-BeforeEach",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true,
                        "child1Suite-BeforeEach": true
                    }
                },
                {
                    "name": "child1Spec2",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true,
                        "child1Suite-BeforeEach": true,
                        "child1Spec2": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach1",
                    "context": {
                        "parentSuite-BeforeEach1": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach2",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true
                    }
                },
                {
                    "name": "child1Suite-BeforeEach",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true,
                        "child1Suite-BeforeEach": true
                    }
                },
                {
                    "name": "child1Spec3",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true,
                        "child1Suite-BeforeEach": true,
                        "child1Spec3": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach1",
                    "context": {
                        "parentSuite-BeforeEach1": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach2",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true
                    }
                },
                {
                    "name": "parentSpec2",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true,
                        "parentSpec2": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach1",
                    "context": {
                        "parentSuite-BeforeEach1": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach2",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true
                    }
                },
                {
                    "name": "child2Spec1",
                    "context": {
                        "parentSuite-BeforeEach1": true,
                        "parentSuite-BeforeEach2": true,
                        "child2Spec1": true
                    }
                }
            ];

            runWithHelper('BeforeEach').then(checkList => {
                expect(JSON.stringify(checkList)).toBe(JSON.stringify([
                    ...checkData, // first file
                    ...checkData // second file
                ]));
                done();
            });

        });

        it('runPathHelpers should run afterEach from all items of path.', function (done) {

            let checkData = [
                {
                    "name": "parentSpec1",
                    "context": {
                        "parentSpec1": true
                    }
                },
                {
                    "name": "parentSuite-AfterEach1",
                    "context": {
                        "parentSpec1": true,
                        "parentSuite-AfterEach1": true
                    }
                },
                {
                    "name": "parentSuite-AfterEach2",
                    "context": {
                        "parentSpec1": true,
                        "parentSuite-AfterEach1": true,
                        "parentSuite-AfterEach2": true
                    }
                },
                {
                    "name": "child1Spec1",
                    "context": {
                        "child1Spec1": true
                    }
                },
                {
                    "name": "parentSuite-AfterEach1",
                    "context": {
                        "child1Spec1": true,
                        "parentSuite-AfterEach1": true
                    }
                },
                {
                    "name": "parentSuite-AfterEach2",
                    "context": {
                        "child1Spec1": true,
                        "parentSuite-AfterEach1": true,
                        "parentSuite-AfterEach2": true
                    }
                },
                {
                    "name": "child1Suite-AfterEach",
                    "context": {
                        "child1Spec1": true,
                        "parentSuite-AfterEach1": true,
                        "parentSuite-AfterEach2": true,
                        "child1Suite-AfterEach": true
                    }
                },
                {
                    "name": "child1Spec2",
                    "context": {
                        "child1Spec2": true
                    }
                },
                {
                    "name": "parentSuite-AfterEach1",
                    "context": {
                        "child1Spec2": true,
                        "parentSuite-AfterEach1": true
                    }
                },
                {
                    "name": "parentSuite-AfterEach2",
                    "context": {
                        "child1Spec2": true,
                        "parentSuite-AfterEach1": true,
                        "parentSuite-AfterEach2": true
                    }
                },
                {
                    "name": "child1Suite-AfterEach",
                    "context": {
                        "child1Spec2": true,
                        "parentSuite-AfterEach1": true,
                        "parentSuite-AfterEach2": true,
                        "child1Suite-AfterEach": true
                    }
                },
                {
                    "name": "child1Spec3",
                    "context": {
                        "child1Spec3": true
                    }
                },
                {
                    "name": "parentSuite-AfterEach1",
                    "context": {
                        "child1Spec3": true,
                        "parentSuite-AfterEach1": true
                    }
                },
                {
                    "name": "parentSuite-AfterEach2",
                    "context": {
                        "child1Spec3": true,
                        "parentSuite-AfterEach1": true,
                        "parentSuite-AfterEach2": true
                    }
                },
                {
                    "name": "child1Suite-AfterEach",
                    "context": {
                        "child1Spec3": true,
                        "parentSuite-AfterEach1": true,
                        "parentSuite-AfterEach2": true,
                        "child1Suite-AfterEach": true
                    }
                },
                {
                    "name": "parentSpec2",
                    "context": {
                        "parentSpec2": true
                    }
                },
                {
                    "name": "parentSuite-AfterEach1",
                    "context": {
                        "parentSpec2": true,
                        "parentSuite-AfterEach1": true
                    }
                },
                {
                    "name": "parentSuite-AfterEach2",
                    "context": {
                        "parentSpec2": true,
                        "parentSuite-AfterEach1": true,
                        "parentSuite-AfterEach2": true
                    }
                },
                {
                    "name": "child2Spec1",
                    "context": {
                        "child2Spec1": true
                    }
                },
                {
                    "name": "parentSuite-AfterEach1",
                    "context": {
                        "child2Spec1": true,
                        "parentSuite-AfterEach1": true
                    }
                },
                {
                    "name": "parentSuite-AfterEach2",
                    "context": {
                        "child2Spec1": true,
                        "parentSuite-AfterEach1": true,
                        "parentSuite-AfterEach2": true
                    }
                }
            ];

            runWithHelper('AfterEach').then(checkList => {
                expect(JSON.stringify(checkList)).toBe(JSON.stringify([
                    ...checkData, // first file
                    ...checkData // second file
                ]));
                done();
            });

        });

        it('runPathHelpers should run afterAll from all items of path.', function (done) {

            let checkData = [
                {
                    "name": "parentSpec1",
                    "context": {
                        "parentSpec1": true
                    }
                },
                {
                    "name": "child1Spec1",
                    "context": {
                        "child1Spec1": true
                    }
                },
                {
                    "name": "child1Spec2",
                    "context": {
                        "child1Spec2": true
                    }
                },
                {
                    "name": "child1Spec3",
                    "context": {
                        "child1Spec3": true
                    }
                },
                {
                    "name": "child1Suite-AfterAll",
                    "context": {
                        "child1Suite-AfterAll": true
                    }
                },
                {
                    "name": "parentSpec2",
                    "context": {
                        "parentSpec2": true
                    }
                },
                {
                    "name": "child2Spec1",
                    "context": {
                        "child2Spec1": true
                    }
                },
                {
                    "name": "parentSuite-AfterAll1",
                    "context": {
                        "parentSuite-AfterAll1": true
                    }
                },
                {
                    "name": "parentSuite-AfterAll2",
                    "context": {
                        "parentSuite-AfterAll1": true,
                        "parentSuite-AfterAll2": true
                    }
                }
            ];

            runWithHelper('AfterAll').then(checkList => {
                expect(JSON.stringify(checkList)).toBe(JSON.stringify([
                    ...checkData, // first file
                    ...checkData // second file
                ]));
                done();
            });

        });

        it('All helpers should run from all items of path.', function (done) {

            let checkData = [
                {
                    "name": "parentSuite-BeforeAll",
                    "context": {
                        "parentSuite-BeforeAll": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true
                    }
                },
                {
                    "name": "parentSpec1",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true,
                        "parentSpec1": true
                    }
                },
                {
                    "name": "child1Suite-BeforeAll",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "child1Suite-BeforeAll": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true
                    }
                },
                {
                    "name": "child1Suite-BeforeEach",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true,
                        "child1Suite-BeforeAll": true,
                        "child1Suite-BeforeEach": true
                    }
                },
                {
                    "name": "child1Spec1",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true,
                        "child1Suite-BeforeAll": true,
                        "child1Suite-BeforeEach": true,
                        "child1Spec1": true
                    }
                },
                {
                    "name": "child1Suite-AfterEach",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true,
                        "child1Suite-BeforeAll": true,
                        "child1Suite-BeforeEach": true,
                        "child1Spec1": true,
                        "child1Suite-AfterEach": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true
                    }
                },
                {
                    "name": "child1Suite-BeforeEach",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true,
                        "child1Suite-BeforeAll": true,
                        "child1Suite-BeforeEach": true
                    }
                },
                {
                    "name": "child1Spec2",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true,
                        "child1Suite-BeforeAll": true,
                        "child1Suite-BeforeEach": true,
                        "child1Spec2": true
                    }
                },
                {
                    "name": "child1Suite-AfterEach",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true,
                        "child1Suite-BeforeAll": true,
                        "child1Suite-BeforeEach": true,
                        "child1Spec2": true,
                        "child1Suite-AfterEach": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true
                    }
                },
                {
                    "name": "child1Suite-BeforeEach",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true,
                        "child1Suite-BeforeAll": true,
                        "child1Suite-BeforeEach": true
                    }
                },
                {
                    "name": "child1Spec3",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true,
                        "child1Suite-BeforeAll": true,
                        "child1Suite-BeforeEach": true,
                        "child1Spec3": true
                    }
                },
                {
                    "name": "child1Suite-AfterEach",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true,
                        "child1Suite-BeforeAll": true,
                        "child1Suite-BeforeEach": true,
                        "child1Spec3": true,
                        "child1Suite-AfterEach": true
                    }
                },
                {
                    "name": "child1Suite-AfterAll1",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "child1Suite-BeforeAll": true,
                        "child1Suite-AfterAll1": true
                    }
                },
                {
                    "name": "child1Suite-AfterAll2",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "child1Suite-BeforeAll": true,
                        "child1Suite-AfterAll1": true,
                        "child1Suite-AfterAll2": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true
                    }
                },
                {
                    "name": "parentSpec2",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true,
                        "parentSpec2": true
                    }
                },
                {
                    "name": "parentSuite-BeforeEach",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true
                    }
                },
                {
                    "name": "child2Spec1",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-BeforeEach": true,
                        "child2Spec1": true
                    }
                },
                {
                    "name": "parentSuite-AfterAll1",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-AfterAll1": true
                    }
                },
                {
                    "name": "parentSuite-AfterAll2",
                    "context": {
                        "parentSuite-BeforeAll": true,
                        "parentSuite-AfterAll1": true,
                        "parentSuite-AfterAll2": true
                    }
                }
            ];

            let checkList = [];
            let [
                parentSuite, child1Suite
            ] = makeComposition(checkList);
            addHelper([
                [parentSuite],
                [child1Suite]
            ], checkList, 'BeforeAll');
            addHelper([
                [parentSuite],
                [child1Suite]
            ], checkList, 'BeforeEach');
            addHelper([
                [child1Suite]
            ], checkList, 'AfterEach');
            addHelper([
                [parentSuite, 1],
                [parentSuite, 2],
                [child1Suite, 1],
                [child1Suite, 2]
            ], checkList, 'AfterAll');
            class BuilderStrategy {
                test() { return true; }
                build() { return parentSuite; }
            }
            let buildStrategyInstance = new BuilderStrategy();
            let runnerInstance = new Runner({
                specs: 'tests/mocks/scan-dir/**/*.txt'
            });
            runnerInstance.addBuilderStrategy(buildStrategyInstance);
            runnerInstance.scan().then(() => runnerInstance.run().then(() => {
                expect(JSON.stringify(checkList)).toBe(JSON.stringify([
                    ...checkData, // first file
                    ...checkData // second file
                ]));
                done();
            }));

        });

    });

});
