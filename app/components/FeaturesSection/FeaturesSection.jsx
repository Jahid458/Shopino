"use client";

import { Truck, ShieldCheck, Heart, Zap } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On every order over $50, worldwide.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    desc: "Bank-level encryption on every payment.",
  },
  {
    icon: Heart,
    title: "Loved by 50k+",
    desc: "Highest-rated marketplace of 2025.",
  },
  {
    icon: Zap,
    title: "Same-day Dispatch",
    desc: "Order before noon, ships today.",
  },
];

export default function FeaturesSection() {
  return (
    <>
      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .features-grid { grid-template-columns: 1fr; }
        }
        .feature-card {
          background: #fff;
          border: 1px solid #bae6fd;
          border-radius: 20px;
          padding: 1.75rem 1.5rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: default;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(14,165,233,0.13);
        }
      `}</style>

      <section style={{ background: "#e0f2fe", padding: "5rem 5%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* heading */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span
              style={{
                display: "inline-block",
                background: "#0EA5E9",
                color: "#fff",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderRadius: "50px",
                padding: "0.3rem 1rem",
                marginBottom: "0.9rem",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Why Shopino
            </span>
            <h2
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 800,
                color: "#0c4a6e",
                margin: 0,
              }}
            >
              Everything you need, nothing you dont
            </h2>
          </div>

          <div className="features-grid">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="feature-card">
                {/* icon circle */}
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: "#e0f2fe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.1rem",
                  }}
                >
                  <Icon size={22} color="#0EA5E9" strokeWidth={2} />
                </div>
                <h3
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#0c4a6e",
                    marginBottom: "0.4rem",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.875rem",
                    color: "#0369a1",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
