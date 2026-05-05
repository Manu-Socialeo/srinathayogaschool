import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Student Login | Srinatha Yoga Shala",
  description: "Login to access your yoga courses, track progress, and join live sessions.",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E5E5] p-8">
          <Link href="/" className="flex items-center justify-center gap-3 mb-8">
            <Image src="/images/logo.png" alt="Srinatha Yoga Shala" width={48} height={48} className="h-12 w-auto" />
            <span className="font-serif text-xl font-semibold text-[#264020]">Srinatha Yoga Shala</span>
          </Link>

          <h1 className="font-serif text-2xl text-[#264020] text-center mb-2">Welcome Back</h1>
          <p className="text-[#264020]/60 text-center mb-8">Login to continue your yoga journey</p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#264020] mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl text-[#264020] focus:outline-none focus:border-[#264020]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#264020] mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-[#E5E5E5] rounded-xl text-[#264020] focus:outline-none focus:border-[#264020]"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[#E5E5E5] text-[#264020] focus:ring-[#264020]" />
                <span className="text-sm text-[#264020]/60">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-[#264020] hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#264020] hover:bg-[#3a5a30] text-white py-3 rounded-xl font-medium transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#264020]/60 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="text-[#264020] font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E5E5E5] text-center">
            <Link href="/" className="text-[#264020]/60 text-sm hover:text-[#264020]">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}