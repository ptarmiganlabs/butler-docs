---
title: "Running Butler as a Node.js application"
linkTitle: "Node.js app"
weight: 30
description: >
  How to install Butler as a Node.js application.
---

## Selecting an OS

While Qlik Sense Enterprise is a Windows only system, Butler should be able to run on any OS where Node.js is available.  
Butler has been successfully used - during development and production - on Windows, Linux (Debian and Ubuntu tested) and mac OS.

## Installation steps

The steps below outline the steps needed to install Butler as a native Node.js application on for example Windows Server.

Additional information is found on the [Day 2 operations](/docs/getting-started/operations/) page.

- **Install node.js**  
   Butler has been developed and tested using the 64 bit version of [Node.js](https://nodejs.org/en/download/). The most recent LTS (Long Term Support) version is usually a good choice.

- **Decide where to install Butler**  
   It is usually a good starting point to run Butler on the Sense server. If there are more than one server in the Sense cluster, Butler can be placed on the reload server (as the /createDir endpoint then can be used to create folders in which QVD and other files can be stored).

  On the other hand, you might want to keep the Sense servers as clean as possible (with respect to software running on them). If that is a priority you should install Butler on some other server.

  The bottom line is that Butler can run on any server, as long as there is network connectivity to the Sense server(s).

- **Download Butler**  
   Download the repository zip from the [releases page](https://github.com/ptarmiganlabs/butler/releases).

  Do not just clone the Butler repository as that will give you the latest development version, which may not yet be fully tested and packaged.  
   The exception is of course if you want to contribute to Butler development - then forking and cloning the repository is the right thing to do.

- **Install node dependencies**  
   From a Windows command prompt (assuming the Butler ZIP file/repository was saved to d:\\node\\butler):

        d:
        cd \node\butler\src
        npm install

  This will download and install all Node.js modules used by Butler.  
   On some OSs you'll get some warnings during the installation - they are usually harmless. Try to run Butler even if you got some warnings, chances are good that things will work just fine. This is common on especially Windows Server and is a result of some Butler dependencies being primarily developed on Linux rather than Windows.
