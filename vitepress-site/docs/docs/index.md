# Documentation

::: tip Upgrading from an earlier version of Butler?
General guidance on how to do this is found [here](/docs/getting-started/upgrade).
:::

::: tip Release Notes
Starting with version 11.2, the [GitHub releases page](https://github.com/ptarmiganlabs/butler/releases) is the place where release notes are found.
:::

## Release highlights

### What's new in version 11.1.0

🚀 **Features**

- **license**: Monitor high level Qlik Sense license usage across different license types.
- **license**: Scheduled removal of unused user Qlik Sense licenses.

🐛 **Bug Fixes**

- **config**: Better, more complete check of config when starting Butler.
- **reload failed**: Make handling of reload failed/aborted/succeeded messages more robust.
- **startup**: Remove Node.js warnings on Butler startup.
- **startup**: More consistent logging during startup.
- **startup**: Tidy up formatting of startup info written to logs.

👉 **Miscellaneous**

Optimize GH Actions for building binaries.
Remove udp client from Butler project, move to its own repo.
Sign Win binaries with new signing solution.
Update dependencies.

### What's new in version 11.0.0

Focus of this release is to modernize the Butler code base.  
No new features, but a lot of work has been done to make Butler more robust and easier to maintain in the future.

🐛 **Bug Fixes**

- **docker**: Correctly report Docker status
- **general**: Make path resolution for QIX schema files more robust
- **mqtt**: Better logging and check for cert existence
- **webhook**: Deal with empty webhook list without errors
- **winsvc**: Win service monitoring no longer relies on New Relic

For more detailed release notes, see the [GitHub releases page](https://github.com/ptarmiganlabs/butler/releases).