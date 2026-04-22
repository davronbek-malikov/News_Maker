import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, Download, RefreshCw, Sparkles, ArrowUpCircle } from 'lucide-react';

export function Settings() {
  const [automationMode, setAutomationMode] = useState('ai-approval');
  const [sources, setSources] = useState(['Reuters', 'TechCrunch', 'The Verge']);
  const [newSource, setNewSource] = useState('');
  const [desktopInfo, setDesktopInfo] = useState<DesktopAppInfo | null>(null);
  const [updateMessage, setUpdateMessage] = useState('');
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if (!window.newmakerDesktop) {
      return;
    }

    let unsubscribe = () => {};

    window.newmakerDesktop.getAppInfo().then((info) => {
      setDesktopInfo(info);
    });

    unsubscribe = window.newmakerDesktop.onUpdateStatus((payload) => {
      setDesktopInfo((current) =>
        current
          ? { ...current, updateState: payload, version: current.version }
          : {
              isDesktop: true,
              isPackaged: false,
              version: payload.version,
              updateState: payload,
            }
      );
    });

    return () => unsubscribe();
  }, []);

  async function checkUpdates() {
    if (!window.newmakerDesktop) return;
    setWorking(true);
    const result = await window.newmakerDesktop.checkForUpdates();
    setUpdateMessage(result.message);
    if (result.updateState) {
      setDesktopInfo((current) => (current ? { ...current, updateState: result.updateState! } : current));
    }
    setWorking(false);
  }

  async function downloadUpdate() {
    if (!window.newmakerDesktop) return;
    setWorking(true);
    const result = await window.newmakerDesktop.downloadUpdate();
    setUpdateMessage(result.message);
    if (result.updateState) {
      setDesktopInfo((current) => (current ? { ...current, updateState: result.updateState! } : current));
    }
    setWorking(false);
  }

  async function installUpdate() {
    if (!window.newmakerDesktop) return;
    setWorking(true);
    const result = await window.newmakerDesktop.installUpdate();
    setUpdateMessage(result.message);
    setWorking(false);
  }

  const releaseNotes = desktopInfo?.updateState.releaseNotes?.trim();

  return (
    <div className="max-w-4xl space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">App Updates</h2>
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary">
                <ArrowUpCircle className="w-5 h-5" />
                <span className="font-medium">Desktop release updater</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                This is the in-app place to test updates without deleting and reinstalling each time.
                When a new GitHub Release exists, you can read what changed, download it, and install it here.
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-muted px-3 py-1.5">
                  Current version: {desktopInfo?.version ?? 'web mode'}
                </span>
                <span className="rounded-full bg-muted px-3 py-1.5">
                  Mode: {desktopInfo?.isPackaged ? 'desktop package' : 'web/dev'}
                </span>
                {desktopInfo?.updateState.releaseName ? (
                  <span className="rounded-full bg-primary/10 px-3 py-1.5 text-primary">
                    Latest release: {desktopInfo.updateState.releaseName}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={checkUpdates}
                disabled={working || !window.newmakerDesktop}
                className="h-10 px-4 border border-border rounded-lg flex items-center gap-2 hover:bg-secondary transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${working ? 'animate-spin' : ''}`} />
                Check updates
              </button>
              <button
                type="button"
                onClick={downloadUpdate}
                disabled={working || !desktopInfo?.updateState.available}
                className="h-10 px-4 border border-border rounded-lg flex items-center gap-2 hover:bg-secondary transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                Download update
              </button>
              <button
                type="button"
                onClick={installUpdate}
                disabled={working || !desktopInfo?.updateState.downloaded}
                className="h-10 px-4 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                Install update
              </button>
            </div>
          </div>

          {updateMessage ? (
            <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm">
              {updateMessage}
            </div>
          ) : null}

          {desktopInfo?.updateState.error ? (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {desktopInfo.updateState.error}
            </div>
          ) : null}

          <div className="rounded-xl border border-border p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-medium">What&apos;s new</h3>
                <p className="text-sm text-muted-foreground">
                  Release notes from the latest published desktop version.
                </p>
              </div>
              {desktopInfo?.updateState.releaseDate ? (
                <span className="text-xs text-muted-foreground">
                  {new Date(desktopInfo.updateState.releaseDate).toLocaleString()}
                </span>
              ) : null}
            </div>

            {releaseNotes ? (
              <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-muted/40 p-4 text-sm text-foreground">
                {releaseNotes}
              </pre>
            ) : (
              <div className="mt-4 rounded-lg bg-muted/40 p-4 text-sm text-muted-foreground">
                No downloaded release notes yet. Click <span className="font-medium">Check updates</span> to see what changed in the newest version.
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Automation Mode</h2>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="automation"
              value="manual"
              checked={automationMode === 'manual'}
              onChange={(e) => setAutomationMode(e.target.value)}
              className="mt-1"
            />
            <div>
              <div className="font-medium mb-1">Manual Only</div>
              <div className="text-sm text-muted-foreground">
                AI suggestions are disabled. All posts are created manually.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="automation"
              value="ai-approval"
              checked={automationMode === 'ai-approval'}
              onChange={(e) => setAutomationMode(e.target.value)}
              className="mt-1"
            />
            <div>
              <div className="font-medium mb-1">AI + Approval (Recommended)</div>
              <div className="text-sm text-muted-foreground">
                AI generates posts, but all require manual approval before publishing.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="automation"
              value="auto"
              checked={automationMode === 'auto'}
              onChange={(e) => setAutomationMode(e.target.value)}
              className="mt-1"
            />
            <div>
              <div className="font-medium mb-1">Fully Automatic</div>
              <div className="text-sm text-muted-foreground">
                AI generates and publishes posts automatically. Use with caution.
              </div>
            </div>
          </label>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Content Sources</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="space-y-3 mb-4">
            {sources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span>{source}</span>
                <button
                  onClick={() => setSources(sources.filter((_, i) => i !== index))}
                  className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSource}
              onChange={(e) => setNewSource(e.target.value)}
              placeholder="Add new source..."
              className="flex-1 h-10 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={() => {
                if (newSource.trim()) {
                  setSources([...sources, newSource]);
                  setNewSource('');
                }
              }}
              className="h-10 px-4 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:opacity-90"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3 pt-6 border-t border-border">
        <button className="h-10 px-6 border border-border rounded-lg hover:bg-secondary transition-colors">
          Reset to Defaults
        </button>
        <button className="h-10 px-6 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:opacity-90">
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
