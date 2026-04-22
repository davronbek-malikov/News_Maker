export {};

declare global {
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

  interface TelegramAIPayload {
    apiKey: string;
    mode: "generate" | "polish";
    topic: string;
    title: string;
    content: string;
    language: string;
    tone: string;
    audience: string;
    tags: string[];
    keyPoints: string;
  }

  interface TelegramAIResult {
    ok: boolean;
    message: string;
    data?: {
      title: string;
      content: string;
      tags: string[];
      notes: string;
    };
  }

  interface DesktopAppInfo {
    isDesktop: boolean;
    isPackaged: boolean;
    version: string;
    updateState: DesktopUpdateState;
  }

  interface Window {
    newmakerDesktop?: {
      getAppInfo: () => Promise<DesktopAppInfo>;
      checkForUpdates: () => Promise<DesktopActionResult>;
      downloadUpdate: () => Promise<DesktopActionResult>;
      installUpdate: () => Promise<DesktopActionResult>;
      generateTelegramPost: (payload: TelegramAIPayload) => Promise<TelegramAIResult>;
      onUpdateStatus: (callback: (payload: DesktopUpdateState) => void) => () => void;
    };
  }
}
