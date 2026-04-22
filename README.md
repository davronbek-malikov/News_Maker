# Newmaker

Desktop-packaged AI News Maker app with GitHub-based auto-updates.

## Local development

```bash
npm install
npm run dev
```

Desktop development:

```bash
npm run dev:desktop
```

## Build Windows installer

```bash
npm run dist:win
```

## Auto-update flow

1. Install the `.exe` once.
2. Update the app code and bump `package.json` version.
3. Push the changes.
4. Create and push a tag like `v0.1.1`.
5. GitHub Actions builds the Windows installer and publishes a GitHub Release.
6. Installed desktop apps can download and install that update in place.
