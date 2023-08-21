---
layout: post
title: "spark over YARN"
description: ""
category: operation
tags: [hadoop]
date: 2015-04-14
---
I don't know why a lot of people start using `Spark`, but it is very easy to integrate it with `YARN`.  

1. Deploy you `Yarn` and `HDFS` as usual, let's say configuration folder is at `$HADOOP_HOME/conf` where `core_site.xml` and other files could be found.  
2. Unzip you `Spark` binary file and set the `$HADOOP_CONF_DIR` variables correctly in `conf/spark-env.sh`.  

        export HADOOP_HOME=/path/to/hadoop  
        export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop

3. Yeah, configuration completed, easy isn't it?
4. Test, use command and example jar file in spark

        ./bin/spark-submit --class org.apache.spark.examples.SparkPi \
            --master yarn-cluster \
            --num-executors 3 \
            --driver-memory 4g \
            --executor-memory 2g \
            --executor-cores 1 \
            lib/spark-examples*.jar \
            10

It is really nice and easy!
