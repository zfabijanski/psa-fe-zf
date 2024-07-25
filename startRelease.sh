#!/bin/bash
destructive_prompt () {
    if [ -z "$1" ]
    then
        message="Destructive action."
    else
        message=$1
    fi

    read -p "$message Continue anyway? (y/n): " -n 1 -r
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        echo
        echo Continuing
    else
        echo
        echo Aborting
        exit 1
    fi
}

# Additional warning (in case of unintentional script execution)
destructive_prompt "WARNING! Proceeding will start new release and trigger CI/CD pipeline."

# Synchronize tags
git fetch --tags
if [ "$?" -ne 0 ]
then
    destructive_prompt "Failed to fetch tags. This can cause versioning conflict."
fi

# Clean working directory if necessary
if output=$(git status --porcelain) && [ -z "$output" ]
then 
    echo Working directory clean
else 
    destructive_prompt "Uncommitted changes detected. Proceeding will add them automatically."
fi

change_branch () {
    git checkout $1
    if [ "$?" -ne 0 ]
    then
        echo Cannot checkout $1 \(aborting\)
        exit 1
    fi

    git pull
    if [ "$?" -ne 0 ]
    then
        echo Error during pull. Aborting.
        exit 1
    fi

    major=`yarn --silent echo-version | cut -d . -f 1`
    minor=`yarn --silent echo-version | cut -d . -f 2`
    echo Switched to $1 \($major.$minor.*\)
}

create_branch () {
    if [ -z "$1" ]
    then
        echo Cannot create branch without name. Aborting.
        exit 1
    fi

    git checkout -b $1
    echo Created $1   
}

release () {
    change_branch develop
    create_branch release/$major
    git push --set-upstream origin release/$major
    change_branch develop
    yarn version --major
    git push --follow-tags
}

hotfix_release () {
    change_branch master
    create_branch hotfix_release/$major.$(($minor + 1))
    yarn version --minor
    git push --follow-tags
}

read -p "Starting release. Choose release type: release (r) / hotfix release (h): " -n 1 -r
if [[ $REPLY =~ ^[Rr]$ ]]
then
    echo
    echo "Starting release"
    release
else
    if [[ $REPLY =~ ^[Hh]$ ]]
    then
        echo
        echo "Starting hotfix release"
        hotfix_release
    else
        echo
        echo "Unknown release type"
    fi
fi
