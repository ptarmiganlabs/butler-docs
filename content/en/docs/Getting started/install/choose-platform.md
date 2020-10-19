---
title: "Choose a platform"
linkTitle: "Choose a platform"
weight: 20
description: >
  On what platforms does Butler run?
---

If you have access to or can set up a **Docker** runtime environment, this is by far the preferred way of running Butler.

Installation is less error prone compared to installing Butler as a **Node.js app**, you get all the benefits from the Docker ecosystem (monitoring of running containers etc), and upgrades to future Butler versions become trivial.

If you have access to a **Kubernetes** cluster, that is usually an even better option than Docker. Kubernetes can be daunting when first approached, but will give you superb reliability, failover and restarts if a server goes down or becomes unresponsive etc.  

[Rancher's K3s](https://k3s.io/) is a very good way to get started with Kubnernetes. Fully featured, well supported and a vibrant developer community.  
