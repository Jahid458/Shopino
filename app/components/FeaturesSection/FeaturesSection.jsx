"use client";

import { Truck, ShieldCheck, Heart, Zap } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On every order over $50, worldwide.",
    variant: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    desc: "Bank-level encryption on every payment.",
    variant: "dark",
  },
  {
    icon: Heart,
    title: "Loved by 50k+",
    desc: "Highest-rated marketplace of 2025.",
    variant: "blue",
  },
  {
    icon: Zap,
    title: "Same-day Dispatch",
    desc: "Order before noon, ships today.",
    variant: "dark",
  },
];

const cardStyles = {
  blue: {
    background: "#0EA5E9",
    iconBg: "rgba(255,255,255,0.2)",
    iconColor: "#fff",
    titleColor: "#fff",
    descColor: "rgba(255,255,255,0.82)",
    hoverShadow: "0 20px 48px rgba(14,165,233,0.35)",
  },
  dark: {
    background: "#0c1a2e",
    iconBg: "rgba(14,165,233,0.15)",
    iconColor: "#0EA5E9",
    titleColor: "#fff",
    descColor: "rgba(255,255,255,0.55)",
    hoverShadow: "0 20px 48px rgba(0,0,0,0.3)",
  },
};

export default function FeaturesSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

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
          border-radius: 22px;
          padding: 2rem 1.6rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .feature-card::after {
          content: '';
          position: absolute;
          bottom: -40px;
          right: -40px;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          pointer-events: none;
        }
        .feature-card:hover {
          transform: translateY(-7px);
        }
      `}</style>

      <section style={{ background: "#fff", padding: "5rem 5%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* heading */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
              marginBottom: "0.9rem",
              fontFamily: "DM Sans, sans-serif",
            }}>
              Why Shopino
            </span>
            <h2 style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 800,
              color: "#0c1a2e",
              margin: 0,
            }}>
              Everything you need,{" "}
              <span style={{ color: "#0EA5E9" }}>nothing you don&apos;t</span>
            </h2>
          </div>

          <div className="features-grid">
            {features.map(({ icon: Icon, title, desc, variant }) => {
              const s = cardStyles[variant];
              return (
                <div
                  key={title}
                  className="feature-card"
                  style={{ background: s.background }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = s.hoverShadow}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                >
                  <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "13px",
                    background: s.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.2rem",
                  }}>
                    <Icon size={22} color={s.iconColor} strokeWidth={2} />
                  </div>

                  <h3 style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: s.titleColor,
                    marginBottom: "0.5rem",
                  }}>
                    {title}
                  </h3>

                  <p style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.875rem",
                    color: s.descColor,
                    lineHeight: 1.65,
                    margin: 0,
                  }}>
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}