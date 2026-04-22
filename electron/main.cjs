const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

const isDev = !app.isPackaged;
const devServerUrl = "http://127.0.0.1:3001";
let mainWindow = null;
let lastUpdatePayload = {
  checking: false,
  available: false,
  downloaded: false,
  error: "",
  version: app.getVersion(),
  releaseName: "",
  releaseDate: "",
  releaseNotes: "",
};

function broadcastUpdateState(patch = {}) {
  lastUpdatePayload = { ...lastUpdatePayload, ...patch };
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("update-status", lastUpdatePayload);
  }
}

function formatReleaseNotes(releaseNotes) {
  if (Array.isArray(releaseNotes)) {
    return releaseNotes
      .map((entry) => entry.note || "")
      .filter(Boolean)
      .join("\n\n");
  }
  if (typeof releaseNotes === "string") {
    return releaseNotes;
  }
  return "";
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 940,
    minWidth: 1180,
    minHeight: 760,
    backgroundColor: "#fafafa",
    autoHideMenuBar: true,
    title: "Newmaker",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  if (isDev) {
    await mainWindow.loadURL(devServerUrl);
  } else {
    await mainWindow.loadFile(path.join(app.getAppPath(), "dist", "index.html"));
  }
}

function configureAutoUpdater() {
  if (isDev) {
    return;
  }

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on("checking-for-update", () => {
    broadcastUpdateState({ checking: true, error: "" });
  });

  autoUpdater.on("update-available", (info) => {
    broadcastUpdateState({
      checking: false,
      available: true,
      downloaded: false,
      error: "",
      releaseName: info.releaseName || info.version || "",
      releaseDate: info.releaseDate || "",
      releaseNotes: formatReleaseNotes(info.releaseNotes),
      version: info.version || app.getVersion(),
    });
  });

  autoUpdater.on("update-not-available", () => {
    broadcastUpdateState({
      checking: false,
      available: false,
      downloaded: false,
      error: "",
      releaseName: "",
      releaseDate: "",
      releaseNotes: "",
      version: app.getVersion(),
    });
  });

  autoUpdater.on("error", (error) => {
    broadcastUpdateState({
      checking: false,
      error: error == null ? "Unknown update error." : error.message,
    });
  });

  autoUpdater.on("update-downloaded", (info) => {
    broadcastUpdateState({
      checking: false,
      available: true,
      downloaded: true,
      error: "",
      releaseName: info.releaseName || info.version || "",
      releaseDate: info.releaseDate || "",
      releaseNotes: formatReleaseNotes(info.releaseNotes),
      version: info.version || app.getVersion(),
    });
  });
}

ipcMain.handle("app-info", async () => ({
  isDesktop: true,
  isPackaged: app.isPackaged,
  version: app.getVersion(),
  updateState: lastUpdatePayload,
}));

ipcMain.handle("check-for-updates", async () => {
  if (isDev) {
    return {
      ok: false,
      message: "Auto-updates are only available in packaged builds.",
      updateState: lastUpdatePayload,
    };
  }

  try {
    await autoUpdater.checkForUpdates();
    return {
      ok: true,
      message: "Checking GitHub releases for updates.",
      updateState: lastUpdatePayload,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown update error.";
    broadcastUpdateState({ checking: false, error: message });
    return { ok: false, message, updateState: lastUpdatePayload };
  }
});

ipcMain.handle("download-update", async () => {
  if (isDev) {
    return {
      ok: false,
      message: "Package the app first to download updates.",
      updateState: lastUpdatePayload,
    };
  }

  try {
    await autoUpdater.downloadUpdate();
    return {
      ok: true,
      message: "Downloading update package.",
      updateState: lastUpdatePayload,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to download update.";
    broadcastUpdateState({ checking: false, error: message });
    return { ok: false, message, updateState: lastUpdatePayload };
  }
});

ipcMain.handle("install-update", async () => {
  if (isDev) {
    return {
      ok: false,
      message: "Package the app first to install updates.",
    };
  }

  const choice = await dialog.showMessageBox({
    type: "question",
    buttons: ["Install now", "Later"],
    defaultId: 0,
    cancelId: 1,
    title: "Install update",
    message: "Newmaker is ready to install the downloaded update.",
    detail: "The app will close and restart automatically.",
  });

  if (choice.response === 0) {
    setImmediate(() => autoUpdater.quitAndInstall());
    return { ok: true, message: "Installing update now." };
  }

  return { ok: false, message: "Update installation was postponed." };
});

ipcMain.handle("generate-telegram-post", async (_event, payload) => {
  const apiKey = payload?.apiKey?.trim();

  if (!apiKey) {
    return {
      ok: false,
      message: "Add your OpenAI API key in the AI panel first.",
    };
  }

  const prompt = buildTelegramPrompt(payload);

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        instructions:
          "You help create Telegram channel posts for a news workflow. Return concise, publish-ready results that are factual in tone, cleanly written, and easy to edit. Always return valid JSON that matches the requested schema.",
        input: prompt,
        text: {
          format: {
            type: "json_schema",
            name: "telegram_post_result",
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                title: { type: "string" },
                content: { type: "string" },
                tags: {
                  type: "array",
                  items: { type: "string" },
                },
                notes: { type: "string" },
              },
              required: ["title", "content", "tags", "notes"],
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        ok: false,
        message: `OpenAI request failed: ${response.status} ${errorText}`,
      };
    }

    const json = await response.json();
    const contentText =
      json?.output?.[0]?.content?.find((item) => item.type === "output_text")?.text ??
      json?.output_text;

    if (!contentText) {
      return {
        ok: false,
        message: "The AI response did not include usable text output.",
      };
    }

    const parsed = JSON.parse(contentText);
    return {
      ok: true,
      message:
        payload.mode === "generate"
          ? "Telegram draft generated."
          : "Telegram draft polished.",
      data: {
        title: parsed.title ?? "",
        content: parsed.content ?? "",
        tags: Array.isArray(parsed.tags) ? parsed.tags : [],
        notes: parsed.notes ?? "",
      },
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unknown AI error.",
    };
  }
});

function buildTelegramPrompt(payload) {
  const tagText = Array.isArray(payload.tags) && payload.tags.length
    ? payload.tags.join(", ")
    : "none";

  if (payload.mode === "polish") {
    return [
      "Task: improve an existing Telegram news post draft.",
      `Language: ${payload.language}`,
      `Tone: ${payload.tone}`,
      `Audience: ${payload.audience}`,
      `Current title: ${payload.title || "(empty)"}`,
      `Current content: ${payload.content || "(empty)"}`,
      `Existing tags: ${tagText}`,
      `Important points to preserve: ${payload.keyPoints || "none"}`,
      "Fix grammar mistakes, improve readability, tighten structure, and keep the post suitable for Telegram.",
      "Return improved title, improved content, up to 5 tags, and short notes about what changed.",
    ].join("\n");
  }

  return [
    "Task: generate a Telegram news post draft.",
    `Topic: ${payload.topic || payload.title || "General news update"}`,
    `Language: ${payload.language}`,
    `Tone: ${payload.tone}`,
    `Audience: ${payload.audience}`,
    `Key points to include: ${payload.keyPoints || "Use your best judgment."}`,
    `Optional starting title: ${payload.title || "(none)"}`,
    `Optional existing notes/content: ${payload.content || "(none)"}`,
    "Create a strong title, a clear Telegram-ready body, up to 5 useful tags, and a short note explaining the angle.",
  ].join("\n");
}

app.whenReady().then(async () => {
  configureAutoUpdater();
  await createWindow();

  if (!isDev) {
    autoUpdater.checkForUpdatesAndNotify().catch((error) => {
      const message = error instanceof Error ? error.message : "Update check failed.";
      broadcastUpdateState({ checking: false, error: message });
    });
  }

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
