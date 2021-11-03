---
title: "Choose a platform"
linkTitle: "Choose a platform"
weight: 20
description: >
  On what platforms does Butler run?
---

The short answer is: Almost anywhere.  
As long as [Node.js](https://nodejs.org/) is available on the platform there is a good chance Butler will run there.

Butler has been successfully used on Windows Server, Windows 10, various Linux distributions, in Docker, Kubernetes, on Mac OS and even on Raspberry Pis. And a Raspberry Pi based Kubernetes cluster.

Your platform options typically fall into two categories:

## Butler in a container: Docker and Kubernetes

If you have access to or can set up a **container runtime environment**, this is by far the preferred way of running Butler.

Installation is less error prone compared to installing Butler as a native Node.js app, you get all the benefits from the Docker ecosystem (monitoring of running containers etc), and upgrades to future Butler versions become trivial.

If you have access to a **Kubernetes** cluster, that is usually an even better option than Docker. Kubernetes can be daunting when first approached, but will give you superb reliability, failover and restarts if a server goes down or becomes unresponsive etc. All major cloud providers (Microsoft Azure, Google, Amazon etc) offer Kubernetes services.

[Rancher's K3s](https://k3s.io/) is a very good way to get started with self hosted Kubnernetes. Fully featured, well supported and a vibrant developer community.

## Butler as a native app: Windows, Linux, Mac OS

This option means you will first install Node.js on your server of choice, then Butler and it's dependencies.

It works perfectly well and might for many be the easiest way to get started, as you for sure already have a Windows Server for running Qlik Sense Enterprise.

You can use tools like [NSSM](https://nssm.cc) to turn the Butler Node.js app into a Windows servers, or a tool like [PM2](https://pm2.keymetrics.io) to watch over Butler on Linux-ish platforms.
