"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const PROJECTS = [
  {
    
    title: "Bar - tabac - presse",
    category: "Architecture d’intérieur",
    year: "2024",
    description:
      "Conception d’un espace bar et tabac-presse, avec des matériaux naturels, une ambiance chaleureuse et une identité visuelle forte.",
    frame:
      "/Vauzac.png",
  },
  {
    
    title: "Pâtisserie - Chocolaterie",
    category: "Architecture d’intérieur",
    year: "2025",
    description:
      "Création d'une pâtisserie-chocolaterie haut de gamme, alliant élégance, fonctionnalité et une expérience client immersive.",
      frame:
      "/Paris-Pornic.png",
  },
  {
    
    title: "Boulangerie - Viennoiserie",
    category: "Architecture d’intérieur",
    year: "2024",
    description:
      "Travail sur les volumes, la lumière et l’expérience utilisateur dans l’espace.",
      frame:
      "/Boulangerie.png",
  },
  {
    
    title: "Bar Ambiance - Club",
    category: "Architecture d’intérieur",
    year: "2025",
    description:
      "Conception d’un espace de bar et club, avec une atmosphère immersive, des jeux de lumière et une identité visuelle forte.",
      frame:
      "/Bar.png",
  },
];

export default function DesignProjectsPage() {
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
    setTimeout(() => router.push("/projet"), 600);
  };

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

        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 24px;
          padding: 0 48px 64px;
        }

        .project-card {
          position: relative;
          min-height: 520px;
          border: 1px solid rgba(255,255,255,0.08);
          background: #111111;
          overflow: hidden;
          transition:
            transform 0.4s ease,
            border-color 0.3s ease,
            background 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.18);
          background: #151515;
        }

        .project-image {
          height: 280px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.04),
              rgba(255,255,255,0.01)
            );
          position: relative;
          overflow: hidden;
        }

        .project-image::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .frame {
          position: absolute;
          inset: 30px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .project-content {
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: calc(100% - 280px);
        }

        .project-number {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 14px;
        }

        .project-title {
          font-size: clamp(34px, 4vw, 56px);
          line-height: 0.95;
          color: #F5F2EC;
          margin-bottom: 22px;
          letter-spacing: 0.03em;
        }

        .project-category {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.35);
          margin-bottom: 18px;
        }

        .project-description {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          line-height: 1.9;
          color: rgba(255,255,255,0.65);
        }

        @media screen and (max-width: 768px) {
          .project-grid {
            grid-template-columns: 1fr;
            padding: 0 24px 48px;
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
        <a href="/" className="nav-back" onClick={goBack}>
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
          Design Projects
        </span>
      </header>

      <div className="divider" style={{ margin: "0 48px" }} />

      {/* HERO */}
      <div
        style={{
          padding: "60px 48px 80px",
          opacity: entered ? 1 : 0,
          animation: entered ? "fadeSlideUp 0.8s 0.1s ease both" : "none",
        }}
      >
        <div
          style={{
            fontSize: "clamp(72px, 10vw, 120px)",
            lineHeight: 0.9,
            color: "#F5F2EC",
            letterSpacing: "0.02em",
          }}
        >
          DESIGN
        </div>

        <div
          style={{
            fontSize: "clamp(72px, 10vw, 120px)",
            lineHeight: 0.9,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.22)",
            marginLeft: "clamp(40px, 8vw, 140px)",
          }}
        >
          PROJECTS
        </div>
      </div>

      {/* GRID */}
      <div className="project-grid">
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            className="project-card"
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              opacity: entered ? 1 : 0,
              animation: entered
                ? `fadeSlideUp 0.7s ${0.15 + i * 0.1}s ease both`
                : "none",
            }}
          >
            <div className="project-image">
              <div className="frame" />
              <img
                src={project.frame}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="project-content">
              <div>
                <div className="project-number">
                  {project.id} — {project.year}
                </div>

                <div className="project-title">{project.title}</div>

                <div className="project-category">{project.category}</div>

                <div className="project-description">{project.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="divider" style={{ margin: "0 48px" }} />

      <footer
        style={{
          padding: "28px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
          © 2024 Justine Ricaud
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
          Architecture & Design
        </span>
      </footer>
    </div>
  );
}
