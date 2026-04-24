"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
      const { auth } = await import("@/lib/firebase");
      const result = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(result.user, { displayName: form.name });
      router.push("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");
      const { auth } = await import("@/lib/firebase");
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-100 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-sm sm:max-w-md">

        <div className="text-center mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-sky-500">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-extrabold text-sky-600 tracking-tight">Shopino</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Create your account</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">Join thousands of happy shoppers</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-sky-100/50 border border-sky-100 p-5 sm:p-8">

          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors duration-200 disabled:opacity-60"
          >
            <GoogleIcon />
            <span>{googleLoading ? "Connecting..." : "Continue with Google"}</span>
          </button>

          <div className="flex items-center gap-3 my-5 sm:my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">or sign up with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                 Enter Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
               Enter your  Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                  className="w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  required
                  className="w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 rounded-xl bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white text-sm font-semibold transition-colors duration-200 disabled:opacity-60 mt-1"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs sm:text-sm text-slate-500 mt-5 sm:mt-6">
          Already have an account?
          <Link href="/login" className="text-sky-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}