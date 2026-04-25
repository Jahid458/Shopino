/* eslint-disable @next/next/no-img-element */
"use client";

export default function Hero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

        .hero-section *,
        .hero-section *::before,
        .hero-section *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-cta-row {
            justify-content: center;
          }
          .hero-image-col {
            display: none;
          }
        }
      `}</style>

      <section
        className="hero-section"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "82vh",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#D9EFFC", 
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "5rem 5% 4rem",
            width: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div className="hero-inner">

            {/* ── LEFT: copy ── */}
            <div>

              {/* badge */}
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid #0EA5E9",
                borderRadius: "50px",
                padding: "0.38rem 1.1rem",
                fontSize: "0.75rem",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                color: "#41C6E0",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "1.6rem",
              }}>
               
                New Season Drop
              </span>

              {/* headline */}
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: "#fff",
                marginBottom: "1.4rem",
              }}>
                Shop bold.
                <span style={{ color: "#41c6e0"  }}>
                  Live SHopino.
                </span>
              </h1>

              {/* sub-copy */}
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                color: "#8fcff2",
                lineHeight: 1.72,
                maxWidth: "480px",
                marginBottom: "2.2rem",
              }}>
                A vibrant online marketplace bringing together standout fashion,
                smart tech and joyful home goods, all in one place.
              </p>

           
              <div
                className="hero-cta-row"
                style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2.6rem" }}
              >
                <a
                  href="/products"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#fff",
                    color: "#0369a1",
                    borderRadius: "50px",
                    padding: "0.85rem 2.1rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "1rem",
                    textDecoration: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  Start Shopping
                 
                </a>

                <a
                  href="/about"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "transparent",
                    color: "#0EA5E9",
                    borderRadius: "50px",
                    padding: "0.85rem 2.1rem",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "1rem",
                    textDecoration: "none",
                    border: "1.5px solid #0EA5E9",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"}
                >
                  Our Story
                </a>
              </div>

            
            </div>

            {/* ── RIGHT: hero image ── */}
            <div className="hero-image-col" style={{ position: "relative" }}>
              <div style={{
                borderRadius: "28px",
                overflow: "hidden",
                boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
              }}>
                <img
                  src="/hero.png"
                  alt="Vibrant collection of products"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover",
                  }}
                />

                {/* bottom-left badge */}
                <div style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(14px)",
                  borderRadius: "16px",
                  padding: "0.65rem 1.1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#0ea5e9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                    flexShrink: 0,
                  }}>✨</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#0c4a6e", lineHeight: 1 }}>New Season</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#0369a1", marginTop: "2px" }}>Free shipping on $50+</div>
                  </div>
                </div>

                <div style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "#0ea5e9",
                  borderRadius: "50px",
                  padding: "0.4rem 1rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "#fff",
                  letterSpacing: "0.04em",
                }}>
                  Trending Now
                </div>
              </div>
            </div>

          </div>
        </div>

     
      </section>
    </>
  );
}