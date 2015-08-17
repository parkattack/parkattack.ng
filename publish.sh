#!/bin/bash

wd=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
git clone "https://${GH_TOKEN}@${GH_REF}" $wd/pages_repo
rm -rf $wd/pages_repo/*
cp -r $wd/dist/* $wd/pages_repo/
if [[ -n "$GH_PAGES_CNAME" ]]; then
  echo $GH_PAGES_CNAME> $wd/pages_repo/CNAME
fi
if [[ `git --git-dir=$wd/pages_repo/.git --work-tree=$wd/pages_repo status --porcelain` ]]; then
  git --git-dir=$wd/pages_repo/.git --work-tree=$wd/pages_repo config user.name "${GIT_NAME}"
  git --git-dir=$wd/pages_repo/.git --work-tree=$wd/pages_repo config user.email "${GIT_EMAIL}"
  git --git-dir=$wd/pages_repo/.git --work-tree=$wd/pages_repo add . -A
  git --git-dir=$wd/pages_repo/.git --work-tree=$wd/pages_repo commit -m "Travis CI publish ${TRAVIS_JOB_NUMBER} of https://github.com/${TRAVIS_REPO_SLUG}/commit/${TRAVIS_COMMIT}"
  git --git-dir=$wd/pages_repo/.git --work-tree=$wd/pages_repo push --quiet "https://${GH_TOKEN}@${GH_REF}" master:${GH_PAGES_BRANCH} > /dev/null 2>&1
fi
