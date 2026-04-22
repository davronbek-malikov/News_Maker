import { Outlet, Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Edit3,
  CheckCircle,
  BarChart3,
  Settings as SettingsIcon,
  FileEdit,
  CalendarDays,
  Palette,
  Plus,
  Sparkles
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Design System', path: '/design-system', icon: Palette },
  { name: 'Content', path: '/content', icon: FileText },
  { name: 'Timeline', path: '/timeline', icon: Calendar },
  { name: 'Approval Queue', path: '/approval', icon: CheckCircle },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Daily Summary', path: '/daily-summary', icon: FileEdit },
  { name: 'Weekly Summary', path: '/weekly-summary', icon: CalendarDays },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
];

export function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - 240px fixed */}
      <aside className="w-[240px] bg-card border-r border-border flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <h1 className="font-semibold text-lg">AI News Maker</h1>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar - 64px height */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h2 className="font-medium">
              {navigation.find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/editor"
              className="h-9 px-4 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Create Post
            </Link>
            <button className="h-9 px-4 bg-accent text-accent-foreground rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Sparkles className="w-4 h-4" />
              Generate News
            </button>
            <Link
              to="/timeline"
              className="h-9 px-4 border border-border rounded-lg flex items-center gap-2 hover:bg-secondary transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Timeline
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1440px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
