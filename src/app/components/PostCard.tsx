import { Clock, Edit, Trash2, Calendar } from 'lucide-react';
import { Badge } from './Badge';
import { Link } from 'react-router';

interface PostCardProps {
  id: string;
  title: string;
  time?: string;
  platform: string;
  status: 'draft' | 'scheduled' | 'pending' | 'published' | 'rejected';
  type: 'ai' | 'manual';
  image?: string;
  excerpt?: string;
  onPublish?: () => void;
  onDelete?: () => void;
  compact?: boolean;
}

export function PostCard({
  id,
  title,
  time,
  platform,
  status,
  type,
  image,
  excerpt,
  onPublish,
  onDelete,
  compact = false
}: PostCardProps) {
  if (compact) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 hover:shadow-sm transition-shadow">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={type}>{type.toUpperCase()}</Badge>
              <Badge variant={status}>{status}</Badge>
            </div>
            <h3 className="font-medium mb-1 truncate">{title}</h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{platform}</span>
              {time && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {time}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={`/editor/${id}`}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <Edit className="w-4 h-4" />
            </Link>
            {onPublish && status !== 'published' && (
              <button
                onClick={onPublish}
                className="h-9 px-3 bg-success text-success-foreground rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                Publish
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
      {image && (
        <div className="h-[120px] bg-muted overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={type}>{type.toUpperCase()}</Badge>
          <Badge variant={status}>{status}</Badge>
        </div>

        <h3 className="font-medium mb-2 line-clamp-2">{title}</h3>

        {excerpt && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{excerpt}</p>
        )}

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
          <span>{platform}</span>
          {time && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {time}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onPublish && status !== 'published' && (
            <button
              onClick={onPublish}
              className="h-9 px-4 bg-success text-success-foreground rounded-lg text-sm flex-1 hover:opacity-90 transition-opacity"
            >
              Publish
            </button>
          )}
          <Link
            to={`/editor/${id}`}
            className="h-9 px-4 border border-border rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={onDelete}
            className="h-9 px-4 border border-border rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
