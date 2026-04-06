export type UserRole = 'student' | 'admin';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'failed';
export type PaymentMethod = 'paypal' | 'razorpay_card' | 'upi' | 'bank_transfer';
export type PaymentType = 'deposit' | 'balance' | 'full';
export type CourseType = 'online_class' | 'online_workshop' | 'online_course';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  country?: string;
  google_id?: string;
  role: UserRole;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  type: CourseType;
  description: string;
  price: number;
  currency: string;
  deposit_percent: number;
  seat_limit?: number;
  seats_booked: number;
  start_date: string;
  end_date?: string;
  zoom_link?: string;
  media_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  course_id: string;
  status: BookingStatus;
  payment_option: 'deposit' | 'full';
  full_name: string;
  email: string;
  phone: string;
  country: string;
  experience_level: string;
  medical_conditions?: string;
  created_at: string;
  course?: Course;
}

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transaction_id?: string;
  invoice_url?: string;
  payment_type: PaymentType;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  image_url?: string;
  seo_title?: string;
  seo_description?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
}

export interface CalendarEvent {
  id: string;
  course_id?: string;
  date: string;
  is_blocked: boolean;
  label?: string;
  created_at: string;
}
