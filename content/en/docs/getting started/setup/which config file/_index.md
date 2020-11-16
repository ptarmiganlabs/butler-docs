---
title: "Which config file to use"
linkTitle: "Which config file?"
weight: 10
description: >
  Butler can use multiple config files. Here you learn to control which one is used by Butler.
---

A description of the config file format is available [here](/docs/reference/config-file/).

## Select which config file to use

Butler uses configuration files in YAML format. The config files are stored in the `src/config` folder.  

Prior to Butler v2.1, JSON config files were used. YAML is however much more human readable than JSON, thus the config file was changed to YAML.  
JSON config files can still be used though (just create the file in JSON syntax and suffix it with .json), but YAML is the default as of Butler v2.1.

Butler comes with a default config file called `production_template.yaml`. Make a copy of it, then rename the copy to `default.yaml`, `production.yaml`, `staging.yaml` or somthing else suitable for your specific use case.  
Update it as needed (see the [config file reference page](/docs/reference/config-file/) for details).

Trying to run Butler with the default config file (the one included in the files download from GitHub) will not work - you need to adapt it to your server environment. For example, you need to enter the IP or host name of you Sense server(s), the IP or host name where Butler is running etc.

The name of the config file matters. Butler looks for an environment variable called "NODE_ENV" and then tries to load a config file named with the value found in NODE_ENV.

For example:

* NODE_ENV=production

* Butler will look for a config file `config/production.yaml`.

### Running several Butler instances in parallel

If you have several Sense clusters (for example DEV, TEST and PROD environments) you might want several Butler instances running.  
You can then create config files names `butler_dev.yaml`, `butler_test.yaml` and `butler_prod.yaml`.

In this scenario three instances of Butler should be started, each given a different config file by setting the NODE_ENV variable as needed when starting Butler.

Note: If running several Butler instances in parallel, you must also ensure that each one uses unique port numbers for their respective REST APIs, UDP servers etc.

### Setting environment variables

The method for setting environment variables varies between different operating systems:

On Windows:

    set NODE_ENV=production

Mac OS or Linux

    export NODE_ENV=production

If using Docker, the NODE_ENV environment varible is set in the docker-compose.yml file (as already done in the [template docker-compose file](https://github.com/ptarmiganlabs/butler/blob/master/src/docker-compose.yml).)
