# copy-link-text
 A browser extension that allows you to copy a link's text via the context menu

You can always browse through the source code (in `src`).

## Build for release
```bash
npm i # In case it's not done already
npm run build # Build the extension (in dist)
npm run webext:build # Package the WebExtension (using dist as the source directory, putting the zip archive into web-ext-artifacts)
```

After these commands, you will have the built (and minified) code inside the `dist` folder, as well as a zip of said code inside `web-ext-artifacts` (named `copy-link-text-<manifest version>.zip`, e.g. `copy-link-text-1.0.0.zip`).
