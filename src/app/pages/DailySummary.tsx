import { useState } from 'react';
import { Edit2, Calendar, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/Badge';

export function DailySummary() {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(
    `📊 Daily News Summary - April 10, 2026

🌍 Top Stories Today:
• Climate Summit reaches historic agreement with 150+ nations committing to ambitious emissions targets
• Tech industry announces major AI breakthrough in natural language processing
• Stock markets surge following Federal Reserve policy decision

💼 Business & Tech:
• Major smartphone manufacturer launches flagship device with innovative features
• Economic indicators show positive trends across multiple sectors
• Cryptocurrency markets see significant volatility amid regulatory discussions

⚽ Sports:
• Championship finals preview: Expert analysis and predictions
• Transfer season heats up with major announcements expected
• Olympic preparations continue with key qualifications completed

📈 Today's Performance:
• 12 posts published across all platforms
• 8.2% average engagement rate (+2.1% vs yesterday)
• Peak engagement at 6:00 PM

Stay informed with tomorrow's summary!`
  );

  const [selectedPlatforms, setSelectedPlatforms] = useState(['twitter', 'linkedin']);
  const [scheduleDate, setScheduleDate] = useState('2026-04-10');
  const [scheduleTime, setScheduleTime] = useState('20:00');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Daily Summary</h1>
          <p className="text-sm text-muted-foreground">
            AI-generated daily recap of news and performance
          </p>
        </div>
        <Badge variant="draft">Draft</Badge>
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
            rows={18}
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
      </div>

      {/* AI Info */}
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
        <h3 className="font-medium mb-2 text-accent">AI Generation Info</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Generated:</span>
            <span>Today at 7:30 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sources analyzed:</span>
            <span>42 articles</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Confidence score:</span>
            <span>94%</span>
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
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
