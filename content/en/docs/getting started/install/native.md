---
title: "Running Butler as a native, pre-built application"
linkTitle: "Native app"
weight: 15
description: >
  How to install the pre-built, stand alone Butler applications.
---

## Downloading the app

Download Butler for your preferred operating systym.

Latest version is available on [GitHub](https://github.com/ptarmiganlabs/butler/releases/latest).

## Installation steps

Installing Butler is quite simple.  
The steps below outline the process.

Additional information is found on the [Day 2 operations](/docs/getting-started/operations/) page.

* **Decide where to install Butler**  
    It is usually a good starting point to run Butler on the Sense server. If there are more than one server in the Sense cluster, Butler can be placed on the reload server (as the /createDir endpoint then can be used to create folders in which QVD and other files can be stored).  

    On the other hand, you might want to keep the Sense servers as clean as possible (with respect to software running on them). If that is a priority you should install Butler on some other server.  

    The bottom line is that Butler can run on any server, as long as there is network connectivity to the Sense server(s).  

    It's usually a good idea to keep 3rd party tools installed in the same directory tree, to maintenance as easy as possible.  
    A good place for Butler could be `c:\tools\butler` or `d:\tools\butler` on Windows, for example.

* **Download Butler**  
    Download the latest version from the [releases page](https://github.com/ptarmiganlabs/butler/releases/latest).  
    Make sure to get the binary file for your preferred operating system.

    Unzip the downloaded file, then copy or move the butler binary to the desired directory (e.g. `c:\tools\butler`) and that's it.

{{< notice tip >}}
On Windows you must "unblock" the ZIP file before extracting the Butler binary from it.  
This is basically a way to tell Windows that the ZIP is safe even though it was downloaded from Internet.

Right click on the ZIP file, then select `Properties`.  
If there is an "Unblock" check box in the lower right part of the properties window you should click that box and hit OK.  
Then unpack the ZIP file.

The macOS version of Butler is signed using Apple's official app signing process.  
This means you may see a warning the first time you start Butler, but after that there should be no more warnings. 
{{< /notice >}}
