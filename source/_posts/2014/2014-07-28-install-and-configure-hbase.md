---
layout: post
title: "install and configure hbase"
description: ""
category: development
tags: [hadoop]
date: 2014-07-28
---

# premise
I already installed hadoop 2.4.0 with yarn, with hadoop configuration in `core-site.xml`  
```xml
<configuration>
    <property>
        <name>fs.default.name</name>
        <value>hdfs://localhost:9000</value>
    </property>
</configuration>
```

# download

[hbase](http://www.apache.org/dyn/closer.cgi/hbase/)  

# install

Move to installation path
```shell
tar -zxf hbase-0.98.4-hadoop2-bin.tar.gz
sudo mv hbase-0.98.4-hadoop2-bin  /usr/local/hbase
cd /usr/local/hbase
```


Set runtime environment
```shell
export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64
export HADOOP_INSTALL=/usr/local/hadoop
export HADOOP_MAPRED_HOME=$HADOOP_INSTALL
export HADOOP_COMMON_HOME=$HADOOP_INSTALL
export HADOOP_HDFS_HOME=$HADOOP_INSTALL
export YARN_HOME=$HADOOP_INSTALL
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_INSTALL/lib/native
export HADOOP_OPTS="-Djava.library.path=$HADOOP_INSTALL/lib"
export PATH=$PATH:$HADOOP_INSTALL/bin:$HADOOP_INSTALL/sbin

export HBASE_HOME=/usr/local/hbase
export PATH=$HBASE_HOME/bin:$PATH
```

# configure
My goal is to setup a pseudo distributed type with only one node but connected with HDFS.  
So I need to fill with HDFS port and path to connect with HDFS.  
In `conf/hbase-site.xml`


```xml
<configuration>
    <property>
        <name>hbase.zookeeper.property.dataDir</name>
        <value>/opt/zookeeper</value>
    </property>
    <property>
        <name>hbase.cluster.distributed</name>
        <value>true</value>
    </property>
    <property>
        <name>hbase.rootdir</name>
        <value>hdfs://localhost:9000/user/hbase</value>
    </property>
</configuration>
```

HBase use `ZooKeeper` to manage cluster and resouce state, you need to specify the `ZK` temporary file to store voting status. Here my zookeeper path is `/opt/zookeeper`  
As you can see that my hbase path in `HDFS` is `/user/hbase`, hence we need to create and grant write privilege on this path for hbase.  


```shell
hadoop fs -mkdir /user/zookeeper
hadoop fs -chmod 775  /user/zookeeper
```

Now our simplest single node distributed hbase completed.

# start
Of course you need HDFS started, which I skip here.  


    start-hbase.sh

If everything runs smoothly, this will command with only output few lines, but you could find log file in your `$HBASE_HOME/logs`

    [master:localhost:60000] master.HMaster: Master has completed initialization

Log above means the success of startup of HBase, cong!


# basic usage

Now just use few command to get in touch with hbase.  
Since hbase is column oriented nosql database, you have to adjust to its column family style of organization of data.  

    hbase shell

Now you are able to enter hbase shell, let us rock.  

```
create 'test', 'cf'  --create table named test under default namespace, and column family named cf

list 'test'  -- show available table

put 'test','r','cf:1','v'  --Insert one record into table
--Note the first parameter is of course table name
--The next one is just the primary key
--The third one is column family key, which is to specify which column family this column belong to, as you declared in table definition that this column is start with cf
--You must put name that is start with what column definition is, here is cf:  
--Then the last one is the value of this row 

scan 'test' --scan whole table right away

get 'test', 'r'  --get row data of a table

--To drop a table, you need to do like this
disable 'test'
enable 'test'
```

Press `CTRL+C` for exit hbase shell.  



execute command below to stop hbase server, this will automatically stop zookeeper either.

    stop-hbase.sh
