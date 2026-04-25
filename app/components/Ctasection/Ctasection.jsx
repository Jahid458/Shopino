"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        .cta-section * { box-sizing: border-box; margin: 0; padding: 0; }

        .cta-inner {
          background: #0EA5E9;
          border-radius: 28px;
          padding: 4.5rem 3rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        /* decorative circles */
        .cta-inner::before {
          content: '';
          position: absolute;
          top: -80px; left: -80px;
          width: 260px; height: 260px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          pointer-events: none;
        }
        .cta-inner::after {
          content: '';
          position: absolute;
          bottom: -60px; right: -60px;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          pointer-events: none;
        }

        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          color: #0369a1;
          border-radius: 50px;
          padding: 0.9rem 2.2rem;
          font-family: DM Sans, sans-serif;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 6px 24px rgba(0,0,0,0.12);
        }
        .cta-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.18);
        }

        .cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #fff;
          border-radius: 50px;
          padding: 0.9rem 2.2rem;
          font-family: DM Sans, sans-serif;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.55);
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .cta-btn-secondary:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.1);
        }

        .cta-badge-row {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 2.5rem;
        }
        .cta-badge {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 50px;
          padding: 0.35rem 1rem;
          font-family: DM Sans, sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.03em;
        }

        @media (max-width: 640px) {
          .cta-inner { padding: 3rem 1.5rem; border-radius: 20px; }
          .cta-buttons { flex-direction: column; align-items: center; }
        }
      `}</style>

      <section className="cta-section" style={{ background: "#f0f9ff", padding: "5rem 5%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="cta-inner">

            {/* sparkle badge */}
            <div style={{ position: "relative", zIndex: 1, marginBottom: "1.5rem" }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "50px",
                padding: "0.35rem 1rem",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                <Sparkles size={12} />
                New drops every Friday
              </span>
            </div>

            {/* headline */}
            <h2 style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.1,
              maxWidth: "640px",
              margin: "0 auto 1rem",
              position: "relative",
              zIndex: 1,
            }}>
              Ready to shop something{" "}
              <span style={{ color: "#bae6fd" }}>vibrant?</span>
            </h2>

            {/* sub */}
            <p style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.7,
              maxWidth: "480px",
              margin: "0 auto 2.2rem",
              position: "relative",
              zIndex: 1,
            }}>
              Join thousands discovering bold finds every week. Free shipping on orders over $50.
            </p>

            {/* buttons */}
            <div className="cta-buttons" style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "1rem",
              position: "relative",
              zIndex: 1,
            }}>
              <Link href="/products" className="cta-btn-primary">
                Browse the shop <ArrowRight size={17} />
              </Link>
              <Link href="/about" className="cta-btn-secondary">
                Our story
              </Link>
            </div>


          </div>
        </div>
      </section>
    </>
  );
}