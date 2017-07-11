import expect from 'expect';
import traversable from '../../src/decorators/traversable';
import Collection from '../../src/core/collection';
import Composite from '../../src/core/composite';

describe('decorators/traversable specs:', function () {

    describe('exceptions specs:', function () {

        it('traversableDecorate should throw an exception if a first argument is not a function.', function () {

            expect(function () {
                traversable('children')(true);
            }).toThrow('A first argument must be a function.');

        });

        it('should reject if a property is not specified.', function (done) {

            @traversable('children')
            class SomeClass {}
            let someInstance = new SomeClass();
            someInstance.traverse().catch(err => {
                expect(err.message).toBe('Property children must be an instance of Collection.');
                done();
            });

        });

        it('should reject if a property is not an instance of Collection.', function (done) {

            @traversable('children')
            class SomeClass {
                constructor() {
                    this.children = new Collection(SomeClass);
                }
            }
            let someInstance = new SomeClass();
            someInstance.traverse(true).catch(err => {
                expect(err.message).toBe('A first argument must be a function.');
                done();
            });

        });

    });

    describe('working specs:', function () {

        it('should traverse of a composition.', function (done) {

            class SomeClass extends Composite {
                constructor(data) {
                    super();
                    this.data = data;
                }
            }
            let rootInstance = new SomeClass('root');
            let level20Instance = new SomeClass('level2-0');
            let level21Instance = new SomeClass('level2-1');
            let level22Instance = new SomeClass('level2-2');
            let level210Instance = new SomeClass('level2-1-0');
            rootInstance.addChild(level20Instance);
            rootInstance.addChild(level21Instance);
            rootInstance.addChild(level22Instance);
            level21Instance.addChild(level210Instance);

            let list = [];
            async function execute(instance) {
                await new Promise((resolve) => {
                    list.push(instance.data);
                    setTimeout(resolve, 2);
                });
            }
            rootInstance.traverse(execute).then(() => {
                expect(list).toEqual([
                    'root',
                    'level2-0',
                    'level2-1',
                    'level2-1-0',
                    'level2-2'
                ]);
                done();
            });

        });

    });

});
