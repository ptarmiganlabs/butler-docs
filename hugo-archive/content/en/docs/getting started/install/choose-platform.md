---
title: "Decide how to run Butler"
linkTitle: "Time to decide"
weight: 10
description: >
  On what platforms does Butler run?
---

The short answer is: Almost anywhere.  

The pre-built binaries for Windows, macOS, Linux and Docker should cater for most use cases.  

If you have some other, more exotic platform or operating system you want to run Butler on that's probably possible too.  
Butler is built on Node.js and as long as [Node.js](https://nodejs.org/) is available on the platform/operating system of your choice there is a good chance Butler will run there.

Butler has been successfully used on Windows Server, Windows 10, various Linux distributions, in Docker, Kubernetes, on Mac OS and even on Raspberry Pis. And a [Raspberry Pi based Kubernetes cluster](https://medium.com/ptarmigan-labs/butler-devops-tools-for-qlik-sense-running-on-raspberry-pi-based-kubernetes-cluster-6301c57b0ce7).

Your platform options thus typically fall into three categories:

## Butler as a stand-alone executable

Here you will be using the pre-built Butler binaries (Windows, Linux, Mac OS) that are available for Butler 7.2 and later.

When using third party tools these binaries can be started as services.  
For example, on Windows the free [NSSM](https://nssm.cc) tool is a great way to run Butler as a Windows service.  
Another good tool is [PM2](https://pm2.keymetrics.io) which works well on Linux-ish platforms.

The Butler stand-alone executables are available on the [GitHub releases page](https://github.com/ptarmiganlabs/butler/releases).

## Butler in a container: Docker and Kubernetes

If you have access to or can set up a **container runtime environment**, this is a great way to running Butler.

Installation is less error prone compared to installing Butler as a native Node.js app, you get all the benefits from the Docker ecosystem (monitoring of running containers etc), and upgrades to future Butler versions become trivial.

If you have access to a **Kubernetes** cluster, that is usually an even better option than Docker. Kubernetes can be daunting when first approached, but will give you superb reliability, failover and restarts if a server goes down or becomes unresponsive etc. All major cloud providers (Microsoft Azure, Google, Amazon etc) offer Kubernetes services.

[Rancher's K3s](https://k3s.io/) is a very good way to get started with self hosted Kubnernetes. Fully featured, well supported and a vibrant developer community.

## Butler as a Node.js application

This option means you will first install Node.js on your server of choice, then Butler and it's dependencies.

It works perfectly well but is the most demanding when it comes to amount of work needed to get started.
