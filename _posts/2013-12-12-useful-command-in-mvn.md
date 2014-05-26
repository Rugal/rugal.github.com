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
{%endhighlight%}
