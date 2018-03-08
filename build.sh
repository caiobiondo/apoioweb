#!/bin/bash

if [ -z "${1}" ] ; then
  build_target="build:prod"
else
  build_target="build:${1}"
fi

rm -rf build

cp natura-ui-key /tmp/natura-ui-key
cp ssh_config /etc/ssh/ssh_config
chmod 400 /tmp/natura-ui-key

npm install

export COVERALLS_REPO_TOKEN=4I6sqkL2LkdopzjyPYqQEaNgZdrWnfOnM

npm run coverage
npm run coverage:upload

npm run ${build_target}

chmod 777 build -R
