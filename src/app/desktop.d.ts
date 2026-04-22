export {};

declare global {
  interface Window {
    newmakerDesktop?: {
      getAppInfo: () => Promise<{
        isDesktop: boolean;
        isPackaged: boolean;
        version: string;
        updateState: DesktopUpdateState;
      }>;
      checkForUpdates: () => Promise<DesktopActionResult>;
      downloadUpdate: () => Promise<DesktopActionResult>;
      installUpdate: () => Promise<DesktopActionResult>;
      onUpdateStatus: (
        callback: (payload: DesktopUpdateState) => void
      ) => () => void;
    };
  }

  interface DesktopUpdateState {
    checking: boolean;
    available: boolean;
    downloaded: boolean;
    error: string;
    version: string;
    releaseName: string;
    releaseDate: string;
    releaseNotes: string;
  }

  interface DesktopActionResult {
    ok: boolean;
    message: string;
    updateState?: DesktopUpdateState;
  }
}
