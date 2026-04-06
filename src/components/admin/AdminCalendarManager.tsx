import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Course } from '../../lib/types';

interface CalendarEvent {
  id: string;
  course_id: string | null;
  date: string;
  is_blocked: boolean;
  label: string;
  created_at: string;
  course?: Course;
}

interface Props {
  onSaved?: () => void;
}

export default function AdminCalendarManager({ onSaved }: Props) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    course_id: '',
    date: '',
    is_blocked: false,
    label: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, coursesRes] = await Promise.all([
        supabase.from('calendar_events').select('*, course:courses(*)').order('date', { ascending: true }),
        supabase.from('courses').select('*').eq('is_active', true).order('title'),
      ]);
      
      setEvents(eventsRes.data || []);
      setCourses(coursesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const payload = {
        course_id: formData.course_id || null,
        date: formData.date,
        is_blocked: formData.is_blocked,
        label: formData.label,
      };
      
      if (editingEvent) {
        const { error } = await supabase
          .from('calendar_events')
          .update(payload)
          .eq('id', editingEvent.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('calendar_events')
          .insert([payload]);
        
        if (error) throw error;
      }
      
      setShowModal(false);
      resetForm();
      fetchData();
      onSaved?.();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const { error } = await supabase
        .from('calendar_events')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchData();
      onSaved?.();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const openEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormData({
      course_id: event.course_id || '',
      date: event.date,
      is_blocked: event.is_blocked,
      label: event.label || '',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingEvent(null);
    setFormData({
      course_id: '',
      date: '',
      is_blocked: false,
      label: '',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Manage Calendar Events</h2>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-all flex items-center gap-2"
        >
          <i className="ri-add-line"></i> Add Event
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Date</th>
              <th className="text-left px-4 py-3 font-medium">Label</th>
              <th className="text-left px-4 py-3 font-medium">Course</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-4 py-3 text-gray-700">{event.label || '-'}</td>
                <td className="px-4 py-3 text-gray-600">
                  {event.course?.title || '-'}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${event.is_blocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {event.is_blocked ? 'Blocked' : 'Available'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => openEdit(event)}
                      className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {events.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <i className="ri-calendar-event-line text-4xl mb-3 block"></i>
          <p>No events yet. Add your first calendar event!</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold">{editingEvent ? 'Edit Event' : 'Add Calendar Event'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 outline-none"
                  placeholder="e.g., Workshop begins"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Related Course</label>
                <select
                  value={formData.course_id}
                  onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 outline-none"
                >
                  <option value="">None</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_blocked"
                  checked={formData.is_blocked}
                  onChange={(e) => setFormData({ ...formData, is_blocked: e.target.checked })}
                  className="w-4 h-4 text-teal-500 rounded focus:ring-teal-500"
                />
                <label htmlFor="is_blocked" className="text-sm text-gray-700">
                  Block this date (no bookings allowed)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingEvent ? 'Update' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
