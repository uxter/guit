import expect from 'expect';
import Runner from '../../src/core/runner';
import Suite from '../../src/core/suite';
import Spec from '../../src/core/spec';

describe('core/runner runPathHelpers specs:', function () {

    it('runPathHelpers should run beforeAll from all items of path.', function (done) {

        let checkList = [];
        let parentSuite = new Suite('parentSuite');
        let child1Suite = new Suite('child1Suite');
        let child2Suite = new Suite('child2Suite');
        let parentSpec2 = new Spec('parentSpec2', function () {
            this.spec = 'parentSpec2';
            checkList.push(this);
        });
        let child1Spec1 = new Spec('child1Spec1', function () {
            this.spec = 'child1Spec1';
            checkList.push(this);
        });
        let parentSpec1 = new Spec('parentSpec1', function () {
            this.spec = 'parentSpec1';
            checkList.push(this);
        });
        let child1Spec2 = new Spec('child1Spec2', function () {
            this.spec = 'child1Spec2';
            checkList.push(this);
        });
        let child1Spec3 = new Spec('child1Spec3', function () {
            this.spec = 'child1Spec3';
            checkList.push(this);
        });
        let child2Spec1 = new Spec('child2Spec1', function () {
            this.spec = 'child2Spec1';
            checkList.push(this);
        });
        parentSuite.addChild(parentSpec1);
        parentSuite.addChild(child1Suite);
        parentSuite.addChild(parentSpec2);
        parentSuite.addChild(child2Suite);
        child1Suite.addChild(child1Spec1);
        child1Suite.addChild(child1Spec2);
        child1Suite.addChild(child1Spec3);
        child2Suite.addChild(child2Spec1);
        parentSuite.addBeforeAllHelper(function () {
            this['parentSuite-beforeAll1'] = true;
        });
        parentSuite.addBeforeAllHelper(function () {
            this['parentSuite-beforeAll2'] = true;
        });
        child1Suite.addBeforeAllHelper(function () {
            this['child1Suite-beforeAll'] = true;
        });
        class BuilderStrategy {
            test() {
                return true;
            }

            build() {
                return parentSuite;
            }
        }
        let buildStrategyInstance = new BuilderStrategy();
        let runnerInstance = new Runner({
            specs: 'tests/mocks/scan-dir/**/*.txt'
        });
        runnerInstance.addBuilderStrategy(buildStrategyInstance);
        runnerInstance.scan().then(() => {
            runnerInstance.run().then(() => {
                expect(JSON.stringify(checkList)).toBe(JSON.stringify([
                    // first file
                    {
                        "parentSuite-beforeAll1": true,
                        "parentSuite-beforeAll2": true,
                        "spec": "parentSpec1"
                    },
                    {
                        "parentSuite-beforeAll1": true,
                        "parentSuite-beforeAll2": true,
                        "child1Suite-beforeAll": true,
                        "spec": "child1Spec1"
                    },
                    {
                        "parentSuite-beforeAll1": true,
                        "parentSuite-beforeAll2": true,
                        "child1Suite-beforeAll": true,
                        "spec": "child1Spec2"
                    },
                    {
                        "parentSuite-beforeAll1": true,
                        "parentSuite-beforeAll2": true,
                        "child1Suite-beforeAll": true,
                        "spec": "child1Spec3"
                    },
                    {
                        "parentSuite-beforeAll1": true,
                        "parentSuite-beforeAll2": true,
                        "spec": "parentSpec2"
                    },
                    {
                        "parentSuite-beforeAll1": true,
                        "parentSuite-beforeAll2": true,
                        "spec": "child2Spec1"
                    },
                    // second file
                    {
                        "parentSuite-beforeAll1": true,
                        "parentSuite-beforeAll2": true,
                        "spec": "parentSpec1"
                    },
                    {
                        "parentSuite-beforeAll1": true,
                        "parentSuite-beforeAll2": true,
                        "child1Suite-beforeAll": true,
                        "spec": "child1Spec1"
                    },
                    {
                        "parentSuite-beforeAll1": true,
                        "parentSuite-beforeAll2": true,
                        "child1Suite-beforeAll": true,
                        "spec": "child1Spec2"
                    },
                    {
                        "parentSuite-beforeAll1": true,
                        "parentSuite-beforeAll2": true,
                        "child1Suite-beforeAll": true,
                        "spec": "child1Spec3"
                    },
                    {
                        "parentSuite-beforeAll1": true,
                        "parentSuite-beforeAll2": true,
                        "spec": "parentSpec2"
                    },
                    {
                        "parentSuite-beforeAll1": true,
                        "parentSuite-beforeAll2": true,
                        "spec": "child2Spec1"
                    }
                ]));
                done();
            });
        });

    });

    it('runPathHelpers should run beforeEach from all items of path.', function (done) {

        let checkList = [];
        let parentSuite = new Suite('parentSuite');
        let child1Suite = new Suite('child1Suite');
        let child2Suite = new Suite('child2Suite');
        let parentSpec2 = new Spec('parentSpec2', function () {
            this.spec = 'parentSpec2';
            checkList.push(this);
        });
        let child1Spec1 = new Spec('child1Spec1', function () {
            this.spec = 'child1Spec1';
            checkList.push(this);
        });
        let parentSpec1 = new Spec('parentSpec1', function () {
            this.spec = 'parentSpec1';
            checkList.push(this);
        });
        let child1Spec2 = new Spec('child1Spec2', function () {
            this.spec = 'child1Spec2';
            checkList.push(this);
        });
        let child1Spec3 = new Spec('child1Spec3', function () {
            this.spec = 'child1Spec3';
            checkList.push(this);
        });
        let child2Spec1 = new Spec('child2Spec1', function () {
            this.spec = 'child2Spec1';
            checkList.push(this);
        });
        parentSuite.addChild(parentSpec1);
        parentSuite.addChild(child1Suite);
        parentSuite.addChild(parentSpec2);
        parentSuite.addChild(child2Suite);
        child1Suite.addChild(child1Spec1);
        child1Suite.addChild(child1Spec2);
        child1Suite.addChild(child1Spec3);
        child2Suite.addChild(child2Spec1);
        parentSuite.addBeforeEachHelper(function () {
            this['parentSuite-beforeEach1'] = true;
        });
        parentSuite.addBeforeEachHelper(function () {
            this['parentSuite-beforeEach2'] = true;
        });
        child1Suite.addBeforeEachHelper(function () {
            this['child1Suite-beforeEach'] = true;
        });
        class BuilderStrategy {
            test() {
                return true;
            }

            build() {
                return parentSuite;
            }
        }
        let buildStrategyInstance = new BuilderStrategy();
        let runnerInstance = new Runner({
            specs: 'tests/mocks/scan-dir/**/*.txt'
        });
        runnerInstance.addBuilderStrategy(buildStrategyInstance);
        runnerInstance.scan().then(() => {
            runnerInstance.run().then(() => {
                expect(JSON.stringify(checkList)).toBe(JSON.stringify([
                    // first file
                    {
                        'parentSuite-beforeEach1': true,
                        'parentSuite-beforeEach2': true,
                        spec: 'parentSpec1'
                    },
                    {
                        'parentSuite-beforeEach1': true,
                        'parentSuite-beforeEach2': true,
                        'child1Suite-beforeEach': true,
                        spec: 'child1Spec1'
                    },
                    {
                        'parentSuite-beforeEach1': true,
                        'parentSuite-beforeEach2': true,
                        'child1Suite-beforeEach': true,
                        spec: 'child1Spec2'
                    },
                    {
                        'parentSuite-beforeEach1': true,
                        'parentSuite-beforeEach2': true,
                        'child1Suite-beforeEach': true,
                        spec: 'child1Spec3'
                    },
                    {
                        'parentSuite-beforeEach1': true,
                        'parentSuite-beforeEach2': true,
                        spec: 'parentSpec2'
                    },
                    {
                        'parentSuite-beforeEach1': true,
                        'parentSuite-beforeEach2': true,
                        spec: 'child2Spec1'
                    },
                    // second file
                    {
                        'parentSuite-beforeEach1': true,
                        'parentSuite-beforeEach2': true,
                        spec: 'parentSpec1'
                    },
                    {
                        'parentSuite-beforeEach1': true,
                        'parentSuite-beforeEach2': true,
                        'child1Suite-beforeEach': true,
                        spec: 'child1Spec1'
                    },
                    {
                        'parentSuite-beforeEach1': true,
                        'parentSuite-beforeEach2': true,
                        'child1Suite-beforeEach': true,
                        spec: 'child1Spec2'
                    },
                    {
                        'parentSuite-beforeEach1': true,
                        'parentSuite-beforeEach2': true,
                        'child1Suite-beforeEach': true,
                        spec: 'child1Spec3'
                    },
                    {
                        'parentSuite-beforeEach1': true,
                        'parentSuite-beforeEach2': true,
                        spec: 'parentSpec2'
                    },
                    {
                        'parentSuite-beforeEach1': true,
                        'parentSuite-beforeEach2': true,
                        spec: 'child2Spec1'
                    }
                ]));
                done();
            });
        });

    });

    it('runPathHelpers should run afterEach from all items of path.', function (done) {

        let checkList = [];
        let parentSuite = new Suite('parentSuite');
        let child1Suite = new Suite('child1Suite');
        let child2Suite = new Suite('child2Suite');
        let parentSpec2 = new Spec('parentSpec2', function () {
            this.spec = 'parentSpec2';
            checkList.push(this);
        });
        let child1Spec1 = new Spec('child1Spec1', function () {
            this.spec = 'child1Spec1';
            checkList.push(this);
        });
        let parentSpec1 = new Spec('parentSpec1', function () {
            this.spec = 'parentSpec1';
            checkList.push(this);
        });
        let child1Spec2 = new Spec('child1Spec2', function () {
            this.spec = 'child1Spec2';
            checkList.push(this);
        });
        let child1Spec3 = new Spec('child1Spec3', function () {
            this.spec = 'child1Spec3';
            checkList.push(this);
        });
        let child2Spec1 = new Spec('child2Spec1', function () {
            this.spec = 'child2Spec1';
            checkList.push(this);
        });
        parentSuite.addChild(parentSpec1);
        parentSuite.addChild(child1Suite);
        parentSuite.addChild(parentSpec2);
        parentSuite.addChild(child2Suite);
        child1Suite.addChild(child1Spec1);
        child1Suite.addChild(child1Spec2);
        child1Suite.addChild(child1Spec3);
        child2Suite.addChild(child2Spec1);
        parentSuite.addAfterEachHelper(function () {
            this['parentSuite-afterEach1'] = true;
        });
        parentSuite.addAfterEachHelper(function () {
            this['parentSuite-afterEach2'] = true;
        });
        child1Suite.addAfterEachHelper(function () {
            this['child1Suite-afterEach'] = true;
        });
        class BuilderStrategy {
            test() {
                return true;
            }

            build() {
                return parentSuite;
            }
        }
        let buildStrategyInstance = new BuilderStrategy();
        let runnerInstance = new Runner({
            specs: 'tests/mocks/scan-dir/**/*.txt'
        });
        runnerInstance.addBuilderStrategy(buildStrategyInstance);
        runnerInstance.scan().then(() => {
            runnerInstance.run().then(() => {
                expect(JSON.stringify(checkList)).toBe(JSON.stringify([
                    {
                        spec: 'parentSpec1',
                        'parentSuite-afterEach1': true,
                        'parentSuite-afterEach2': true
                    },
                    {
                        spec: 'child1Spec1',
                        'child1Suite-afterEach': true,
                        'parentSuite-afterEach1': true,
                        'parentSuite-afterEach2': true
                    },
                    {
                        spec: 'child1Spec2',
                        'child1Suite-afterEach': true,
                        'parentSuite-afterEach1': true,
                        'parentSuite-afterEach2': true
                    },
                    {
                        spec: 'child1Spec3',
                        'child1Suite-afterEach': true,
                        'parentSuite-afterEach1': true,
                        'parentSuite-afterEach2': true
                    },
                    {
                        spec: 'parentSpec2',
                        'parentSuite-afterEach1': true,
                        'parentSuite-afterEach2': true
                    },
                    {
                        spec: 'child2Spec1',
                        'parentSuite-afterEach1': true,
                        'parentSuite-afterEach2': true
                    },
                    {
                        spec: 'parentSpec1',
                        'parentSuite-afterEach1': true,
                        'parentSuite-afterEach2': true
                    },
                    {
                        spec: 'child1Spec1',
                        'child1Suite-afterEach': true,
                        'parentSuite-afterEach1': true,
                        'parentSuite-afterEach2': true
                    },
                    {
                        spec: 'child1Spec2',
                        'child1Suite-afterEach': true,
                        'parentSuite-afterEach1': true,
                        'parentSuite-afterEach2': true
                    },
                    {
                        spec: 'child1Spec3',
                        'child1Suite-afterEach': true,
                        'parentSuite-afterEach1': true,
                        'parentSuite-afterEach2': true
                    },
                    {
                        spec: 'parentSpec2',
                        'parentSuite-afterEach1': true,
                        'parentSuite-afterEach2': true
                    },
                    {
                        spec: 'child2Spec1',
                        'parentSuite-afterEach1': true,
                        'parentSuite-afterEach2': true
                    }
                ]));
                done();
            });
        });

    });

    it('runPathHelpers should run afterAll from all items of path.', function (done) {

        let checkList = [];
        let parentSuite = new Suite('parentSuite');
        let child1Suite = new Suite('child1Suite');
        let child2Suite = new Suite('child2Suite');
        let parentSpec2 = new Spec('parentSpec2', function () {
            this.spec = 'parentSpec2';
            checkList.push(this);
        });
        let child1Spec1 = new Spec('child1Spec1', function () {
            this.spec = 'child1Spec1';
            checkList.push(this);
        });
        let parentSpec1 = new Spec('parentSpec1', function () {
            this.spec = 'parentSpec1';
            checkList.push(this);
        });
        let child1Spec2 = new Spec('child1Spec2', function () {
            this.spec = 'child1Spec2';
            checkList.push(this);
        });
        let child1Spec3 = new Spec('child1Spec3', function () {
            this.spec = 'child1Spec3';
            checkList.push(this);
        });
        let child2Spec1 = new Spec('child2Spec1', function () {
            this.spec = 'child2Spec1';
            checkList.push(this);
        });
        parentSuite.addChild(parentSpec1);
        parentSuite.addChild(child1Suite);
        parentSuite.addChild(parentSpec2);
        parentSuite.addChild(child2Suite);
        child1Suite.addChild(child1Spec1);
        child1Suite.addChild(child1Spec2);
        child1Suite.addChild(child1Spec3);
        child2Suite.addChild(child2Spec1);
        parentSuite.addAfterAllHelper(function () {
            this['parentSuite-afterAll1'] = true;
        });
        parentSuite.addAfterAllHelper(function () {
            this['parentSuite-afterAll2'] = true;
        });
        child1Suite.addAfterAllHelper(function () {
            this['child1Suite-afterAll'] = true;
        });
        class BuilderStrategy {
            test() {
                return true;
            }

            build() {
                return parentSuite;
            }
        }
        let buildStrategyInstance = new BuilderStrategy();
        let runnerInstance = new Runner({
            specs: 'tests/mocks/scan-dir/**/*.txt'
        });
        runnerInstance.addBuilderStrategy(buildStrategyInstance);
        runnerInstance.scan().then(() => {
            runnerInstance.run().then(() => {
                console.log(JSON.stringify(checkList, null, 4));
                // expect(JSON.stringify(checkList)).toBe(JSON.stringify([
                // ]));
                done();
            });
        });

    });

});
