# Newmaker

InsForge-backed Next.js app with a Windows desktop wrapper, GitHub release publishing, and in-app auto-update support.

## What is included

- InsForge database integration using the `todo` table
- Next.js web app running locally on `http://localhost:3001`
- Electron desktop shell for Windows packaging
- GitHub Releases auto-update support through `electron-updater`
- Release notes shown inside the desktop UI before installation

## Local development

```bash
npm install
npm run dev
```

Desktop development:

```bash
npm run dev:desktop
```

## Build the Windows installer locally

```bash
npm run dist:win
```

The installer is generated in the `release/` folder.

## Auto-update flow

1. Install the `.exe` once.
2. Push code updates to GitHub.
3. Bump the version in `package.json`.
4. Create and push a tag like `v0.1.1`.
5. GitHub Actions builds a new installer and publishes a GitHub Release.
6. The installed desktop app checks that release, shows release notes in the UI, downloads the update, and installs it without a manual uninstall/reinstall cycle.

## GitHub Actions secrets

Add these repository secrets before publishing desktop releases:

- `NEXT_PUBLIC_INSFORGE_URL`
- `NEXT_PUBLIC_INSFORGE_ANON_KEY`

## Database setup

The initial schema lives in [migrations/db_init.sql](./migrations/db_init.sql).
