---
title: "Which config file to use"
linkTitle: "Which config file?"
weight: 2
description: >
  Butler can use multiple config files. Here you learn to control which one is used by Butler.
---

<!-- {{% pageinfo %}}
This is a placeholder page that shows you how to use this template site.
{{% /pageinfo %}} -->

## Select which config file to use

Butler uses configuration files in YAML format. The config files are stored in the `src/config` folder.  

Prior to Butler v2.1, JSON config files were used. YAML is however much more human readable than JSON, thus the config file was changed to YANL.  
JSON config files can still be used though (just create the file i JSON syntax and suffix it with .json), but YAML is the default as of Butler v2.1.

Butler comes with a default config file called `default_template.yaml`. Make a copy of it, then rename the copy to `default.yaml` or `production.yaml`.  
Update it as needed (see below for details).

Trying to run Butler with the default config file (the one included in the files download from GitHub) will not work - you need to adapt it to your server environment.

Note: Butler uses the [node-config](https://github.com/lorenwest/node-config) module to handle config files. As per node-config's documentation, to switch to using the production.yaml config file, at a command prompt type (for Windows)

    set NODE_ENV=production

before starting Butler with `node butler.js`.  
If developing on OSX or Linux, instead use  

    export NODE_ENV=production

You may want to set that variable during server boot, to ensure Butler starts properly when the server is rebooted.

If using Docker, the NODE_ENV environment varible is set in the docker-compose.yml file (as already done in the [template docker-compose file](https://github.com/ptarmiganlabs/butler/blob/master/src/docker-compose.yml).)
