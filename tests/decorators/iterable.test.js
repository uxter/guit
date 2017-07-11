import expect from 'expect';
import iterable from '../../src/decorators/iterable';

describe('decorators/iterable specs:', function () {

    describe('exceptions specs:', function () {

        it('iterable should throw an exception if a first argument is not a string.', function () {

            expect(function () {
                iterable(true);
            }).toThrow('A first argument must be a string.');

        });

        it('iterableDecorate should throw an exception if a first argument is not a function.', function () {

            expect(function () {
                iterable('list')(true);
            }).toThrow('A first argument must be a function.');

        });

        it('should throw an exception if a property is not specified.', function () {

            @iterable('list')
            class SomeClass {}
            let someInstance = new SomeClass();
            expect(function () {
                for (let item of someInstance) {}
            }).toThrow('Property list is not specified.');

        });

    });

    describe('working specs:', function () {

        it('should iterate', function () {

            let list = [1,2,3];
            @iterable('list')
            class SomeClass {
                constructor() {
                    this.list = list;
                }
            }
            let someInstance = new SomeClass();
            let i = 0;
            for (let item of someInstance) {
                expect(item).toBe(list[i]);
                i++;
            }

        });

    });

});
