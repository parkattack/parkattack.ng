#!/bin/bash

git clone "https://${GH_TOKEN}@${GH_REF}" pages_repo
rm -rf pages_repo/*
cp -r dist/* pages_repo/
echo parkattack.co.uk> pages_repo/CNAME
git --git-dir=./pages_repo/.git --work-tree=./pages_repo config user.name "${GIT_NAME}"
git --git-dir=./pages_repo/.git --work-tree=./pages_repo config user.email "${GIT_EMAIL}"
git --git-dir=./pages_repo/.git --work-tree=./pages_repo add . -A
if ! git --git-dir=./pages_repo/.git --work-tree=./pages_repo diff-index --quiet HEAD --; then
  git --git-dir=./pages_repo/.git --work-tree=./pages_repo commit -m "Travis CI publish ${TRAVIS_JOB_NUMBER} of https://github.com/${TRAVIS_REPO_SLUG}/commit/${TRAVIS_COMMIT}"
  git --git-dir=./pages_repo/.git --work-tree=./pages_repo push --quiet "https://${GH_TOKEN}@${GH_REF}" master:${GH_PAGES_BRANCH} > /dev/null 2>&1
fi
