/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback, useRef, Suspense  } from "react";
import {
  Search,
  SlidersHorizontal,
  PackageOpen,
  Loader2,
  X,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "../components/ProductCard";

const categories = ["all", "Fashion", "Electronics", "Home", "Lifestyle"];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const MAX_PRICE = 1200;

 function ProductsContentList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice")) || MAX_PRICE,
  );

  const debounceRef = useRef(null);
  const handleSearchInput = (val) => {
    setSearchInput(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(val);
    }, 500);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
    clearTimeout(debounceRef.current);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category !== "all") params.set("category", category);
      params.set("minPrice", 0);
      params.set("maxPrice", maxPrice);
      params.set("sort", sort);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        setTotal(data.products.length);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, category, maxPrice, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "all") params.set("category", category);
    if (maxPrice < MAX_PRICE) params.set("maxPrice", maxPrice);
    if (sort !== "newest") params.set("sort", sort);
    router.replace(`/products?${params.toString()}`, { scroll: false });
  }, [search, category, maxPrice, sort]);

  const clearFilters = () => {
    clearSearch();
    setCategory("all");
    setMaxPrice(MAX_PRICE);
    setSort("newest");
  };

  const isFiltered = search || category !== "all" || sort !== "newest" || maxPrice < MAX_PRICE;

  const renderFilters = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => handleSearchInput(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
          />
          {searchInput && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                category === c
                  ? "bg-sky-500 text-white border-sky-500"
                  : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-600"
              }`}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Max Price
          <span className="font-normal text-sky-600">
            {maxPrice >= MAX_PRICE ? ` ${MAX_PRICE}+` : ` ${maxPrice}`}
          </span>
        </label>
        <p className="text-xs text-slate-400 mb-3">
          $0 — ${maxPrice >= MAX_PRICE ? `${MAX_PRICE}+` : maxPrice}
        </p>
        <input
          type="range"
          min={0}
          max={MAX_PRICE}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-sky-500 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>$0</span>
          <span>${MAX_PRICE}+</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Sort By
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition cursor-pointer"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {isFiltered && (
        <button
          onClick={clearFilters}
          className="w-full py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="flex-1 bg-linear-to-br from-sky-50 via-white to-sky-100 min-h-screen">
      <div className="bg-white border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <h1 className="text-2xl text-center sm:text-3xl lg:text-4xl font-extrabold text-slate-800">
            All <span className="text-sky-500">Products List</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-1 text-center">
            Explore our Shopino and find what you love.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 relative">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white rounded-2xl border border-sky-100 shadow-sm shadow-sky-100/50 p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal className="h-4 w-4 text-sky-500" />
                <h2 className="font-bold text-slate-800">Filters</h2>
              </div>
              {renderFilters()}
            </div>
          </aside>

          <div className="lg:hidden fixed bottom-5 right-5 z-40">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-3 bg-sky-500 text-white rounded-full shadow-lg text-sm font-semibold hover:bg-sky-600 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {isFiltered && (
                <span className="bg-white text-sky-500 rounded-full text-xs px-1.5 font-bold">
                  •
                </span>
              )}
            </button>
          </div>

          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl flex flex-col">
                <div className="flex items-center justify-between px-5 py-4 border-b border-sky-100">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-sky-500" />
                    <span className="font-bold text-slate-800">Filters</span>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  {renderFilters()}
                </div>
                <div className="px-5 py-4 border-t border-sky-100">
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold transition-colors"
                  >
                    Show {total} Results
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
              <p className="text-sm text-slate-500">
                Showing
                <span className="font-semibold text-slate-800">{total}</span>
                products
              </p>
              <div className="flex flex-wrap gap-2">
                {category !== "all" && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-medium">
                    {category}
                    <button onClick={() => setCategory("all")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {search && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-medium">
                    &ldquo;{search}&rdquo;
                    <button onClick={clearSearch}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {maxPrice < MAX_PRICE && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-medium">
                    Up to ${maxPrice}
                    <button onClick={() => setMaxPrice(MAX_PRICE)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
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
                  <PackageOpen className="h-8 w-8 text-sky-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">
                  No products found
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  Try adjusting your filters or search term.
                </p>

                {isFiltered && <button
                    onClick={clearFilters}
                    className="px-5 py-2.5 rounded-full bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors"
                  >Clear Filters</button>
                }
              </div>
            )}

            {!loading && products.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}


export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="h-20 w-20 rounded-full border-4 border-sky-500 animate-spin" />
          <p className="text-slate-500 text-sm">Loading Products ......</p>
        </div>
      </div>
    }>
      <ProductsContentList />
    </Suspense>
  );
}
