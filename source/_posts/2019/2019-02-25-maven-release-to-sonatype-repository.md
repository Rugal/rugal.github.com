---
layout: post
title: "Maven Release To Sonatype Repository"
description: ""
category:  development
tags: [maven, java]
date: 2019-02-25
---

# nexus staging plugin

`nexus-staging-maven-plugin` is a plugin just for nexus related repositories.   
In order to release into maven central repository, you need to pass all checks that acquired by central repository.  
Here, I will show you how to release an artifact by using `nexus-staging` plugin.  

```bash
# this will deploy to staging repository
mvn deploy # in return, it will get a stagingRepositoryId

# this will display all the release candidate, usually the last one will be yours
# copy the staging repository id
mvn nexus-staging:rc-list

# use this command to close the release candidate
# while closing, repository will impose many checks
# only if you pass all the tests can you run into next phase
mvn nexus-staging:rc-close -DstagingRepositoryId=YOUR_STAGING_REPOSITORY_ID

# use this command to actually release the release candidate if you pass all the checks
# once it's done, the staging repository will be closed
mvn nexus-staging:release -DstagingRepositoryId=YOUR_STAGING_REPOSITORY_ID
```

# maven release plugin
Another way to do release is by using `maven-release-plugin`.  
Release plugin will automatically flip the artifact version for you, and push the changes to your scm.  
This procedure is totally automatic.  That's how we don't need to manually open the `pom.xml` to change the version.  

```bash
# we start from a SNAPSHOT version, and deploy it to snapshot repository
mvn clean deploy

# then we prepare to do release
# this will remove the SNAPSHOT and update git tag for you before automatically commiting those change
# then it will automatically upgrade to the next SNAPSHOT version before commitng the change again
# now your scm should have 2 more commits in theory
mvn release:prepare

# by doing this, release plugin will deploy the formal version(the one without SNAPSHOT) into release repository directly
# without having to manually checkout the old version and do the manual deploy
mvn release:perform
```

# summary

So usually, if a repository doesn't require many checks like maven central repository, you just need to use `release` plugin for simplicity.  
But for maven central repository, you need to go through their requirement, which makes a lot of senses.  
