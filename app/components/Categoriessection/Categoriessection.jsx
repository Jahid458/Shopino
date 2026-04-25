"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  { name: "Fashion",     count: 32, bg: "#0EA5E9", accent: "#38bdf8" },
  { name: "Electronics", count: 28, bg: "#0284c7", accent: "#0EA5E9" },
  { name: "Home",        count: 19, bg: "#0369a1", accent: "#0284c7" },
  { name: "Lifestyle",   count: 24, bg: "#075985", accent: "#0369a1" },
];

export default function CategoriesSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 1024px) {
          .categories-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .categories-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
        }
        .cat-card {
          border-radius: 24px;
          padding: 2rem 1.5rem 1.5rem;
          height: 190px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cat-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 48px rgba(14,165,233,0.28);
        }
        .cat-card::before {
          content: '';
          position: absolute;
          top: -40px;
          right: -40px;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
        }
        .cat-card::after {
          content: '';
          position: absolute;
          bottom: -30px;
          left: -20px;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255,255,255,0.07);
        }
      `}</style>

      <section style={{ background: "#f0f9ff", padding: "5rem 5%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}>
            <div>
              <span style={{
                display: "inline-block",
                background: "#0EA5E9",
                color: "#fff",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderRadius: "50px",
                padding: "0.3rem 1rem",
                marginBottom: "0.7rem",
                fontFamily: "DM Sans, sans-serif",
              }}>Collections</span>
              <h2 style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 800,
                color: "#0c4a6e",
                margin: 0,
              }}>Shop by category</h2>
              <p style={{
                fontFamily: "DM Sans, sans-serif",
                color: "#0EA5E9",
                fontSize: "0.95rem",
                marginTop: "0.4rem",
              }}>Find your next favorite thing.</p>
            </div>
            <Link href="/products" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "#0EA5E9",
              textDecoration: "none",
              border: "1.5px solid #0EA5E9",
              borderRadius: "50px",
              padding: "0.45rem 1.1rem",
              transition: "background 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#0EA5E9"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0EA5E9"; }}
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((c) => (
              <Link
                key={c.name}
                href={`/products?category=${c.name}`}
                className="cat-card"
                style={{ background: c.bg }}
              >
           

                {/* text */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.75)",
                    letterSpacing: "0.04em",
                    marginBottom: "4px",
                  }}>{c.count} items</p>
                  <h3 style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: "#fff",
                    margin: 0,
                  }}>{c.name}</h3>
                </div>

                {/* arrow */}
                <div style={{
                  position: "absolute",
                  top: "1.2rem",
                  right: "1.2rem",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}>
                  <ArrowRight size={15} color="#fff" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}