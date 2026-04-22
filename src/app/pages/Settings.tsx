import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

export function Settings() {
  const [automationMode, setAutomationMode] = useState('ai-approval');
  const [sources, setSources] = useState(['Reuters', 'TechCrunch', 'The Verge']);
  const [newSource, setNewSource] = useState('');

  return (
    <div className="max-w-4xl space-y-8">
      {/* Automation Settings */}
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

      {/* Content Sources */}
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

      {/* Content Style */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Content Style</h2>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tone</label>
            <select className="w-full h-10 px-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Professional</option>
              <option>Casual</option>
              <option>Formal</option>
              <option>Conversational</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Writing Style</label>
            <select className="w-full h-10 px-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
              <option>News Reporting</option>
              <option>Editorial</option>
              <option>Analysis</option>
              <option>Opinion</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Length Preference</label>
            <select className="w-full h-10 px-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Short (100-200 words)</option>
              <option>Medium (200-400 words)</option>
              <option>Long (400+ words)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Language Settings */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Language Settings</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <div>
            <label className="block text-sm font-medium mb-2">Primary Language</label>
            <select className="w-full h-10 px-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Portuguese</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Enable multi-language support</span>
            </label>
          </div>
        </div>
      </section>

      {/* Platform Settings */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Platform Settings</h2>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          {[
            'Twitter',
            'Facebook Page',
            'Facebook Profile',
            'LinkedIn',
            'Instagram',
            'Telegram Channel',
            'WhatsApp',
            'YouTube Shorts'
          ].map((platform) => (
            <div key={platform} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="font-medium">{platform}</span>
              </div>
              <button className="text-sm text-primary hover:underline">
                Configure
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Approval Rules */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Approval Rules</h2>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm">Require approval for all AI-generated posts</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">Auto-approve posts with high confidence score (&gt;90%)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm">Send notification for pending approvals</span>
          </label>

          <div className="pt-4 border-t border-border">
            <label className="block text-sm font-medium mb-2">Approval Timeout</label>
            <select className="w-full h-10 px-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
              <option>24 hours</option>
              <option>48 hours</option>
              <option>72 hours</option>
              <option>1 week</option>
            </select>
            <div className="text-xs text-muted-foreground mt-2">
              Posts older than this will be automatically archived
            </div>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm">Email notifications for pending approvals</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm">Daily summary email</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">Weekly performance report</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm">Alert on low engagement posts</span>
          </label>
        </div>
      </section>

      {/* Save Button */}
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
