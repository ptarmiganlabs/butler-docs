# Qlik Sense Cloud Alert Template Fields

This section contains information about template fields available in alert messages for Qlik Sense Cloud.

Butler can send alert messages when certain events occur in Qlik Sense Cloud, such as failed app reloads.

The template fields are used to customize the alert messages with relevant information about the event that triggered the alert.

## Available Alert Types

- [Failed App Reloads](./app-reload) - Template fields for failed app reload alerts in Qlik Sense Cloud

## About Template Fields

Butler uses the [Handlebars](https://handlebarsjs.com/) library for templating work.

Handlebars offers a lot of useful features (nested template fields, evaluation context, template comments) and it's recommended that you browse through at least the [language features](https://handlebarsjs.com/guide/#installation) section of their getting started guide to get a feeling for what's possible.

:::warning Important
If a template field is used for an alert type where that field is not supported, the field will simply be blank. No errors will occur, but it can still be tricky to debug if you're not aware of this.
:::
