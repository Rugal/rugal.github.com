---
layout: post
title: "useful command in mvn"
description: ""
category: operation
tags: [maven]
---
{% include JB/setup %}
As as great project management tool, I deeply love `mvn` and treat it as my central tool of Java development  
I configure mvn Integrated with eclim and vim, makes java programming in command line easy and cool!  
{%highlight sh%}
#generate JavaSE project
mvn archetype:create -DgroupId=rugal.maven  -DartifactId=Maven

#generate java web application project
mvn archetype:generate -DarchetypeArtifactId=maven-archetype-webapp \
    -DgroupId={package-name/domain-name} \
    -DartifactId={project-name}  -DinteractiveMode=false

#execute single class by specifying
mvn clean  compile   exec:java -Dexec.mainClass="rugal.test.ShowKeyspaces" -Dexec.args="arg0 arg1 arg2"

#generate eclipse project profiles
mvn eclipse:eclipse

#execute single JUnit test file
mvn -Dtest=testname test


#show dependency tree
mvn dependency:tree -Dverbose


#skip test
mvn -Dmaven.test.skip=true

#use nexus plugin to deploy artifact
#will release if set true for auto release
maven clean deploy
#manual release if set false for auto release
mvn nexus-staging:release
#drop staging artifact
mvn nexus-staging:drop


#release artifact by maven replease plugin
#this plugin will automatically tag on SCM
#Thus is powerful to do automation deployment between SCM and maven repo
#first prepare it with SNAPSHOT version
mvn release:clean release:prepare
#perform release after this
mvn release:perform

{%endhighlight%}
