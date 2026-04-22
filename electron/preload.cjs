const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("newmakerDesktop", {
  getAppInfo: () => ipcRenderer.invoke("app-info"),
  checkForUpdates: () => ipcRenderer.invoke("check-for-updates"),
  downloadUpdate: () => ipcRenderer.invoke("download-update"),
  installUpdate: () => ipcRenderer.invoke("install-update"),
  onUpdateStatus: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on("update-status", listener);
    return () => ipcRenderer.removeListener("update-status", listener);
  },
});
