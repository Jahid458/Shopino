"use client";

const testimonials = [
  { name: "Maya R.",   role: "Designer, Berlin",      text: "The vibe is unmatched. Every order feels like a treat.",          avatar: "MR" },
  { name: "Daniel K.", role: "Founder, Austin",        text: "Curated, fast, and beautifully packaged. My new go-to.",          avatar: "DK" },
  { name: "Aiko S.",   role: "Photographer, Tokyo",    text: "Vivid genuinely lives up to its name. Pure joy.",                 avatar: "AS" },
];

const avatarColors = ["#0EA5E9", "#0284c7", "#0369a1"];

const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="#0EA5E9" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function Testimonial() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .testimonials-grid { grid-template-columns: 1fr; }
        }
        .testimonial-card {
          background: #fff;
          border: 1px solid #bae6fd;
          border-radius: 20px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: -10px;
          right: 20px;
          font-family: Georgia, serif;
          font-size: 8rem;
          color: #e0f2fe;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(14,165,233,0.13);
        }
      `}</style>

      <section style={{ background: "#e0f2fe", padding: "5rem 5%" }}>
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
            }}>Reviews</span>
            <h2 style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 800,
              color: "#0c4a6e",
              marginBottom: "0.5rem",
            }}>Loved everywhere</h2>
            <p style={{
              fontFamily: "DM Sans, sans-serif",
              color: "#0369a1",
              fontSize: "0.95rem",
            }}>Honest words from our community.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map(({ name, role, text, avatar }, i) => (
              <div key={name} className="testimonial-card">

                <div style={{ display: "flex", gap: "3px" }}>
                  {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
                </div>

             
                <p style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.95rem",
                  color: "#0c4a6e",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  flex: 1,
                  position: "relative",
                  zIndex: 1,
                }}>{text}</p>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: avatarColors[i],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    color: "#fff",
                    flexShrink: 0,
                  }}>{avatar}</div>
                  <div>
                    <p style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "#0c4a6e",
                      margin: 0,
                    }}>{name}</p>
                    <p style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.78rem",
                      color: "#0369a1",
                      margin: 0,
                    }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}