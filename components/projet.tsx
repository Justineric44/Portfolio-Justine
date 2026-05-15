"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ProjetPage() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [entered, setEntered] = useState(false);
  const [dropping, setDropping] = useState(true);

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setDropping(false), 50);
    const t2 = setTimeout(() => setEntered(true), 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  };

  const goBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setDropping(true);
    setTimeout(() => router.push("/"), 600);
  };

   const photoLeft = 80 + (mouseX - window.innerWidth / 2) * 0.05;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#0A0A0A",
        fontFamily: "'Bebas Neue', sans-serif",
        cursor: "none",
        overflowX: "hidden",
        transform: dropping ? "translateY(-100vh)" : "translateY(0)",
        transition: dropping
          ? "transform 0.6s cubic-bezier(0.76,0,0.24,1)"
          : "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .cursor {
          position: fixed;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #F5F2EC;
          mix-blend-mode: difference;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.2s ease, height 0.2s ease;
        }

        .cursor.hovering {
          width: 48px;
          height: 48px;
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes lineGrow {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          transform-origin: left;
          animation: lineGrow 1s 0.3s ease both;
        }

        .nav-back {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color 0.2s ease;
          cursor: none;
        }

        .nav-back:hover {
          color: rgba(255,255,255,0.8);
        }

        .project-card {
          position: relative;
          border: 1px solid rgba(255,255,255,0.07);
          background: #0F0F0F;
          overflow: hidden;
          transition: border-color 0.3s ease, background 0.3s ease;
          cursor: none;
        }

        .project-card:hover {
          border-color: rgba(255,255,255,0.18);
          background: #141414;
        }

        .project-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.02) 0%,
            transparent 60%
          );
          pointer-events: none;
        }

        .tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 4px 10px;
          transition: color 0.2s ease, border-color 0.2s ease;
        }

        .project-card:hover .tag {
          color: rgba(255,255,255,0.45);
          border-color: rgba(255,255,255,0.18);
        }

        @media screen and (max-width: 900px) {
          .grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* CURSOR */}
      <div
        className={`cursor${hovered ? " hovering" : ""}`}
        style={{
          left: mouseX,
          top: mouseY,
        }}
      />

      {/* HEADER */}
      <header
        style={{
          padding: "28px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: entered ? 1 : 0,
          animation: entered ? "fadeSlideUp 0.7s ease both" : "none",
        }}
      >
        <a href="/projet" className="nav-back" onClick={goBack}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Retour
        </a>

        <span
          style={{
            fontSize: 20,
            color: "#F5F2EC",
            letterSpacing: "0.05em",
          }}
        >
          <a href="/">Justine Ricaud</a>
        </span>

        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          Expertise
        </span>
      </header>

      <div className="divider" style={{ margin: "0 48px" }} />

      {/* TITRE */}
      <div
        style={{
          padding: "60px 48px 48px",
          opacity: entered ? 1 : 0,
          animation: entered
            ? "fadeSlideUp 0.8s 0.1s ease both"
            : "none",
        }}
      >
        <div
          style={{
            fontSize: "clamp(20px, 9vw, 90px)",
            lineHeight: 0.9,
            color: "#F5F2EC",
            letterSpacing: "0.02em",
          }}
        >
          MES
        </div>

        <div
          style={{
            fontSize: "clamp(20px, 9vw, 130px)",
            lineHeight: 0.9,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.25)",
            letterSpacing: "0.02em",
            marginLeft: "clamp(40px, 5vw, 80px)",
          }}
        >
          EXPERTISES
        </div>
      </div>



{/* BLOB */}

      <div style={{ position: "absolute", top: "50%", left: `${photoLeft}%`, transform: "translate(-50%, -50%)", width: "clamp(260px, 34vw, 480px)", height: "clamp(260px, 34vw, 480px)", zIndex: -1, overflow: "visible", transition: "left 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#FF5F6D,#FFC371)", filter: "blur(90px)", animation: "blob1 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", left: -300, bottom: -80, width: "100%", height: "100%", background: "linear-gradient(135deg,#24C6DC,#514A9D)", filter: "blur(90px)", animation: "blob2 10s ease-in-out infinite" }} />
      </div>



      {/* DOUBLE SECTION */}
      <div
        className="grid-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          padding: "0 48px 48px",
          opacity: entered ? 1 : 0,
          animation: entered
            ? "fadeSlideUp 0.9s 0.2s ease both"
            : "none",
        }}
      >
        {/* ARCHITECTURE */}
        <a
          onClick={() => router.push("/projet/projet-design")}
          className="project-card"
          onMouseEnter={() => setHovered("architecture")}
          onMouseLeave={() => setHovered(null)}
          style={{
            minHeight: "620px",
            padding: "42px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: 24,
              }}
            >
              01 — Architecture d’intérieur
            </div>

            <div
              style={{
                fontSize: "clamp(42px, 5vw, 72px)",
                lineHeight: 0.9,
                color: "#F5F2EC",
                marginBottom: 32,
                letterSpacing: "0.03em",
              }}
            >
              ESPACES
              <br />
              & DESIGN
            </div>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.68)",
                maxWidth: 520,
              }}
            >
              Conception d’espaces, réflexion esthétique et travail autour
              des matières, des volumes et de la lumière.
              <br />
              <br />
              Une approche sensible de l’architecture intérieure centrée sur
              l’harmonie et l’expérience visuelle.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            {["Plans", "3D", "Agencement", "Design", "Concept"].map(
              (tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              )
            )}
          </div>
        </a>

        {/* DEV */}
 <div
  className="project-card"
  onMouseEnter={() => setHovered("architecture")}
  onMouseLeave={() => setHovered(null)}
  onClick={() => router.push("/projet/projet-web")}
  style={{
    minHeight: "620px",
    padding: "42px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
  }}
>
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: 24,
              }}
            >
              02 — Développement Full Stack
            </div>

            <div
              style={{
                fontSize: "clamp(42px, 5vw, 72px)",
                lineHeight: 0.9,
                color: "#F5F2EC",
                marginBottom: 32,
                letterSpacing: "0.03em",
              }}
            >
              WEB
              <br />
              & INTERACTION
            </div>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.68)",
                maxWidth: 520,
              }}
            >
              Développement d’interfaces modernes et expériences digitales
              interactives avec une approche orientée design.
              <br />
              <br />
              Création de projets full stack avec React, Next.js,
              TypeScript et animations immersives.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            {["React", "Next.js", "TypeScript", "UI/UX", "Full Stack"].map(
              (tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="divider" style={{ margin: "0 48px" }} />

      <footer
        style={{
          padding: "28px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: entered ? 1 : 0,
          animation: entered
            ? "fadeSlideUp 0.7s 0.5s ease both"
            : "none",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.15)",
          }}
        >
          © 2026 Justine Ricaud
        </span>

        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.15)",
          }}
        >
          Design & Code
        </span>
      </footer>
    </div>
  );
}