-- Srinatha Yoga School — Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor to create all tables, policies, and functions.

-- ============================================
-- 0. SEED ADMIN USER
-- ============================================
-- NOTE: Admin users are created automatically when they first sign in with Google.
-- After you sign in for the first time, run this command to make yourself admin:
-- UPDATE users SET role = 'admin' WHERE email = 'your-email@gmail.com';
--
-- To find your email after logging in, check the users table or console logs.

-- ============================================
-- 1. USERS TABLE (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  country TEXT,
  google_id TEXT UNIQUE,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, google_id, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'provider_id',
    'student'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. COURSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('online_class', 'online_workshop', 'online_course')),
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  deposit_percent INTEGER DEFAULT 10,
  seat_limit INTEGER,
  seats_booked INTEGER DEFAULT 0,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  zoom_link TEXT,
  media_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. BOOKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  payment_option TEXT CHECK (payment_option IN ('deposit', 'full')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  medical_conditions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. PAYMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  method TEXT CHECK (method IN ('paypal', 'razorpay_card', 'upi', 'bank_transfer')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'failed')),
  transaction_id TEXT,
  invoice_url TEXT,
  payment_type TEXT CHECK (payment_type IN ('deposit', 'balance', 'full')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. BLOG POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  body TEXT,
  image_url TEXT,
  author TEXT,
  category TEXT,
  read_time TEXT,
  seo_title TEXT,
  seo_description TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. CALENDAR EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  is_blocked BOOLEAN DEFAULT FALSE,
  label TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. TESTIMONIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. TEACHERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS teachers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  image_url TEXT,
  specialization TEXT,
  experience_years INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

-- Users: can read own profile, admins can read all
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all users" ON users FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Courses: everyone can read active courses, only admins can write
CREATE POLICY "Anyone can view active courses" ON courses FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admins can manage courses" ON courses FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Bookings: users can view own, admins can view all
CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create bookings" ON bookings FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can view all bookings" ON bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Payments: users can view own, admins can view all
CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM bookings WHERE id = payments.booking_id AND user_id = auth.uid())
);
CREATE POLICY "Admins can view all payments" ON payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Blog: everyone can read published posts, admins can manage
CREATE POLICY "Anyone can read published posts" ON blog_posts FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins can manage blog posts" ON blog_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Calendar: everyone can read, admins can manage
CREATE POLICY "Anyone can view calendar events" ON calendar_events FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage calendar" ON calendar_events FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Testimonials: everyone can read, admins can manage
CREATE POLICY "Anyone can view testimonials" ON testimonials FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- 8. FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-increment seats_booked on confirmed booking
CREATE OR REPLACE FUNCTION increment_seats_booked()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE courses SET seats_booked = seats_booked + 1 WHERE id = NEW.course_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_booking_confirmed
  AFTER INSERT ON bookings
  FOR EACH ROW
  WHEN (NEW.status = 'confirmed')
  EXECUTE FUNCTION increment_seats_booked();

-- ============================================
-- 9. SEED DATA (Sample Courses)
-- ============================================
INSERT INTO courses (title, type, description, price, currency, deposit_percent, seat_limit, seats_booked, start_date, end_date, is_active) VALUES
('Ashtanga Yoga Primary Series', 'online_class', 'Traditional Mysore-style Ashtanga practice with personalized guidance from Dr. Srinatha.', 150.00, 'USD', 10, 30, 12, '2026-04-15 06:00:00+05:30', '2026-06-15 07:30:00+05:30', TRUE),
('Hatha Yoga Foundations', 'online_class', 'Classical Hatha yoga focusing on alignment, breath control, and meditation techniques.', 120.00, 'USD', 10, 25, 8, '2026-04-20 10:00:00+05:30', '2026-07-20 11:00:00+05:30', TRUE),
('Iyengar Alignment Workshop', 'online_workshop', 'Precision-based practice focusing on detail, alignment, and use of props.', 200.00, 'USD', 10, 20, 5, '2026-05-01 09:00:00+05:30', '2026-05-03 12:00:00+05:30', TRUE),
('Vinyasa Flow Course', 'online_course', 'Dynamic flow yoga connecting breath with movement in creative sequences.', 180.00, 'USD', 10, 35, 15, '2026-05-10 18:00:00+05:30', '2026-07-10 19:30:00+05:30', TRUE);

-- ============================================
-- 10. SEED DATA (Sample Testimonials)
-- ============================================
INSERT INTO testimonials (name, location, text, rating, is_featured) VALUES
('Matilda Håkansson', 'Stockholm, Sweden', 'The sessions completely transformed my mindset. Dr. Srinatha''s teaching is rooted in authentic tradition yet incredibly accessible.', 5, TRUE),
('James Mitchell', 'London, UK', 'After 6 months of online classes, my flexibility and strength have improved dramatically. The personalized attention is remarkable.', 5, TRUE),
('Yuki Tanaka', 'Tokyo, Japan', 'Learning Ashtanga from Mysore through online classes seemed impossible, but Dr. Srinatha makes it feel like I''m right there in his shala.', 5, TRUE),
('Sarah Williams', 'New York, USA', 'The workshop on pranayama was a life-changing experience. The breathing techniques have helped me manage anxiety in ways I never thought possible.', 5, FALSE),
('Marco Rossi', 'Milan, Italy', 'I''ve practiced yoga for 10 years across multiple studios worldwide. Nothing compares to the authenticity of Srinatha Yoga School.', 5, FALSE);

-- ============================================
-- 11. SEED DATA (Sample Blog Posts)
-- ============================================
INSERT INTO blog_posts (title, slug, body, image_url, author, category, read_time, seo_title, seo_description, is_published, published_at) VALUES
('The Power of Daily Meditation Practice', 'power-of-daily-meditation', 'In the ancient tradition of yoga, meditation (Dhyana) is considered the seventh limb...', '/images/image-01.jpg', 'Dr. Balasundara Srinatha', 'Meditation', '5 min read', 'Daily Meditation Practice | Srinatha Yoga', 'Discover how daily meditation transforms mental clarity and reduces stress.', TRUE, NOW()),
('Morning Yoga Routines for Beginners', 'morning-yoga-routines-for-beginners', 'There is something magical about practicing yoga in the early morning hours...', '/images/image-02.jpg', 'Sahana P R', 'Yoga', '7 min read', 'Morning Yoga for Beginners | Srinatha Yoga', 'Start your day right with simple yet effective yoga sequences.', TRUE, NOW()),
('Breathing Techniques for Stress Relief', 'breathing-techniques-for-stress-relief', 'Pranayama, or breath control, is one of the most powerful tools in the yogic toolkit...', '/images/image-03.jpg', 'Vinayaka Honnavar', 'Wellness', '6 min read', 'Pranayama for Stress Relief | Srinatha Yoga', 'Learn powerful breathing exercises that instantly calm your nervous system.', TRUE, NOW());

-- ============================================
-- 12. SEED DATA (Calendar Events)
-- ============================================
INSERT INTO calendar_events (course_id, date, label) VALUES
((SELECT id FROM courses WHERE title LIKE 'Ashtanga%'), '2026-04-15', 'Ashtanga Primary Series begins'),
((SELECT id FROM courses WHERE title LIKE 'Hatha%'), '2026-04-20', 'Hatha Yoga Foundations begins'),
((SELECT id FROM courses WHERE title LIKE 'Iyengar%'), '2026-05-01', 'Iyengar Workshop weekend'),
((SELECT id FROM courses WHERE title LIKE 'Vinyasa%'), '2026-05-10', 'Vinyasa Flow begins');
