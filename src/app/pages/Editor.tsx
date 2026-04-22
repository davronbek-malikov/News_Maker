import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Image, Save, Eye, Calendar, Sparkles } from 'lucide-react';

export function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [title, setTitle] = useState(
    isEditing ? 'Breaking: Tech Giant Announces Major AI Breakthrough' : ''
  );
  const [content, setContent] = useState(
    isEditing
      ? 'A revolutionary development in natural language processing was announced today by leading tech companies. The breakthrough promises to transform how we interact with AI systems, making them more intuitive and capable than ever before.\n\nExperts believe this advancement could accelerate progress in multiple fields, from healthcare to education, fundamentally changing how we solve complex problems.'
      : ''
  );
  const [platform, setPlatform] = useState('twitter');
  const [language, setLanguage] = useState('en');
  const [scheduleDate, setScheduleDate] = useState('2026-04-10');
  const [scheduleTime, setScheduleTime] = useState('09:00');

  const [showComparison, setShowComparison] = useState(false);
  const aiVersion = 'A revolutionary development in natural language processing was announced today...';
  const editedVersion = content;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="h-9 w-9 flex items-center justify-center rounded-lg border border-border hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-2xl font-semibold">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h1>
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-6">
        {/* Main Editor - Left Column (70%) */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full h-10 px-4 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content..."
              rows={10}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>{content.length} characters</span>
              <button className="text-primary hover:underline flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Improve with AI
              </button>
            </div>
          </div>

          {/* Media */}
          <div>
            <label className="block text-sm font-medium mb-2">Media</label>
            <div className="h-[120px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-secondary/50 transition-colors cursor-pointer">
              <Image className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Click to upload image or video</span>
            </div>
          </div>

          {/* AI vs Edited Comparison */}
          {isEditing && (
            <div className="bg-muted/50 border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Version Comparison</h3>
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="text-sm text-primary hover:underline"
                >
                  {showComparison ? 'Hide' : 'Show'} comparison
                </button>
              </div>

              {showComparison && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-2">AI Original</div>
                    <div className="text-sm bg-card border border-border rounded-lg p-3">
                      {aiVersion}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-2">Your Edit</div>
                    <div className="text-sm bg-card border border-border rounded-lg p-3">
                      {editedVersion.substring(0, 100)}...
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Right Column (30%) */}
        <div className="space-y-6">
          {/* Platform */}
          <div>
            <label className="block text-sm font-medium mb-2">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full h-10 px-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook Page</option>
              <option value="facebook-profile">Facebook Profile</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
              <option value="telegram">Telegram Channel</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="youtube-shorts">YouTube Shorts</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full h-10 px-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium mb-2">Schedule</label>
            <div className="space-y-3">
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full h-10 px-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full h-10 px-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="inline-flex items-center h-6 px-2 text-xs bg-muted rounded">
                #technology
              </span>
              <span className="inline-flex items-center h-6 px-2 text-xs bg-muted rounded">
                #AI
              </span>
            </div>
            <input
              type="text"
              placeholder="Add tags..."
              className="w-full h-9 px-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Stats */}
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <div className="text-xs font-medium text-muted-foreground mb-3">Post Info</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span>AI Generated</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span>2 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-warning">Draft</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 bg-card border-t border-border -mx-6 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="h-10 px-4 border border-border rounded-lg hover:bg-secondary transition-colors"
        >
          Cancel
        </button>

        <div className="flex items-center gap-3">
          <button className="h-10 px-4 border border-border rounded-lg flex items-center gap-2 hover:bg-secondary transition-colors">
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button className="h-10 px-4 border border-border rounded-lg flex items-center gap-2 hover:bg-secondary transition-colors">
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button className="h-10 px-4 bg-success text-success-foreground rounded-lg hover:opacity-90 transition-opacity">
            Publish Now
          </button>
          <button className="h-10 px-4 bg-info text-info-foreground rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Calendar className="w-4 h-4" />
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
