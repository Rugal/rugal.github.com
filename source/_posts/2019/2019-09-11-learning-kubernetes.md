---
layout: post
title: "Learning Kubernetes"
description: ""
category:  operation
tags: [bash, linux, kubernetes]
date: 2019-09-11
---

# Component
## master

Control panel of the entire cluster.

### kube-apiserver
Expose API for control panel.

### etcd
Key-Value store for all cluster data.

### kube-scheduler
Watch newly created pods and assign node to run.

### kube-controller-manager
Each controller is logically separated into different process but they are actually combined into single process from single binary.

1. Node controller: Detect node status
2. Replication Controller: Maintain correct number of pods based on replication
3. Endpoint Controller: Provide endpoint object: Services, Pods
4. Account & Token Controller: create default account & access token for new namespace

### cloud-controller-manager
Interact with underlying cloud providers.


## node
Maintain running pods and provide Kubernetes runtime environment.

### kubelet
Run on each node in cluster.
Make sure containers are running in a pod. It takes a set of PodSpecs, then ensure the containers are aligned with it.
It doesnot bmanage containers which were not created by Kubernetes.

### kube-proxy
It is a network proxy that runs on each node.
Maintain network rules on nodes, allow network communication to your Pods IN/OUT of your cluster.
It uses either operating system packet filtering layer or forward the traffic itself.

### Container Runtime
Kubernetes support several containers:

1. Docker
2. Containerd
3. cri-o
4. rktlet

# Kubernetes Objects

### Pod
The basic building block and deployable object in Kubernetes object model.
Pod encapsulates an application container, storage, unique network IP, configuration that define the way container runs.
Pod represents a unit of `deployment`.

Pod can be run in both single and multiple container.

### Service
An abstract way to expose application as network service. Application runs on top of a set of pods.
With it, application can use the native discovery mechanism, with their own IP and single DNS name, also with load balance across a set of pods.

### Volumn
Disk files in container are not persistant, which means files will lose once kubelet restarts container. Container also might want to share file with others.
Volume solves these requirements.

### Namespace
Term used for grouping multiple virtual cluster based on same physical cluster.

### ReplicaSet
Maintain a set of replica pods running at any give time. Often used to guarantee the availability of identical pods.

### Deployment
Provides declarative configuration for `Pod` and `ReplicaSet`, so that you don't have to manually update the number. Simply set the desired state and `deployment` do control over change for you.

### StatefulSet
Manage the deployment and scaling of pods. Guarantee the order and uniqueness of these pods, with declarative configuration.
This suites will for:

1. stable unique network identifier
2. stable persistent storage
3. ordered graceful deployment and scaling
4. ordered, automated rolling updates

### DaemonSet
Ensure nodes run a copy of a Pod, so as to guarantee pod exists in configured nodes.

### Job
It creates some pods, finishs their commands and guarantees they successfully terminate.
This is useful when you want to run some on-fly tasks.
