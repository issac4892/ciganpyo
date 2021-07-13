#! /bin/bash
if [ "$TRAVIS_OS_NAME" == osx ]; then
    # deploy on mac
    yarn release
else
    # deploy on windows and linux
    docker run --rm -e GH_TOKEN -v "${PWD}":/project -v ~/.cache/electron:/root/.cache/electron -v ~/.cache/electron-builder:/root/.cache/electron-builder electronuserland/builder:wine /bin/bash -c "git config --global user.email "issac4892@gmail.com" && git config --global user.name "issac4892" && npm version patch && git add package.json && git commit -m "Patch [ci skip]" && git push origin master&& yarn install && yarn deploy"
fi