import root from './root';
import Suite from './suite';
import Spec from './spec';

async function beforeSuite(suite) {
    for (let i = 0; i < suite.beforeAllList.length; i++) {
        await suite.beforeAllList[i].call(suite.context);
    }
}

async function afterSuite(suite) {
    for (let i = 0; i < suite.afterAllList.length; i++) {
        await suite.afterAllList[i].call(suite.context);
    }
}

async function runSuite(suite) {
    suite.context = suite.parent ? suite.parent.context : {};
    await beforeSuite(suite);
    await eachItems(suite.items);
    await afterSuite(suite);
}

async function beforeSpec(spec) {
    for (let i = 0; i < spec.suite.path.length; i++) {
        let suite = spec.suite.path[i];
        for (let j = 0; j < suite.beforeEachList.length; j++) {
            await suite.beforeEachList[j].call(spec.suite.context);
        }
    }
}

async function afterSpec(spec) {
    for (let i = spec.suite.path.length - 1; i >= 0; i--) {
        let suite = spec.suite.path[i];
        for (let j = 0; j < suite.afterEachList.length; j++) {
            await suite.afterEachList[j].call(spec.suite.context);
        }
    }
}

async function runSpec(spec) {
    await beforeSpec(spec);
    await spec.fn.call(spec.suite.context);
    await afterSpec(spec);
}

async function eachItems(items) {
    for (let i = 0; i < items.length; i++) {
        if (items[i] instanceof Suite) {
            await runSuite(items[i]);
        }
        if (items[i] instanceof Spec) {
            await runSpec(items[i]);
        }
    }
}

export async function runSpecs() {
    return await eachItems(root.items);
}
