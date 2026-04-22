import { useState } from 'react';
import { PostCard } from '../components/PostCard';
import { Search, Filter } from 'lucide-react';

const mockPosts = [
  {
    id: '1',
    title: 'Breaking: Tech Giant Announces Major AI Breakthrough',
    time: '09:00 AM',
    platform: 'Twitter',
    status: 'scheduled' as const,
    type: 'ai' as const,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    excerpt: 'Revolutionary development in natural language processing announced today.'
  },
  {
    id: '2',
    title: 'Market Analysis: Stock Prices Surge After Fed Decision',
    time: '12:00 PM',
    platform: 'LinkedIn',
    status: 'draft' as const,
    type: 'ai' as const,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
    excerpt: 'Financial markets respond positively to latest policy changes.'
  },
  {
    id: '3',
    title: 'Sports Update: Championship Finals Preview',
    time: '06:00 PM',
    platform: 'Facebook',
    status: 'published' as const,
    type: 'manual' as const,
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
    excerpt: 'A comprehensive look at tomorrow\'s championship match.'
  },
  {
    id: '4',
    title: 'Climate Summit: World Leaders Gather for Critical Talks',
    platform: 'Telegram Channel',
    status: 'pending' as const,
    type: 'ai' as const,
    image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400&h=300&fit=crop',
    excerpt: 'Global climate conference begins with ambitious goals.'
  },
  {
    id: '5',
    title: 'Tech Review: New Smartphone Launch Analysis',
    platform: 'YouTube Shorts',
    status: 'draft' as const,
    type: 'ai' as const,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    excerpt: 'Detailed breakdown of the latest flagship device features.'
  },
  {
    id: '6',
    title: 'Entertainment: Award Season Predictions',
    platform: 'Facebook Profile',
    status: 'published' as const,
    type: 'manual' as const,
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=300&fit=crop',
    excerpt: 'Our expert picks for this year\'s major awards.'
  },
  {
    id: '7',
    title: 'Breaking News: Important Update for Community',
    platform: 'WhatsApp',
    status: 'scheduled' as const,
    time: '03:00 PM',
    type: 'ai' as const,
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop',
    excerpt: 'Critical information for our WhatsApp subscribers.'
  },
];

export function Content() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-9 px-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="pending">Pending</option>
            <option value="published">Published</option>
            <option value="rejected">Rejected</option>
          </select>

          <select className="h-9 px-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="all">All Platforms</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook Page</option>
            <option value="facebook-profile">Facebook Profile</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
            <option value="telegram">Telegram Channel</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="youtube-shorts">YouTube Shorts</option>
          </select>

          <select className="h-9 px-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="all">All Types</option>
            <option value="ai">AI Generated</option>
            <option value="manual">Manual</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 text-sm">
        <div>
          <span className="text-muted-foreground">Total:</span>{' '}
          <span className="font-medium">{mockPosts.length}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Published:</span>{' '}
          <span className="font-medium text-success">
            {mockPosts.filter(p => p.status === 'published').length}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Scheduled:</span>{' '}
          <span className="font-medium text-info">
            {mockPosts.filter(p => p.status === 'scheduled').length}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Pending:</span>{' '}
          <span className="font-medium text-warning">
            {mockPosts.filter(p => p.status === 'pending').length}
          </span>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-6">
        {mockPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
