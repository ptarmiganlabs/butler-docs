---
title: "Visualise Butler's config file"
linkTitle: "Visualise config file"
weight: 350
description:
---

## What's this?

Butler can start a web server that serves an (optionally obfuscated) view of the Butler config file.

This can be useful in situations such as

- When you need to check the configuration of Butler, but don't have easy access to the machine where Butler is running.
- When you need to share the Butler config with someone else, but don't want to share all the details. 

The web server provides two views of the config file: JSON and YAML.

It is also possible to download the config file as YAML from the web page.
If the config file is obfuscated, the downloaded file will be obfuscated as well.

## Example

Here's an example of what the YAML view could look like:

![YAML view of the Butler config file in use](/img/butler-visualise-config-yaml-1.png "YAML view of the Butler config file in use")

And here's an example of the JSON view:

![JSON view of the Butler config file in use](/img/butler-visualise-config-json-1.png "JSON view of the Butler config file in use")

## Settings in config file

```yaml
Butler:
  ...
  ...
  # Should Butler start a web server that serves an obfuscated view of the Butler config file?
  configVisualisation:
    enable: true
    host: localhost       # Hostname or IP address where the web server will listen. Should be localhost in most cases.
    port: 3100            # Port where the web server will listen. Change if port 3100 is already in use.
    obfuscate: true        # Should the config file shown in the web UI be obfuscated?
  ...
  ...
```
