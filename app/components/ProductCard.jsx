/* eslint-disable @next/next/no-img-element */
"use client";

import { Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const priorityColor = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-sky-100 text-sky-600",
  Low: "bg-slate-100 text-slate-500",
};

export function ProductCard({ product }) {
  const { _id, title, fullDescription, price, category, priority, imageUrl } = product;
  const router = useRouter();

  return (
    <motion.div
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px -10px rgba(14, 165, 233, 0.25)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="bg-white rounded-2xl border border-sky-100 overflow-hidden group flex flex-col cursor-pointer shadow-sm"
      onClick={() => router.push(`/products/${_id}`)}
    >
      {/* Image */}
      <div className="h-48 bg-sky-50 overflow-hidden shrink-0 relative">
        {imageUrl ? 
          <>
            <motion.img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />

            <motion.div
              className="absolute inset-0 bg-sky-500/10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </>
         : 
          <div className="w-full h-full flex items-center justify-center">
            <Tag className="h-10 w-10 text-sky-200" />
          </div>
        }

      
        {priority && (
          <div className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${priorityColor[priority] || priorityColor.Low}`}>
            {priority}
          </div>
        )}
      </div>


      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 mb-1">
          {title}
        </h3>

        {fullDescription && (
          <p className="text-xs text-slate-400 line-clamp-2 mb-3">{fullDescription}</p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-sky-50 mb-3 mt-auto">
          <span className="text-sky-600 font-extrabold text-base">
            ${Number(price).toFixed(2)}
          </span>
          {category && (
            <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>


        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/products/${_id}`);
          }}
          className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold transition-colors duration-200"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}