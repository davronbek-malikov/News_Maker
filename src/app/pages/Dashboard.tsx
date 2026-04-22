import { PostCard } from '../components/PostCard';
import { Badge } from '../components/Badge';
import { TrendingUp, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router';

const todayPosts = [
  {
    id: '1',
    title: 'Breaking: Tech Giant Announces Major AI Breakthrough',
    time: '09:00 AM',
    platform: 'Twitter',
    status: 'scheduled' as const,
    type: 'ai' as const,
    excerpt: 'Revolutionary development in natural language processing announced today.'
  },
  {
    id: '2',
    title: 'Market Analysis: Stock Prices Surge After Fed Decision',
    time: '12:00 PM',
    platform: 'LinkedIn',
    status: 'draft' as const,
    type: 'ai' as const,
    excerpt: 'Financial markets respond positively to latest policy changes.'
  },
  {
    id: '3',
    title: 'Sports Update: Championship Finals Preview',
    time: '06:00 PM',
    platform: 'Facebook',
    status: 'published' as const,
    type: 'manual' as const,
    excerpt: 'A comprehensive look at tomorrow\'s championship match.'
  },
];

const pendingApprovals = [
  {
    id: '4',
    title: 'Climate Summit: World Leaders Gather for Critical Talks',
    platform: 'Telegram Channel',
    type: 'ai' as const,
    time: '2 hours ago'
  },
  {
    id: '5',
    title: 'Tech Review: New Smartphone Launch Analysis',
    platform: 'YouTube Shorts',
    type: 'ai' as const,
    time: '4 hours ago'
  },
  {
    id: '6',
    title: 'Breaking News Update: Market Analysis',
    platform: 'WhatsApp',
    type: 'ai' as const,
    time: '5 hours ago'
  },
];

const aiSuggestions = [
  {
    topic: 'AI regulation debate intensifies',
    reason: 'High engagement on similar topics this week',
    trending: true
  },
  {
    topic: 'Renewable energy breakthrough announced',
    reason: 'Trending in tech & science communities',
    trending: true
  },
  {
    topic: 'Major sports transfer confirmed',
    reason: 'Peak audience time approaching',
    trending: false
  },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Analytics Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Published Today</span>
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          <div className="text-3xl font-semibold mb-1">12</div>
          <div className="text-xs text-success">+3 from yesterday</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Pending Approval</span>
            <Clock className="w-5 h-5 text-warning" />
          </div>
          <div className="text-3xl font-semibold mb-1">8</div>
          <div className="text-xs text-muted-foreground">Awaiting review</div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg. Engagement</span>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div className="text-3xl font-semibold mb-1">4.2K</div>
          <div className="text-xs text-success">+12% this week</div>
        </div>
      </div>

      {/* Today's Posts */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Today's Posts</h2>
          <Link to="/content" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {todayPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </section>

      {/* Pending Approval */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Pending Approval</h2>
          <Link to="/approval" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {pendingApprovals.map((post) => (
            <div
              key={post.id}
              className="bg-card border border-border rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={post.type}>{post.type.toUpperCase()}</Badge>
                  <Badge variant="pending">PENDING</Badge>
                </div>
                <h3 className="font-medium mb-1">{post.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{post.platform}</span>
                  <span>{post.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-9 px-4 bg-success text-success-foreground rounded-lg text-sm hover:opacity-90">
                  Approve
                </button>
                <button className="h-9 px-4 bg-destructive text-destructive-foreground rounded-lg text-sm hover:opacity-90">
                  Reject
                </button>
                <Link
                  to={`/editor/${post.id}`}
                  className="h-9 px-4 bg-warning text-warning-foreground rounded-lg text-sm hover:opacity-90"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Suggestions */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">AI Suggestions</h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {aiSuggestions.map((suggestion, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6">
              {suggestion.trending && (
                <div className="flex items-center gap-1 text-xs text-primary mb-3">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </div>
              )}
              <h3 className="font-medium mb-2">{suggestion.topic}</h3>
              <p className="text-sm text-muted-foreground mb-4">{suggestion.reason}</p>
              <button className="h-9 w-full bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90">
                Create Post
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Weakness Insights */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Insights & Recommendations</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-card border border-destructive/20 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
              <div>
                <h3 className="font-medium mb-2">Low Engagement on Twitter</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Posts between 2-4 PM show 40% lower engagement than optimal times
                </p>
                <button className="text-sm text-primary hover:underline">
                  View analytics →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-card border border-warning/20 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <h3 className="font-medium mb-2">Inconsistent Posting Schedule</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Weekend posts are 50% less frequent than weekdays
                </p>
                <button className="text-sm text-primary hover:underline">
                  Adjust timeline →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Status */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Summary Reports</h2>
        <div className="grid grid-cols-2 gap-6">
          <Link
            to="/daily-summary"
            className="bg-card border border-border rounded-xl p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Daily Summary</h3>
              <Badge variant="draft">Draft</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              AI-generated summary for today's content ready for review
            </p>
            <div className="text-sm text-primary">Review & publish →</div>
          </Link>

          <Link
            to="/weekly-summary"
            className="bg-card border border-border rounded-xl p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Weekly Summary</h3>
              <Badge variant="scheduled">Scheduled</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Weekly recap scheduled for Sunday at 6:00 PM
            </p>
            <div className="text-sm text-primary">View details →</div>
          </Link>
        </div>
      </section>
    </div>
  );
}
