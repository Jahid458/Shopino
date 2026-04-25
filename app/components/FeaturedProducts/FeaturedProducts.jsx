/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { ProductCard } from "../ProductCard";
import Link from "next/link";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products?limit=4");
      const data = await res.json();

      if (data.success) {
        setProducts(data.products.slice(0,4));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
<section className="max-w-7xl mx-auto px-4 py-12">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center sm:text-left">
      Featured <span className="text-sky-500">Products</span>
    </h2>

    <Link
      href="/products"
      className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-sky-500 border border-sky-500 rounded-full px-4 py-2 transition-all duration-200 hover:bg-sky-500 hover:text-white self-center sm:self-auto"
    >
      View all <ArrowRight size={15} />
    </Link>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
    {products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>
</section>
  );
}