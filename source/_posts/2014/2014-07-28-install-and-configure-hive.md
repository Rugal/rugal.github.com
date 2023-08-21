---
layout: post
title: "install and configure hive"
description: ""
category: development
tags: [hadoop]
date: 2014-07-28
---
Personally, the configuration procedure of Hive is much easier than Hbase.  

# download
[hive](http://www.apache.org/dyn/closer.cgi/hive/)  

# install
Move to installation folder, copy configuration files  
```shell
tar -zxf apache-hive-0.13.1-bin.tar.gz
mv apache-hive-0.13.1 /usr/local/hive
cd /usr/local/hive/conf
cp hive-default.xml.template hive-site.xml
cp hive-log4j.properties.template hive-log4j.properties
```

update env var:  
```shell
export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64
export HADOOP_INSTALL=/usr/local/hadoop
export PATH=$PATH:$HADOOP_INSTALL/bin:$HADOOP_INSTALL/sbin
export HADOOP_MAPRED_HOME=$HADOOP_INSTALL
export HADOOP_COMMON_HOME=$HADOOP_INSTALL
export HADOOP_HDFS_HOME=$HADOOP_INSTALL
export YARN_HOME=$HADOOP_INSTALL
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_INSTALL/lib/native
export HADOOP_OPTS="-Djava.library.path=$HADOOP_INSTALL/lib"

export HIVE_HOME=/usr/local/hive
export PATH=$HIVE_HOME/bin:$PATH
```


# configure
Actually this configuration comprise of two parts, first one is call `metastore`, in which the data structure and definition stored.  
Another is the so called data stored in HDFS.  

Hive treat `metastore` into RDBMS, here I want to use `postgresql`.  

setup hive to store metadata into `postgresql`, edit `$HIVE_HOME/conf/hive-site.xml`  
```xml
<property>
  <name>javax.jdo.option.ConnectionURL</name>
  <value>jdbc:postgresql://localhost:5432/postgres</value>
  <description>JDBC connect string for a JDBC metastore</description>
</property>

<property>
  <name>javax.jdo.option.ConnectionDriverName</name>
  <value>org.postgresql.Driver</value>
  <description>Driver class name for a JDBC metastore</description>
</property>

<property>
  <name>javax.jdo.option.ConnectionPassword</name>
  <value>123456</value>
  <description>password to use against metastore database</description>
</property>

<property>
  <name>hive.metastore.warehouse.dir</name>
  <value>/user/hive/warehouse</value>
  <description>location of default database for the warehouse</description>
</property>
```


create related tables in postgresql.  
This schema file is under `$HIVE_HOME/scripts`, find the one that fit your requirement.  
```shell
psql -Upostgres -h127.0.0.1 -f hive-schema-0.9.0.postgres.sql
```

Download the JDBC driver for postgresql and move it into `$HIVE_HOME/lib`


Now just create folders.  
Create directories on HDFS for HIVE.  

```shell
$HADOOP_HOME/bin/hadoop fs -mkidr /tmp
$HADOOP_HOME/bin/hadoop fs -mkidr /user/hive/warehouse
$HADOOP_HOME/bin/hadoop fs -chmod g+w /tmp
$HADOOP_HOME/bin/hadoop fs -chmod g+w /user/hive/warehouse
```

# start

```shell
# startup metastore service
hive --service metastore &

# startup hive server
hive --service hiveserver &

# launch hive interactive client
hive shell
```

# basic usage


```shell
hive> CREATE TABLE student (name string, value string);
hive> LOAD DATA LOCAL INPATH '/home/rugal/data/data.txt' OVERWRITE INTO TABLE t_hive ;
```


After the creation of table and the import, now check the HDFS for imported data.  

    hadoop fs -cat /user/hive/warehouse/t_hive/t_hive.txt

Seems good, Cong!  
For further steps, please visit [official](http://hive.apache.org).
