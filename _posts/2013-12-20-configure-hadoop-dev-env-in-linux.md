---
layout: post
title: "configure Hadoop dev env in Linux"
description: ""
category: development
tags: [hadoop,java,linux]
---
{% include JB/setup %}
Finally I have finished testing my first hadoop experiment,altought it's just a very easy&simple word count program which included in hadoop example code itself, to configure a correct enviornment for hadoop developing is so hard for a noob as me.  

Hadoop development needs an java developing environment of course. so I prepared it myself a open-jdk-1.7.0 version, which affect some configure side in my procedures.  
here is my experimental environment:  

------------------------------------------------------------------  
1.    Hadoop-1.0.4  
2.    jdk-1.7.0  
3.    scientific linux 6.3 (carbon)  
4.    eclipse    jee-juno-SR1-linux-gtk-x86_64  

------------------------------------------------------------------  


After googling two days later,hoaxed by too many bad text&information, I have finally got the right key to successfully configure a environment for hadoop program developing.  


###NOW let's begin!

------------------------------------------------------------------  

1. after finish scientific linux 6.3 installation,the first thing you need to do is to install a update-to-dated open-jdk-1.7.0  
`[root@localhost ~]# yum search java-1.7.0-openjdk.x86_64`  
to ensure that your develop environment is correct for further configuration and I have encounter a problem here that depict a little restriction of denying uncompatible jdk jar package from windows to linux.  

2. download a [eclipse]( http://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/juno/SR1/eclipse-jee-juno-SR1-linux-gtk-x86_64.tar.gz) for fast&cosy hadoop program development  
unarchived eclipse to your own IDE directory, for me is `/opt` so the complete directory of eclipse is `/opt/eclipse` and you can startup eclipse by  
`[root@localhost ~]# /opt/eclipse/eclipse`  
or you can just add a symbol link to your user binary path  
`[root@localhost ~]# ln -s /opt/eclipse/eclipse   /usr/bin/eclipse`  

3. download the [hadoop](http://labs.mop.com/apache-mirror/hadoop/common/hadoop-1.0.4/) and that is what I have downloaded ,the version is 1.0.4 a little trended one. very hard to find on other blog  
unarchive the hadoop to your tools directory ,for me is the same as eclipse  
`[root@localhost ~]# tar -zxf hadoop-1.0.4.tar.gz -C /opt/`  

4. then you shoud make some change on hadoop's configuration files.  
edit the `conf/core-site.xml`  

       <configuration>
            <property>
               <name>fs.default.name</name>
               <value>hdfs://localhost:8000</value>
            </property>
            <property>
               <name>hadoop.tmp.dir</name>
               <value>/opt/hadoop/tmp</value>
            </property>
       </configuration>


    this configure allow your datanode to listen on the port of `:8000` on localhost and decided to change temporary directory to `/opt/tmp`  
    edit `conf/mapred-site.xml` ,as:  

       <configuration>
           <property>
               <name>mapred.job.tracker</name>
               <value>localhost:9001</value>
           </property>
       </configuration>


    this file configure the job tracker node in cluster,remember port `:9001`  
    next edit the file named `conf/hdfs-site.xml`  


       <configuration>
           <property>
               <name>dfs.replication</name>
               <value>1</value>
           </property>
       </configuration>

    the configuration above is to determeine now many replication of hdfs will be stored, because HADOOP is a distributed system, distributed and replication strategy must be the best method to store large scale of data.  


5. initialize the hdfs and startup HADOOP daemon  
`[root@localhost hadoop-1.0.4]# ./bin/hadoop namenode -format`  
`[root@localhost hadoop-1.0.4]# ./bin/start-all.sh`  


6. get corresponding eclipse plugin  
As my hadoop version is 1.0.4, the version of plugin must be 1.0.4  
I have to compile a plugin jar file myself, because the version after 0.20 in hadoop release, the hadoop releaser will not compile the eclipse plugin in advance, whilst they just put source code in   
`src/contrib/eclipse-plugin/`   
Hence you can use `ant` or `ivy` to compile yourself accordent with your operation system or other parameters in developing environment.  
you can also download 1.0.4 plugin on [internet](http://yiyujia.blogspot.com/2012/10/eclipse-mapreduce-plugin-build-for.html)  
that is much easier!  

7. put eclipse plugin in $ECLIPSE_HOME/plugin  
in my situation, `/opt/eclipse/plugins/`  
now your eclipse have the capability to develop hadoop project.  

8. launch eclipse  
then startup your eclipse and click this little button named "open perspective"  
![map-reduce-perspective](http://githubpage.u.qiniudn.com/Map-Reduce-perspective.png)  
then enter the Map/reduce location tab  
![map-reduce-perspective](http://githubpage.u.qiniudn.com/map-reduce-location.png)  
right click and new or edit a hadoop location  
![map-reduce-perspective](http://githubpage.u.qiniudn.com/edit-map-reduce-location.png)  
edit this configuration window to ensure your eclipse connect to the right port and host ,do you remember that two ports I have mentioned?  
the port on left is in the mapred-site.xml file  other is in core-site.xml file  
![map-reduce-perspective](http://githubpage.u.qiniudn.com/map-reduce-dia.png)  
now you can see the project explore,double click the hadoop icon in this DFS locations  
![map-reduce-perspective](http://githubpage.u.qiniudn.com/DFS-location.png)  
if everthing ok. there will be a progress tell you how this connection perform.  
![map-reduce-perspective](http://githubpage.u.qiniudn.com/DFS-location-browse.png)  

Beware your directory may not similar to mine,thus dont get annoyed if your pattern is different to mine.  
now it seems your HADOOP development environment is complete now lets test it to as if this work!  



#test our hadoop env
1. sample data

        java c++ python c  
        java c++ javascript  
        helloworld hadoop  
        mapreduce java hadoop hbase

2. create HDFS folder
create folder on HDFS through hadoop command named `/tmp/workcount`  notice this named folder is virtually mounted in HDFS, thus it is located in the folder you have defined in configuration file.  
`bin/hadoop fs -mkdir /tmp/wordcount`  
then transmit this data file into HDFS   
`bin/hadoop fs -copyFromLocal /home/rugal/word.txt  /tmp/wordcount/word.txt`  


3. execute hadoop job
run this project but you have to make some change in parameters  
right click on wordcount.java file in eclipse -->Run as-->Run Configurations  
add  parameter below seperated by space  
`hdfs://localhost:8000/tmp/wordcount/word.txt`  
`hdfs://localhost:8000/tmp/wordcount/out`  

    ![map-reduce-perspective](http://githubpage.u.qiniudn.com/run-configuration.png)  
    now you can run this project,is that correct run ?  
    if this project encounter java.lang.OutOfMemoryError: Java heap space,just configure VM arguments in (program arguments)  
    `-Xms512m -Xmx1024m -XX:MaxPermSize=256m`  

    there are many line printed on eclipse console  
    after the completion of running,you can see that result of program by hadoop command  
    `bin/hadoop fs -ls /tmp/wordcount/out`  
    you should know folder is refer to your command above so be careful create folders  

4. display result
let see the result by HADOOP command  
`bin/hadoop fs -cat /tmp/wordcount/out/part-r-00000`  


        c         1
        c++       2
        hadoop    2
        hbase     1
        helloworld 1
        java       3
        javascript  1
        mapreduce  1
        python    1

    ok, here we have finished all the hadoop configuration and developing environment deployment, it spent me 2 days in total!
