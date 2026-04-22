import { useState } from 'react';
import { Edit2, Calendar, CheckCircle2, TrendingUp } from 'lucide-react';
import { Badge } from '../components/Badge';

export function WeeklySummary() {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(
    `📊 Weekly News Roundup - Week of April 4-10, 2026

🌟 This Week's Highlights:

🌍 Global Affairs:
• Historic climate agreement reached at international summit
• Major diplomatic breakthrough in ongoing trade negotiations
• UN announces new sustainable development initiatives

💼 Business & Economy:
• Tech sector leads market rally with record-breaking quarter
• Cryptocurrency regulation debate intensifies globally
• Major acquisitions reshape the tech landscape

🔬 Science & Technology:
• AI breakthrough promises to revolutionize natural language processing
• New renewable energy technology exceeds efficiency targets
• Space exploration milestones achieved by multiple agencies

⚽ Sports:
• Championship finals deliver unprecedented viewership
• Olympic qualifications see surprising upsets
• Major league transfer window brings blockbuster deals

📈 This Week's Performance:

✅ Published: 163 posts across all platforms
📊 Total Engagement: 34.2K (+12.5% vs last week)
⭐ Top Performing Post: "AI Breakthrough Announcement" (2.4K engagements)
📱 Best Platform: Twitter (45% of total engagement)
⏰ Peak Time: 6:00 PM - 7:00 PM

🎯 Key Insights:
• Evening posts consistently outperform morning content
• Breaking news format generates highest engagement
• LinkedIn business content shows strong growth

Looking ahead to next week with continued momentum!`
  );

  const [selectedPlatforms, setSelectedPlatforms] = useState(['twitter', 'linkedin', 'facebook']);
  const [scheduleDate, setScheduleDate] = useState('2026-04-13');
  const [scheduleTime, setScheduleTime] = useState('18:00');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Weekly Summary</h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive weekly recap and performance analysis
          </p>
        </div>
        <Badge variant="scheduled">Scheduled</Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">Posts This Week</div>
          <div className="text-2xl font-semibold mb-2">163</div>
          <div className="flex items-center gap-1 text-xs text-success">
            <TrendingUp className="w-3 h-3" />
            +8% vs last week
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">Total Engagement</div>
          <div className="text-2xl font-semibold mb-2">34.2K</div>
          <div className="flex items-center gap-1 text-xs text-success">
            <TrendingUp className="w-3 h-3" />
            +12.5% vs last week
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-sm text-muted-foreground mb-1">Avg. Engagement</div>
          <div className="text-2xl font-semibold mb-2">210</div>
          <div className="flex items-center gap-1 text-xs text-success">
            <TrendingUp className="w-3 h-3" />
            +4.2% vs last week
          </div>
        </div>
      </div>

      {/* Edit Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`h-9 px-4 rounded-lg flex items-center gap-2 transition-colors ${
            isEditing
              ? 'bg-primary text-primary-foreground'
              : 'border border-border hover:bg-secondary'
          }`}
        >
          <Edit2 className="w-4 h-4" />
          {isEditing ? 'Editing' : 'Edit'}
        </button>
        {isEditing && (
          <span className="text-sm text-muted-foreground">
            Make changes to the AI-generated summary
          </span>
        )}
      </div>

      {/* Content */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-medium mb-4">Summary Content</h3>
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={24}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
          />
        ) : (
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {content}
          </div>
        )}
      </div>

      {/* Platform Selection */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-medium mb-4">Publish To</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'twitter', name: 'Twitter' },
            { id: 'facebook', name: 'Facebook Page' },
            { id: 'facebook-profile', name: 'Facebook Profile' },
            { id: 'linkedin', name: 'LinkedIn' },
            { id: 'instagram', name: 'Instagram' },
            { id: 'telegram', name: 'Telegram Channel' },
            { id: 'whatsapp', name: 'WhatsApp' },
            { id: 'youtube-shorts', name: 'YouTube Shorts' },
          ].map((platform) => (
            <label
              key={platform.id}
              className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedPlatforms.includes(platform.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPlatforms([...selectedPlatforms, platform.id]);
                  } else {
                    setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform.id));
                  }
                }}
                className="rounded"
              />
              <span className="font-medium">{platform.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-medium mb-4">Schedule</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="w-full h-10 px-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Time</label>
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="w-full h-10 px-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <div className="mt-3 text-sm text-muted-foreground">
          Scheduled for Sunday, April 13 at 6:00 PM
        </div>
      </div>

      {/* AI Info */}
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
        <h3 className="font-medium mb-2 text-accent">AI Generation Info</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Generated:</span>
            <span>April 10 at 5:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Posts analyzed:</span>
            <span>163 posts</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Data sources:</span>
            <span>5 platforms</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Confidence score:</span>
            <span>96%</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <button className="h-10 px-6 border border-border rounded-lg hover:bg-secondary transition-colors">
          Regenerate Summary
        </button>

        <div className="flex items-center gap-3">
          <button className="h-10 px-6 border border-border rounded-lg hover:bg-secondary transition-colors">
            Save Draft
          </button>
          <button className="h-10 px-6 bg-success text-success-foreground rounded-lg flex items-center gap-2 hover:opacity-90">
            <CheckCircle2 className="w-4 h-4" />
            Publish Now
          </button>
          <button className="h-10 px-6 bg-info text-info-foreground rounded-lg flex items-center gap-2 hover:opacity-90">
            <Calendar className="w-4 h-4" />
            Update Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
