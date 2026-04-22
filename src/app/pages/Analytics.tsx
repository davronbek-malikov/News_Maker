import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const performanceData = [
  { name: 'Mon', views: 4200, engagement: 850 },
  { name: 'Tue', views: 5100, engagement: 1020 },
  { name: 'Wed', views: 4800, engagement: 960 },
  { name: 'Thu', views: 6200, engagement: 1240 },
  { name: 'Fri', views: 5800, engagement: 1160 },
  { name: 'Sat', views: 3900, engagement: 780 },
  { name: 'Sun', views: 4100, engagement: 820 },
];

const platformData = [
  { name: 'Twitter', value: 22, color: '#3b82f6' },
  { name: 'LinkedIn', value: 18, color: '#8b5cf6' },
  { name: 'Facebook Page', value: 12, color: '#10b981' },
  { name: 'Instagram', value: 10, color: '#f59e0b' },
  { name: 'Telegram', value: 15, color: '#06b6d4' },
  { name: 'WhatsApp', value: 13, color: '#14b8a6' },
  { name: 'YouTube Shorts', value: 10, color: '#ef4444' },
];

const bestTimeData = [
  { hour: '6 AM', engagement: 120 },
  { hour: '9 AM', engagement: 380 },
  { hour: '12 PM', engagement: 520 },
  { hour: '3 PM', engagement: 290 },
  { hour: '6 PM', engagement: 640 },
  { hour: '9 PM', engagement: 410 },
];

const contentPerformance = [
  { type: 'Breaking News', avgEngagement: 1250, posts: 45 },
  { type: 'Analysis', avgEngagement: 980, posts: 32 },
  { type: 'Updates', avgEngagement: 750, posts: 58 },
  { type: 'Opinion', avgEngagement: 620, posts: 28 },
];

export function Analytics() {
  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">Total Views</div>
          <div className="text-2xl font-semibold mb-2">34.2K</div>
          <div className="flex items-center gap-1 text-xs text-success">
            <TrendingUp className="w-3 h-3" />
            +12.5% vs last week
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">Engagement Rate</div>
          <div className="text-2xl font-semibold mb-2">8.2%</div>
          <div className="flex items-center gap-1 text-xs text-success">
            <TrendingUp className="w-3 h-3" />
            +2.1% vs last week
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">Posts Published</div>
          <div className="text-2xl font-semibold mb-2">163</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            +5 vs last week
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">AI Efficiency</div>
          <div className="text-2xl font-semibold mb-2">78%</div>
          <div className="flex items-center gap-1 text-xs text-destructive">
            <TrendingDown className="w-3 h-3" />
            -3% vs last week
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="name" stroke="#737373" fontSize={12} />
                <YAxis stroke="#737373" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#4f46e5" strokeWidth={2} />
                <Line type="monotone" dataKey="engagement" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              Views
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full" />
              Engagement
            </div>
          </div>
        </div>
      </section>

      {/* Platform & Time Analysis */}
      <div className="grid grid-cols-2 gap-6">
        {/* Platform Distribution */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Platform Distribution</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {platformData.map((platform) => (
              <div key={platform.name} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: platform.color }} />
                <span className="text-muted-foreground truncate">{platform.name}</span>
                <span className="font-medium ml-auto">{platform.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Time to Post */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Best Time to Post</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bestTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="hour" stroke="#737373" fontSize={12} />
                <YAxis stroke="#737373" fontSize={12} />
                <Tooltip />
                <Bar dataKey="engagement" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Peak engagement: 6:00 PM - 7:00 PM
          </div>
        </div>
      </div>

      {/* Content Performance */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Content Performance by Type</h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Content Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Posts</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Avg. Engagement</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contentPerformance.map((item, index) => (
                <tr key={index} className="hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium">{item.type}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.posts}</td>
                  <td className="px-6 py-4 font-medium">{item.avgEngagement.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">+{Math.floor(Math.random() * 15)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AI vs Manual */}
      <section>
        <h2 className="text-xl font-semibold mb-4">AI vs Manual Performance</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">AI Generated</h3>
              <span className="text-sm text-muted-foreground">124 posts</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Avg. Engagement</span>
                  <span className="font-medium">1,180</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Approval Rate</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Manual</h3>
              <span className="text-sm text-muted-foreground">39 posts</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Avg. Engagement</span>
                  <span className="font-medium">1,420</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Time Investment</span>
                  <span className="font-medium">High</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-warning rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
        <div className="space-y-3">
          <div className="bg-card border border-warning/20 rounded-xl p-6 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">Weak Performance: Twitter Afternoon Slot</h3>
              <p className="text-sm text-muted-foreground">
                Posts published between 2-4 PM on Twitter show 35% lower engagement. Consider rescheduling to peak hours.
              </p>
            </div>
          </div>

          <div className="bg-card border border-warning/20 rounded-xl p-6 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">Content Gap: Weekend Coverage</h3>
              <p className="text-sm text-muted-foreground">
                Weekend posts are 50% less frequent. Consider adding more scheduled content for Saturday and Sunday.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
