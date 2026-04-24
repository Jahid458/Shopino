/* eslint-disable @next/next/no-img-element */
"use client";

import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PackagePlus, Loader2, CheckCircle, X, Tag, AlignLeft, DollarSign, Calendar, ImageIcon ,AlertCircle} from "lucide-react";

const categories = ["Fashion", "Electronics", "Home", "Lifestyle"];
const priorities = ["Low", "Medium", "High"];

const initialForm = {
  title: "",
  fullDescription: "",
  price: "",
  category: "Fashion",
  priority: "Medium",
  date: "",
  imageUrl: "",
};

export default function AddProductPage() {
  const { user , loading } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [loading2, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [error, setError] = useState("");


    useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading || !user) return null;

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) { setError("Title is required."); return}
    
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          createdBy: user?.email,
        }),
      });

      if (!res.ok) throw new Error("Failed to add product.");

      setForm(initialForm);
      showToast("Product added successfully! 🎉", "success");
    } catch (err) {
      showToast(err.message || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-linear-to-br from-sky-50 via-white to-sky-100 py-10 px-4 sm:px-6">

      {toast.show && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-200 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg text-sm font-medium transition-all duration-300 ${
          toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          {toast.type === "success"
            ? <CheckCircle className="h-4 w-4 shrink-0" />
            : <AlertCircle className="h-4 w-4 shrink-0" />
          }
          {toast.message}
        </div>
      )}

      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500">
              <PackagePlus className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Add Product</h1>
          </div>
          <p className="text-slate-500 text-sm sm:text-base">
            List a new product in the Shopino marketplace.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-3 px-4 py-3 mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-sky-100 shadow-lg shadow-sky-100/40 p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Title <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="e.g. Wireless Headphones"
                  required
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Description
              </label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                <textarea
                  value={form.fullDescription}
                  onChange={(e) => update("fullDescription", e.target.value)}
                  placeholder="Detailed description, features, specs..."
                  rows={5}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Price ($) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => update("price", e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition cursor-pointer"
                >
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>{cate}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Priority
                </label>
                <div className="flex gap-2">
                  {priorities.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => update("priority", p)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
                        form.priority === p
                          ? p === "High"
                            ? "bg-red-500 border-red-500 text-white"
                            : p === "Medium"
                            ? "bg-sky-500 border-sky-500 text-white"
                            : "bg-slate-400 border-slate-400 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-500 hover:border-sky-300"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Image URL <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => update("imageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
                />
                {form.imageUrl && (
                  <button
                    type="button"
                    onClick={() => update("imageUrl", "")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {form.imageUrl && (
                <div className="mt-3 rounded-2xl overflow-hidden border border-sky-100 h-20 w-24">
                  <img src={form.imageUrl}  alt="Preview" className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading2}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {loading2 ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <PackagePlus className="h-4 w-4" />
                    Publish Product
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}