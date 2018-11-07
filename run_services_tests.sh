#!/bin/bash

set -e

function cd_and_npm_test() {
    cd "./microservices/$1"
    npm test
    cd -
}

SERVICES=$(ls -A ./microservices | xargs)

for s in $SERVICES;
    do cd_and_npm_test $s;
done;
