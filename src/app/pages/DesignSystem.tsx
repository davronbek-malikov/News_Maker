import { Badge } from '../components/Badge';
import { PostCard } from '../components/PostCard';
import { CheckCircle2, Calendar, Edit } from 'lucide-react';

export function DesignSystem() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Design System</h1>
        <p className="text-muted-foreground">
          Core design elements and components for AI News Maker platform
        </p>
      </div>

      {/* Layout Specs */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Layout Specifications</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Frame Width</div>
              <div className="text-xl font-semibold">1440px</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Sidebar</div>
              <div className="text-xl font-semibold">240px fixed</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Topbar</div>
              <div className="text-xl font-semibold">64px height</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Grid Columns</div>
              <div className="text-xl font-semibold">12 columns</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Margin</div>
              <div className="text-xl font-semibold">80px</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Gutter</div>
              <div className="text-xl font-semibold">24px</div>
            </div>
          </div>
        </div>
      </section>

      {/* Colors */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Color Palette</h2>
        <div className="grid grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="h-24 bg-primary rounded-xl" />
            <div>
              <div className="font-medium">Primary (Indigo)</div>
              <div className="text-sm text-muted-foreground">#4f46e5</div>
              <div className="text-xs text-muted-foreground">Main actions, links</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-24 bg-accent rounded-xl" />
            <div>
              <div className="font-medium">Accent (Purple)</div>
              <div className="text-sm text-muted-foreground">#8b5cf6</div>
              <div className="text-xs text-muted-foreground">AI features</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-24 bg-success rounded-xl" />
            <div>
              <div className="font-medium">Success (Green)</div>
              <div className="text-sm text-muted-foreground">#10b981</div>
              <div className="text-xs text-muted-foreground">Publish, approve</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-24 bg-destructive rounded-xl" />
            <div>
              <div className="font-medium">Destructive (Red)</div>
              <div className="text-sm text-muted-foreground">#ef4444</div>
              <div className="text-xs text-muted-foreground">Reject, delete</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-24 bg-warning rounded-xl" />
            <div>
              <div className="font-medium">Warning (Yellow)</div>
              <div className="text-sm text-muted-foreground">#f59e0b</div>
              <div className="text-xs text-muted-foreground">Edit, pending</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-24 bg-info rounded-xl" />
            <div>
              <div className="font-medium">Info (Blue)</div>
              <div className="text-sm text-muted-foreground">#3b82f6</div>
              <div className="text-xs text-muted-foreground">Schedule, info</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-24 bg-background border border-border rounded-xl" />
            <div>
              <div className="font-medium">Background</div>
              <div className="text-sm text-muted-foreground">#fafafa</div>
              <div className="text-xs text-muted-foreground">Page background</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-24 bg-card border border-border rounded-xl" />
            <div>
              <div className="font-medium">Card</div>
              <div className="text-sm text-muted-foreground">#ffffff</div>
              <div className="text-xs text-muted-foreground">Cards, surfaces</div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Typography</h2>
        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          <div>
            <h1 className="mb-2">Heading 1</h1>
            <div className="text-sm text-muted-foreground">Used for page titles</div>
          </div>

          <div>
            <h2 className="mb-2">Heading 2</h2>
            <div className="text-sm text-muted-foreground">Used for section titles</div>
          </div>

          <div>
            <h3 className="mb-2">Heading 3</h3>
            <div className="text-sm text-muted-foreground">Used for card titles</div>
          </div>

          <div>
            <p className="mb-2">Body text - Regular paragraph content used throughout the application</p>
            <div className="text-sm text-muted-foreground">Default body text</div>
          </div>

          <div>
            <p className="text-sm mb-2">Caption - Smaller text for metadata and secondary information</p>
            <div className="text-sm text-muted-foreground">Used for timestamps, labels</div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spacing Scale</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="space-y-4">
            {[
              { size: '8px', value: '2' },
              { size: '12px', value: '3' },
              { size: '16px', value: '4' },
              { size: '24px', value: '6' },
              { size: '32px', value: '8' },
            ].map((item) => (
              <div key={item.size} className="flex items-center gap-4">
                <div className="w-20 text-sm text-muted-foreground">{item.size}</div>
                <div className="h-8 bg-primary rounded" style={{ width: item.size }} />
                <div className="text-sm text-muted-foreground">space-{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Radius */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Border Radius</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="h-24 bg-muted rounded-lg mb-3" />
              <div className="font-medium">Buttons</div>
              <div className="text-sm text-muted-foreground">10px border radius</div>
            </div>
            <div>
              <div className="h-24 bg-muted rounded-xl mb-3" />
              <div className="font-medium">Cards</div>
              <div className="text-sm text-muted-foreground">12px border radius</div>
            </div>
            <div>
              <div className="h-24 bg-muted rounded mb-3" />
              <div className="font-medium">Tags</div>
              <div className="text-sm text-muted-foreground">4px border radius</div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <button className="h-9 px-4 bg-primary text-primary-foreground rounded-lg">
                Primary Button
              </button>
              <button className="h-9 px-4 bg-success text-success-foreground rounded-lg">
                Success Button
              </button>
              <button className="h-9 px-4 bg-destructive text-destructive-foreground rounded-lg">
                Destructive Button
              </button>
              <button className="h-9 px-4 bg-warning text-warning-foreground rounded-lg">
                Warning Button
              </button>
              <button className="h-9 px-4 bg-info text-info-foreground rounded-lg">
                Info Button
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button className="h-9 px-4 border border-border rounded-lg hover:bg-secondary">
                Secondary Button
              </button>
              <button className="h-9 px-4 border border-border rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                With Icon
              </button>
            </div>

            <div className="text-sm text-muted-foreground">
              Button height: 36px (h-9) • Padding: 16px horizontal
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Badges</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium mb-2">Type Badges</div>
              <div className="flex items-center gap-3">
                <Badge variant="ai">AI</Badge>
                <Badge variant="manual">MANUAL</Badge>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Status Badges</div>
              <div className="flex items-center gap-3">
                <Badge variant="draft">DRAFT</Badge>
                <Badge variant="scheduled">SCHEDULED</Badge>
                <Badge variant="pending">PENDING</Badge>
                <Badge variant="published">PUBLISHED</Badge>
                <Badge variant="rejected">REJECTED</Badge>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Badge height: 20px (h-5) • Padding: 8px horizontal • Text: 12px
            </div>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Form Inputs</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-2">Text Input</label>
              <input
                type="text"
                placeholder="Enter text..."
                className="w-full h-9 px-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select</label>
              <select className="w-full h-9 px-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Textarea</label>
              <textarea
                placeholder="Enter content..."
                rows={4}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <div className="text-sm text-muted-foreground">
              Input height: 36-40px • Border: 1px solid • Rounded: 8px
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-medium mb-2">Basic Card</h3>
            <p className="text-sm text-muted-foreground">
              Standard card with 16px padding and 12px border radius
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <PostCard
              id="demo"
              title="Sample News Post with AI Generation"
              platform="Twitter"
              status="scheduled"
              type="ai"
              time="09:00 AM"
              excerpt="This is a preview of how post cards appear in the content grid."
            />
          </div>
        </div>
      </section>

      {/* Timeline Slot */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Timeline Slot Component</h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 p-4 bg-muted/30 border-b border-border">
            <input
              type="text"
              value="Morning News"
              readOnly
              className="flex-1 bg-transparent border-none outline-none font-medium"
            />
            <input
              type="time"
              value="08:00"
              readOnly
              className="h-8 px-3 bg-card border border-border rounded-lg text-sm"
            />
            <button className="h-8 px-3 bg-primary text-primary-foreground rounded-lg text-sm">
              Daily
            </button>
          </div>
          <div className="p-4">
            <div className="h-16 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-sm text-muted-foreground">
              Drop posts here
            </div>
          </div>
        </div>
        <div className="mt-3 text-sm text-muted-foreground">
          Slot height: 80px • Padding: 12-16px • Flexible naming and timing
        </div>
      </section>

      {/* Icons */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Icons</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="w-6 h-6" />
              <span className="text-xs text-muted-foreground">Approve</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-xs text-muted-foreground">Schedule</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Edit className="w-6 h-6" />
              <span className="text-xs text-muted-foreground">Edit</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Using lucide-react icons • Standard size: 16px-24px
          </div>
        </div>
      </section>
    </div>
  );
}
