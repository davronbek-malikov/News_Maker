interface BadgeProps {
  variant: 'ai' | 'manual' | 'draft' | 'scheduled' | 'pending' | 'published' | 'rejected';
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  const styles = {
    ai: 'bg-accent/10 text-accent border-accent/20',
    manual: 'bg-muted text-muted-foreground border-border',
    draft: 'bg-muted text-muted-foreground border-border',
    scheduled: 'bg-info/10 text-info border-info/20',
    pending: 'bg-warning/10 text-warning border-warning/20',
    published: 'bg-success/10 text-success border-success/20',
    rejected: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <span className={`inline-flex items-center h-5 px-2 text-xs font-medium border rounded ${styles[variant]}`}>
      {children}
    </span>
  );
}
