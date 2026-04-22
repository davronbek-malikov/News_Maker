import { useState } from 'react';
import { Plus, MoreVertical, Copy, Repeat, Calendar as CalendarIcon, GripVertical } from 'lucide-react';
import { Badge } from '../components/Badge';

interface TimeSlot {
  id: string;
  name: string;
  time?: string;
  repeat: boolean;
  posts: Post[];
}

interface Post {
  id: string;
  title: string;
  platform: string;
  status: 'draft' | 'scheduled' | 'pending' | 'published';
  type: 'ai' | 'manual';
}

const initialSlots: TimeSlot[] = [
  {
    id: 'slot-1',
    name: 'Morning News',
    time: '08:00 AM',
    repeat: true,
    posts: [
      {
        id: 'p1',
        title: 'Daily Market Opening Report',
        platform: 'LinkedIn',
        status: 'scheduled',
        type: 'ai'
      }
    ]
  },
  {
    id: 'slot-2',
    name: 'Midday Update',
    time: '12:00 PM',
    repeat: true,
    posts: [
      {
        id: 'p2',
        title: 'Breaking Tech News',
        platform: 'Twitter',
        status: 'scheduled',
        type: 'ai'
      },
      {
        id: 'p3',
        title: 'Industry Insights',
        platform: 'LinkedIn',
        status: 'draft',
        type: 'manual'
      }
    ]
  },
  {
    id: 'slot-3',
    name: 'Evening Roundup',
    time: '06:00 PM',
    repeat: true,
    posts: []
  },
  {
    id: 'slot-4',
    name: 'Weekend Special',
    time: '10:00 AM',
    repeat: false,
    posts: [
      {
        id: 'p4',
        title: 'Weekend Feature Story',
        platform: 'Facebook',
        status: 'pending',
        type: 'ai'
      }
    ]
  }
];

export function Timeline() {
  const [slots, setSlots] = useState<TimeSlot[]>(initialSlots);
  const [selectedDate, setSelectedDate] = useState('2026-04-10');

  const addSlot = () => {
    const newSlot: TimeSlot = {
      id: `slot-${Date.now()}`,
      name: 'New Slot',
      repeat: false,
      posts: []
    };
    setSlots([...slots, newSlot]);
  };

  const duplicateSlot = (slotId: string) => {
    const slot = slots.find(s => s.id === slotId);
    if (slot) {
      const newSlot = {
        ...slot,
        id: `slot-${Date.now()}`,
        name: `${slot.name} (Copy)`
      };
      setSlots([...slots, newSlot]);
    }
  };

  const deleteSlot = (slotId: string) => {
    setSlots(slots.filter(s => s.id !== slotId));
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-muted-foreground" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-9 px-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {slots.length} slots • {slots.reduce((acc, slot) => acc + slot.posts.length, 0)} posts
          </div>
        </div>

        <button
          onClick={addSlot}
          className="h-9 px-4 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Add Slot
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {slots.map((slot) => (
          <div key={slot.id} className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Slot Header */}
            <div className="flex items-center gap-3 p-4 bg-muted/30 border-b border-border">
              <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />

              <input
                type="text"
                value={slot.name}
                onChange={(e) => {
                  setSlots(slots.map(s =>
                    s.id === slot.id ? { ...s, name: e.target.value } : s
                  ));
                }}
                className="flex-1 bg-transparent border-none outline-none font-medium"
              />

              <input
                type="time"
                value={slot.time || ''}
                onChange={(e) => {
                  setSlots(slots.map(s =>
                    s.id === slot.id ? { ...s, time: e.target.value } : s
                  ));
                }}
                className="h-8 px-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />

              <button
                onClick={() => {
                  setSlots(slots.map(s =>
                    s.id === slot.id ? { ...s, repeat: !s.repeat } : s
                  ));
                }}
                className={`h-8 px-3 rounded-lg flex items-center gap-2 text-sm transition-colors ${
                  slot.repeat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border hover:bg-secondary'
                }`}
              >
                <Repeat className="w-4 h-4" />
                {slot.repeat ? 'Daily' : 'Once'}
              </button>

              <div className="relative">
                <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-secondary">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Posts in Slot */}
            <div className="p-4 space-y-3">
              {slot.posts.length === 0 ? (
                <div className="h-16 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-sm text-muted-foreground">
                  Drop posts here or click to add
                </div>
              ) : (
                slot.posts.map((post) => (
                  <div
                    key={post.id}
                    className="h-[60px] bg-background border border-border rounded-lg p-3 flex items-center gap-3 hover:shadow-sm transition-shadow cursor-move"
                  >
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={post.type}>{post.type.toUpperCase()}</Badge>
                        <Badge variant={post.status}>{post.status}</Badge>
                      </div>
                      <div className="text-sm font-medium truncate">{post.title}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{post.platform}</div>
                  </div>
                ))
              )}

              <button className="h-9 w-full border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors">
                + Add Post to Slot
              </button>
            </div>

            {/* Slot Actions */}
            <div className="flex items-center gap-2 p-3 bg-muted/30 border-t border-border">
              <button
                onClick={() => duplicateSlot(slot.id)}
                className="h-8 px-3 border border-border rounded-lg text-sm flex items-center gap-2 hover:bg-secondary transition-colors"
              >
                <Copy className="w-3 h-3" />
                Duplicate
              </button>
              <button
                onClick={() => deleteSlot(slot.id)}
                className="h-8 px-3 border border-border rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                Delete Slot
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="bg-muted/50 border border-border rounded-xl p-6">
        <h3 className="font-medium mb-3">Timeline Features</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Drag and drop posts between slots to reschedule</li>
          <li>• Toggle "Daily" to repeat slots automatically each day</li>
          <li>• Set custom times for each slot or leave blank for flexible scheduling</li>
          <li>• Duplicate slots to create similar posting schedules quickly</li>
          <li>• Use date picker to view and manage different days</li>
        </ul>
      </div>
    </div>
  );
}
