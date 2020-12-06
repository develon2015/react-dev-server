const { resolveModule } = require('../resolve-module');

function testResolveModule(name) {
    console.log(name, ' => ', resolveModule(name));
}

testResolveModule('@babel/core');
testResolveModule('express');
testResolveModule('typescript');
