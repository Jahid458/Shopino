/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {LayoutGrid,List,Search,Trash2,Eye,Plus,Package,Loader2,AlertCircle,X,ShoppingBag
} from "lucide-react";




function DeleteModal({ product, onConfirm, onCancel, deleting }) {
  return (
    <div className="fixed inset-0 z-150 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-sky-100 p-6 sm:p-8 w-full max-w-sm text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="h-14 w-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-7 w-7 text-red-500" />
        </div>
        <h2 className="text-lg font-bold text-slate-800 mb-1">
          Delete Product?
        </h2>
        <p className="text-slate-500 text-sm mb-1">
          You&apos;re about to delete{" "}
          <span className="font-semibold text-sky-600">{product?.title}</span>.
        </p>
        <p className="text-slate-400 text-xs mb-6">
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={deleting}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-60"
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}


function PriorityBadge({ priority }) {
  const cls =
    priority === "High"
      ? "bg-red-100 text-red-500"
      : priority === "Medium"
        ? "bg-sky-100 text-sky-600"
        : "bg-slate-100 text-slate-500";
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cls}`}>
      {priority || "Normal"}
    </span>
  );
}



function ProductCard({ product, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-200 overflow-hidden group">
      {/* Image */}
      <div className="relative h-44 bg-sky-50 overflow-hidden">
        {product.imageUrl ? 
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
         : 
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-sky-200" />
          </div>
        }
        <div className="absolute top-3 left-3">
          <PriorityBadge priority={product.priority} />
        </div>
      </div>


      <div className="p-4">
        <span className="text-xs px-2.5 py-1 rounded-full bg-sky-100 text-sky-600 font-medium">
          {product.category || "Uncategorized"}
        </span>
        <h3 className="mt-2 text-sm font-bold text-slate-800 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-3">
          {product.fullDescription || "No description provided."}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-base font-extrabold text-sky-600">
            ${Number(product.price).toFixed(2)}
          </span>
          <div className="flex items-center gap-2">
            <Link
              href={`/products/${product._id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 text-xs font-semibold border border-sky-100 transition-colors"
            >
              <Eye className="h-3.5 w-3.5" /> View
            </Link>
            <button
              onClick={() => onDelete(product)}
              className="flex items-center justify-center h-8 w-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 transition-colors"
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductRow({ product, onDelete, index }) {
  return (
    <tr className={`hover:bg-sky-50/60 transition-colors
           ${index % 2 === 0 ? "bg-white" : "bg-sky-50/30"}`}>
   


      <td className="px-4 py-3">
        <div className="h-11 w-11 rounded-xl overflow-hidden bg-sky-100 shrink-0 flex items-center justify-center">
          {product.imageUrl ? 
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
           : 
            <ShoppingBag className="h-5 w-5 text-sky-300" />
          }
        </div>
      </td>



      <td className="px-4 py-3">
        <p className="text-sm font-semibold text-slate-800 line-clamp-1">
          {product.title}
        </p>
        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
          {product.fullDescription}
        </p>
      </td>
      <td className="px-4 py-3 hidden sm:table-cell">
        <span className="text-xs px-2.5 py-1 rounded-full bg-sky-100 text-sky-600 font-medium whitespace-nowrap">
          {product.category || " "}
        </span>
      </td>
 


      <td className="px-4 py-3 hidden md:table-cell">
        <span className="text-sm font-bold text-sky-600">
          ${Number(product.price).toFixed(2)}
        </span>
      </td>
      
      

      <td className="px-4 py-3 hidden lg:table-cell">
        <PriorityBadge priority={product.priority} />
      </td>
  
  
      <td className="px-4 py-3 hidden xl:table-cell">
        <span className="text-xs text-slate-400">
          {product.createdAt? new Date(product.createdAt).toLocaleDateString(): ""}
        </span>
      </td>


      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Link
            href={`/items/${product._id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 text-xs font-semibold border border-sky-100 transition-colors whitespace-nowrap"
          >
            <Eye className="h-3.5 w-3.5" /> View
          </Link>
          <button
            onClick={() => onDelete(product)}
            className="flex items-center justify-center h-8 w-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 transition-colors shrink-0"
            title="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}



function ManageItemsContent() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [view, setView] = useState("grid"); // "grid" | "list"
  const [toDelete, setDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);


  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);


  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);


  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search", debouncedSearch);
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      if (data.success) setProducts(data.products);
      else showToast(data.message || "Failed to load products", "error");
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (user) fetchProducts();
  }, [fetchProducts, user]);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${toDelete._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== toDelete._id));
        showToast(`"${toDelete.title}" deleted successfully.`);
      } else {
        showToast(data.message || "Delete failed.", "error");
      }
    } catch {
      showToast("Network error.", "error");
    } finally {
      setDeleting(false);
      setDelete(null);
    }
  }

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-9 w-9 animate-spin text-sky-500" />
          <p className="text-sm text-slate-500">Checking authentication…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-100">
      
      <div className="bg-white border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              Manage <span className="text-sky-500">Products</span>
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              {products.length} product{products.length !== 1 ? "s" : ""} in
              your store
            </p>
          </div>


          <Link
            href="/addproduct"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-sm shadow-sky-200 transition-colors self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" /> Add Product
          </Link>
        </div>
      </div>

      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col justify-between  sm:flex-row sm:items-center gap-3 mb-6">
       
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-sky-100 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent shadow-sm transition"/>

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              ><X className="h-4 w-4" /> </button>
            )}
          </div>

       
          <div className="flex  items-center gap-1 bg-white rounded-xl border border-sky-100 p-1 shadow-sm self-start sm:self-auto">
            <button
              onClick={() => setView("grid")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                view === "grid"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-sky-600"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                view === "list"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-sky-600"
              }`}
            >
              <List className="h-3.5 w-3.5" /> List
            </button>
          </div>
        </div>

    
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 text-sky-500 animate-spin" />
          </div>
        )}




        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-16 w-16 rounded-full bg-sky-100 flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-sky-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">
              No products found
            </h3>
            <p className="text-slate-400 text-sm mb-5">
              {search
                ? "Try a different search term."
                : "Add your first product to get started."}
            </p>
            {search ? (
              <button
                onClick={() => setSearch("")}
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold transition-colors"
              >
                Clear Search
              </button>
            ) : (
              <Link
                href="/items/create"
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold transition-colors"
              >
                Add Product
              </Link>
            )}
          </div>
        )}


        {!loading && products.length > 0 && view === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={setDelete}
              />
            ))}
          </div>
        )}


        {!loading && products.length > 0 && view === "list" && (
          <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-sky-100 bg-sky-50">
                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-14">
                      IMG
                    </th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                      Category
                    </th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                      Price
                    </th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                      Priority
                    </th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden xl:table-cell">
                      Added
                    </th>
                    <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-50">
                  {products.map((product, i) => (
                    <ProductRow
                      key={product._id}
                      product={product}
                      onDelete={setDelete}
                      index={i}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            {/* Table footer */}
            <div className="px-4 py-3 border-t border-sky-50 bg-sky-50/30">
              <p className="text-xs text-slate-400">
                Showing
                <span className="font-semibold text-slate-600">
                  {products.length}
                </span>{" "}
                product{products.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}
      </div>


      {toDelete && (
        <DeleteModal
          product={toDelete}
          onConfirm={handleDelete}
          onCancel={() => setDelete(null)}
          deleting={deleting}
        />
      )}


      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-200 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lg text-sm font-semibold border transition-all ${
            toast.type === "error"
              ? "bg-red-50 text-red-600 border-red-200"
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}
        >
          {toast.type === "error" ? 
            <AlertCircle className="h-4 w-4 shrink-0" />
           : 
            <div className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                <path
                  d="M1 3.5L3.5 6L8 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          }
          {toast.msg}
        </div>
      )}
    </div>
  );
}


export default function ManageItemsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-sky-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-9 w-9 animate-spin text-sky-500" />
            <p className="text-sm text-slate-500">Loading…</p>
          </div>
        </div>
      }
    >
      <ManageItemsContent />
    </Suspense>
  );
}
