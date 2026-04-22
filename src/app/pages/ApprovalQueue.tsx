import { Badge } from '../components/Badge';
import { Clock, CheckCircle2, XCircle, Edit, Calendar } from 'lucide-react';
import { Link } from 'react-router';

const pendingPosts = [
  {
    id: '1',
    title: 'Breaking: Major Climate Agreement Reached at Global Summit',
    preview: 'World leaders have agreed to ambitious new targets for reducing carbon emissions by 2030. The historic agreement includes commitments from over 150 countries...',
    platform: 'Twitter',
    time: '2 hours ago',
    type: 'ai' as const,
    reason: 'High engagement potential based on recent climate topics',
    suggestedTime: '2:00 PM'
  },
  {
    id: '2',
    title: 'Tech Review: Analyzing the Latest Smartphone Features',
    preview: 'The new flagship device brings several innovative features to the market, including advanced camera capabilities and improved battery life...',
    platform: 'LinkedIn',
    time: '4 hours ago',
    type: 'ai' as const,
    reason: 'Trending in tech community, optimal posting window',
    suggestedTime: '10:00 AM'
  },
  {
    id: '3',
    title: 'Sports: Championship Preview and Expert Predictions',
    preview: 'As the championship approaches, we analyze the key matchups and provide expert insights on what to expect from this highly anticipated event...',
    platform: 'Facebook Profile',
    time: '6 hours ago',
    type: 'ai' as const,
    reason: 'Sports audience peak time approaching',
    suggestedTime: '6:00 PM'
  },
  {
    id: '4',
    title: 'Market Analysis: Economic Indicators Show Positive Trends',
    preview: 'Recent data suggests strong economic growth in several key sectors, with analysts expressing optimism about the coming quarter...',
    platform: 'LinkedIn',
    time: '8 hours ago',
    type: 'ai' as const,
    reason: 'Business hours engagement optimization',
    suggestedTime: '9:00 AM'
  },
  {
    id: '5',
    title: 'Quick Update: Breaking News Alert',
    preview: 'Important development just announced - stay informed with this critical update for our community members...',
    platform: 'Telegram Channel',
    time: '1 hour ago',
    type: 'ai' as const,
    reason: 'High urgency news for Telegram subscribers',
    suggestedTime: 'Immediately'
  },
  {
    id: '6',
    title: 'Short Video: Tech Product Showcase',
    preview: '30-second showcase of the latest tech innovation that\'s taking the market by storm...',
    platform: 'YouTube Shorts',
    time: '3 hours ago',
    type: 'ai' as const,
    reason: 'Video content optimized for short-form platform',
    suggestedTime: '5:00 PM'
  },
];

export function ApprovalQueue() {
  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-2xl font-semibold">{pendingPosts.length}</div>
            <div className="text-sm text-muted-foreground">Pending Approval</div>
          </div>
          <div className="h-10 w-px bg-border" />
          <div>
            <div className="text-sm text-muted-foreground">Oldest pending</div>
            <div className="text-sm font-medium">8 hours ago</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-9 px-4 border border-border rounded-lg hover:bg-secondary transition-colors">
            Sort by: Newest
          </button>
          <button className="h-9 px-4 bg-success text-success-foreground rounded-lg hover:opacity-90 transition-opacity">
            Approve All
          </button>
          <button className="h-9 px-4 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity">
            Reject All
          </button>
        </div>
      </div>

      {/* Pending Posts */}
      <div className="space-y-4">
        {pendingPosts.map((post) => (
          <div
            key={post.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-sm transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start gap-6">
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={post.type}>{post.type.toUpperCase()}</Badge>
                    <Badge variant="pending">PENDING</Badge>
                    <span className="text-xs text-muted-foreground">{post.platform}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.time}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.preview}
                  </p>

                  {/* AI Reason */}
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-4">
                    <div className="text-xs font-medium text-accent mb-1">AI Recommendation</div>
                    <div className="text-sm">{post.reason}</div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      Suggested time: {post.suggestedTime}
                    </div>
                  </div>
                </div>

                {/* Preview Image */}
                <div className="w-48 h-32 bg-muted rounded-lg flex-shrink-0" />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                <button className="h-9 px-6 bg-success text-success-foreground rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <CheckCircle2 className="w-4 h-4" />
                  Approve
                </button>

                <button className="h-9 px-6 bg-destructive text-destructive-foreground rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>

                <Link
                  to={`/editor/${post.id}`}
                  className="h-9 px-6 bg-warning text-warning-foreground rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Link>

                <button className="h-9 px-6 bg-info text-info-foreground rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <Calendar className="w-4 h-4" />
                  Schedule
                </button>

                <div className="flex-1" />

                <button className="text-sm text-primary hover:underline">
                  View full details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (shown when no pending posts) */}
      {pendingPosts.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
          <h3 className="font-medium text-lg mb-2">All caught up!</h3>
          <p className="text-sm text-muted-foreground">
            No posts pending approval at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
