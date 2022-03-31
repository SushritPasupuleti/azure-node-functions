# Prerequisites

Add the following to `.vscode/settings.json`:

```json
{
  "azureFunctions.deploySubpath": ".",
  "azureFunctions.projectLanguage": "JavaScript",
  "azureFunctions.projectRuntime": "~3",
  "debug.internalConsoleOptions": "neverOpen",
  "azureFunctions.scmDoBuildDuringDeployment": true
}
```

Without these settings, Azure Functions will not be able to deploy properly to support puppeteer.

Add the following to end of `.funcignore`

```
node_modules/
```

There is no need to bundle `node_modules` when doing a remote build.
