/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  Calendar,
  Tag,
  User,
  Loader2,
  AlertCircle,
  Zap,
  Trash2,
} from "lucide-react";

function ProductDetailContent() {
  const { user, loading: authLoading } = useAuth();
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wished, setWished] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError("Product not found.");
        return;
      }
      setProduct(data.product);
      fetchRelated(data.product.category, data.product._id);
    } catch (err) {
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async (category, currentId) => {
    try {
      const res = await fetch(`/api/products?category=${category}`);
      const data = await res.json();
      if (data.success) {
        const filtered = data.products
          .filter((p) => p._id !== currentId)
          .slice(0, 3);
        setRelated(filtered);
      }
    } catch {}
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        router.push("/products");
      }
    } catch {
      setDeleting(false);
    }
  };

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-9 w-9 animate-spin text-sky-500" />
          <p className="text-sm text-slate-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-9 w-9 animate-spin text-sky-500" />
          <p className="text-sm text-slate-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Product not found</h2>
          <p className="text-slate-500 text-sm mb-6">{error || "This product may have been removed."}</p>
          <Link
            href="/products"
            className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.email === product.createdBy;

  const priorityColor =
    product.priority === "High"
      ? "bg-red-100 text-red-500"
      : product.priority === "Medium"
      ? "bg-sky-100 text-sky-600"
      : "bg-slate-100 text-slate-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 py-10 px-4 sm:px-6">

      {showDeleteModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-sky-100 p-6 sm:p-8 w-full max-w-sm text-center">
            <div className="h-14 w-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-7 w-7 text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-1">Delete Product?</h2>
            <p className="text-slate-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="bg-white rounded-2xl border border-sky-100 shadow-lg shadow-sky-100/40 overflow-hidden mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            <div className="relative bg-sky-50">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-64 sm:h-80 lg:h-full max-h-[500px] object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/800x600/e0f2fe/0ea5e9?text=No+Image";
                  }}
                />
              ) : (
                <div className="w-full h-64 sm:h-80 flex items-center justify-center">
                  <ShoppingBag className="h-20 w-20 text-sky-200" />
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${priorityColor}`}>
                  {product.priority} Priority
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col gap-5">

              <span className="inline-flex w-fit text-xs px-3 py-1.5 rounded-full bg-sky-100 text-sky-600 font-medium">
                {product.category}
              </span>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3 leading-tight">
                  {product.title}
                </h1>
                <p className="text-3xl font-extrabold text-sky-600">${product.price}</p>
              </div>

              {product.fullDescription && (
                <p className="text-slate-500 text-sm leading-relaxed border-t border-sky-50 pt-4">
                  {product.fullDescription}
                </p>
              )}

              <div className="grid grid-cols-2 gap-3 py-4 border-t border-sky-100">
                {product.date && (
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-400">Date</p>
                      <p className="text-sm font-medium text-slate-700">{product.date}</p>
                    </div>
                  </div>
                )}
                {product.createdBy && (
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-400">Listed by</p>
                      <p className="text-sm font-medium text-slate-700 truncate max-w-32">
                        {product.createdBy}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <Tag className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Category</p>
                    <p className="text-sm font-medium text-slate-700">{product.category}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Added</p>
                    <p className="text-sm font-medium text-slate-700">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

             
                <button 
                onClick={() => router.push('/products')} 
                className="items-center justify-center gap-2 py-2  rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold ">
                   Back
                </button>

                
          

            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-5">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((item) => (
                <Link
                  key={item._id}
                  href={`/products/${item._id}`}
                  className="bg-white rounded-2xl border border-sky-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-200 overflow-hidden group"
                >
                  <div className="h-44 bg-sky-50 overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="h-12 w-12 text-sky-200" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-slate-800 line-clamp-1">{item.title}</h3>
                      <span className="text-sm font-bold text-sky-600 shrink-0">${item.price}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{item.fullDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-sky-100 text-sky-600 font-medium">
                        {item.category}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        item.priority === "High"
                          ? "bg-red-100 text-red-500"
                          : item.priority === "Medium"
                          ? "bg-sky-100 text-sky-600"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-9 w-9 animate-spin text-sky-500" />
        <p className="text-sm text-slate-500">Loading...</p>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductDetailContent />
    </Suspense>
  );
}