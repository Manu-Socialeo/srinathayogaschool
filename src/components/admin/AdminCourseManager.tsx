import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Course } from '../../lib/types';

interface Props {
  onSaved?: () => void;
}

export default function AdminCourseManager({ onSaved }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    type: 'online_class' as 'online_class' | 'online_workshop' | 'online_course',
    description: '',
    price: 0,
    currency: 'USD',
    deposit_percent: 10,
    seat_limit: 30,
    seats_booked: 0,
    start_date: '',
    end_date: '',
    media_url: '',
    is_active: true,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      if (editingCourse) {
        const { error } = await supabase
          .from('courses')
          .update(formData)
          .eq('id', editingCourse.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('courses')
          .insert([formData]);
        
        if (error) throw error;
      }
      
      setShowModal(false);
      resetForm();
      fetchCourses();
      onSaved?.();
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to save course');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchCourses();
      onSaved?.();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const openEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      type: course.type,
      description: course.description || '',
      price: course.price,
      currency: course.currency,
      deposit_percent: course.deposit_percent,
      seat_limit: course.seat_limit || 30,
      seats_booked: course.seats_booked,
      start_date: course.start_date ? course.start_date.split('T')[0] : '',
      end_date: course.end_date ? course.end_date.split('T')[0] : '',
      media_url: course.media_url || '',
      is_active: course.is_active,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      type: 'online_class',
      description: '',
      price: 0,
      currency: 'USD',
      deposit_percent: 10,
      seat_limit: 30,
      seats_booked: 0,
      start_date: '',
      end_date: '',
      media_url: '',
      is_active: true,
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
        <h2 className="text-xl font-bold">Manage Courses</h2>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-all flex items-center gap-2"
        >
          <i className="ri-add-line"></i> Add Course
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-500 capitalize">{course.type.replace('_', ' ')}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${course.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {course.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <span className="font-bold text-teal-600">${course.price}</span>
              <span>{course.seats_booked}/{course.seat_limit} seats</span>
              {course.start_date && (
                <span>{new Date(course.start_date).toLocaleDateString()}</span>
              )}
            </div>
            
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">{course.description}</p>
            
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(course)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <i className="ri-edit-line mr-1"></i> Edit
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                className="py-2 px-3 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-all"
              >
                <i className="ri-delete-bin-line"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <i className="ri-book-open-line text-4xl mb-3 block"></i>
          <p>No courses yet. Add your first course!</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-lg font-bold">{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 outline-none"
                  placeholder="e.g., Ashtanga Yoga Primary Series"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 outline-none"
                  >
                    <option value="online_class">Online Class</option>
                    <option value="online_workshop">Online Workshop</option>
                    <option value="online_course">Online Course</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 outline-none"
                  placeholder="Course description..."
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deposit %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.deposit_percent}
                    onChange={(e) => setFormData({ ...formData, deposit_percent: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seat Limit</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.seat_limit}
                    onChange={(e) => setFormData({ ...formData, seat_limit: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seats Booked</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.seats_booked}
                    onChange={(e) => setFormData({ ...formData, seats_booked: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.media_url}
                  onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-teal-500 outline-none"
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-teal-500 rounded focus:ring-teal-500"
                />
                <label htmlFor="is_active" className="text-sm text-gray-700">Active (visible on site)</label>
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
                  {saving ? 'Saving...' : editingCourse ? 'Update Course' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
