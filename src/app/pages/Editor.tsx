import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Image,
  Save,
  Eye,
  Calendar,
  Sparkles,
  WandSparkles,
  Bot,
  PencilLine,
  LoaderCircle,
  KeyRound,
} from 'lucide-react';

const PLATFORM_OPTIONS = [
  { value: 'twitter', label: 'Twitter' },
  { value: 'facebook', label: 'Facebook Page' },
  { value: 'facebook-profile', label: 'Facebook Profile' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'telegram', label: 'Telegram Channel' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'youtube-shorts', label: 'YouTube Shorts' },
];

const LANGUAGE_OPTIONS = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Uzbek', label: 'Uzbek' },
  { value: 'Russian', label: 'Russian' },
];

const TONE_OPTIONS = ['Breaking News', 'Professional', 'Conversational', 'Urgent', 'Analytical'];
const AUDIENCE_OPTIONS = [
  'General readers',
  'Investors and business readers',
  'Tech community',
  'Local audience',
  'Young social audience',
];

type EditorMode = 'manual' | 'ai';

export function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const telegramOnly = true;

  const [title, setTitle] = useState(
    isEditing ? 'Breaking: Tech Giant Announces Major AI Breakthrough' : ''
  );
  const [content, setContent] = useState(
    isEditing
      ? 'A revolutionary development in natural language processing was announced today by leading tech companies. The breakthrough promises to transform how we interact with AI systems, making them more intuitive and capable than ever before.\n\nExperts believe this advancement could accelerate progress in multiple fields, from healthcare to education, fundamentally changing how we solve complex problems.'
      : ''
  );
  const [platform, setPlatform] = useState('telegram');
  const [language, setLanguage] = useState('English');
  const [scheduleDate, setScheduleDate] = useState('2026-04-10');
  const [scheduleTime, setScheduleTime] = useState('09:00');
  const [tagsInput, setTagsInput] = useState('#technology, #AI');

  const [editorMode, setEditorMode] = useState<EditorMode>('ai');
  const [apiKey, setApiKey] = useState('');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Breaking News');
  const [audience, setAudience] = useState('General readers');
  const [keyPoints, setKeyPoints] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiStatus, setAiStatus] = useState('');
  const [aiNotes, setAiNotes] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  const [aiOriginalSnapshot, setAiOriginalSnapshot] = useState('');

  useEffect(() => {
    const savedKey = window.localStorage.getItem('newmaker-openai-api-key');
    const savedMode = window.localStorage.getItem('newmaker-editor-mode');
    if (savedKey) setApiKey(savedKey);
    if (savedMode === 'manual' || savedMode === 'ai') {
      setEditorMode(savedMode);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('newmaker-openai-api-key', apiKey);
  }, [apiKey]);

  useEffect(() => {
    window.localStorage.setItem('newmaker-editor-mode', editorMode);
  }, [editorMode]);

  const tags = useMemo(
    () =>
      tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    [tagsInput]
  );

  const isTelegram = telegramOnly || platform === 'telegram';

  async function runAI(mode: 'generate' | 'polish') {
    if (!window.newmakerDesktop?.generateTelegramPost) {
      setAiStatus('AI tools are available in the desktop app build.');
      return;
    }

    setIsGenerating(true);
    setAiStatus(mode === 'generate' ? 'Generating Telegram draft...' : 'Improving Telegram draft...');

    const result = await window.newmakerDesktop.generateTelegramPost({
      apiKey,
      mode,
      topic,
      title,
      content,
      language,
      tone,
      audience,
      tags,
      keyPoints,
    });

    setIsGenerating(false);
    setAiStatus(result.message);

    if (!result.ok || !result.data) {
      return;
    }

    if (mode === 'polish') {
      setAiOriginalSnapshot(content);
    } else {
      setAiOriginalSnapshot('');
    }

    setTitle(result.data.title);
    setContent(result.data.content);
    setTagsInput(result.data.tags.join(', '));
    setAiNotes(result.data.notes);
  }

  return (
    <div className="space-y-6">
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

      {isTelegram ? (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary">
                <Bot className="w-4 h-4" />
                <span className="text-sm font-medium">Telegram Post Maker</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Switch between manual writing and AI-assisted drafting. AI mode can generate the title,
                content, and tags, or polish what you already wrote.
              </p>
            </div>

            <div className="inline-flex rounded-xl border border-border bg-card p-1">
              <button
                type="button"
                onClick={() => setEditorMode('manual')}
                className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                  editorMode === 'manual'
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Manual Mode
              </button>
              <button
                type="button"
                onClick={() => setEditorMode('ai')}
                className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                  editorMode === 'ai'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                AI Assist Mode
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
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
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => runAI('polish')}
                  disabled={isGenerating || editorMode !== 'ai'}
                  className="text-primary hover:underline flex items-center gap-1 disabled:opacity-50 disabled:no-underline"
                >
                  {isGenerating ? <LoaderCircle className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  Fix grammar and improve
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Media</label>
            <div className="h-[120px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-secondary/50 transition-colors cursor-pointer">
              <Image className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Click to upload image or video</span>
            </div>
          </div>

          {(isEditing || aiOriginalSnapshot) && (
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
                    <div className="text-xs font-medium text-muted-foreground mb-2">Before AI edit</div>
                    <div className="text-sm bg-card border border-border rounded-lg p-3 min-h-28">
                      {aiOriginalSnapshot || 'No earlier AI snapshot yet.'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-2">Current version</div>
                    <div className="text-sm bg-card border border-border rounded-lg p-3 min-h-28">
                      {content || 'Current content will appear here.'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {isTelegram && (
            <div className="rounded-xl border border-primary/20 bg-card p-4 space-y-4">
              <div className="flex items-center gap-2">
                <WandSparkles className="w-4 h-4 text-primary" />
                <h3 className="font-medium">AI Assistant</h3>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">OpenAI API Key</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Paste your OpenAI API key"
                    className="w-full h-10 rounded-lg border border-border bg-card pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Stored locally on this device only. It is used to call the OpenAI Responses API from the desktop app.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Topic / Brief</label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={3}
                  placeholder="Example: write a Telegram post about Nvidia earnings and why AI chip demand keeps rising."
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Key Points</label>
                <textarea
                  value={keyPoints}
                  onChange={(e) => setKeyPoints(e.target.value)}
                  rows={3}
                  placeholder="Paste facts, bullets, names, links, or details the AI must keep."
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-medium">Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full h-10 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {TONE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Audience</label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full h-10 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {AUDIENCE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => runAI('generate')}
                  disabled={isGenerating || editorMode !== 'ai'}
                  className="h-10 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90 disabled:opacity-50"
                >
                  {isGenerating ? 'Working...' : 'Generate full draft'}
                </button>
                <button
                  type="button"
                  onClick={() => runAI('polish')}
                  disabled={isGenerating || editorMode !== 'ai'}
                  className="h-10 rounded-lg border border-border text-sm hover:bg-secondary disabled:opacity-50"
                >
                  Polish existing text
                </button>
              </div>

              {aiStatus ? (
                <div className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm">
                  {aiStatus}
                </div>
              ) : null}

              {aiNotes ? (
                <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-3 text-sm">
                  <div className="font-medium mb-1">AI notes</div>
                  <div className="text-muted-foreground">{aiNotes}</div>
                </div>
              ) : null}

              <div className="rounded-lg border border-dashed border-border px-3 py-3 text-sm text-muted-foreground">
                Todo:
                <div className="mt-2 space-y-1">
                  <div>1. Manual mode for fully hand-written Telegram posts</div>
                  <div>2. AI mode for title, content, and tags generation</div>
                  <div>3. Grammar fixing and polishing for existing drafts</div>
                  <div>4. Desktop-safe OpenAI key handling</div>
                  <div>5. Versioned desktop release for update testing</div>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full h-10 px-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {PLATFORM_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full h-10 px-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

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

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center h-6 px-2 text-xs bg-muted rounded">
                  {tag}
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Add tags, separated by commas..."
              className="w-full h-9 px-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <div className="text-xs font-medium text-muted-foreground mb-3">Post Info</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mode:</span>
                <span>{editorMode === 'ai' ? 'AI Assisted' : 'Manual'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform:</span>
                <span>Telegram Ready</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-warning">Draft</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
