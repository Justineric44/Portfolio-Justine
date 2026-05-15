"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const PROJECTS = [
  {
    id: "01",
    title: "O'Recipe",
    category: "Application de recettes",
    year: "2026",
    description:
      "Conception d'une application de recettes de cuisine intuitive et visuellement attrayante, mettant en avant des plats du monde entier avec une expérience utilisateur soignée.",
    languages: "React — Tailwind CSS",
    frame: "/O-recipes.gif",
    link: "#",
  },
  {
    id: "02",
    title: "O'Chat",
    category: "Application de chat en temps réel",
    year: "2026",
    description:
      "Création d'une application de chat en temps réel avec une interface épurée et moderne, intégrant des fonctionnalités de messagerie instantanée",
    languages: "Svelte",
    frame: "/ochat.png",
    link: "#",
  },
  {
    id: "03",
    title: "Heroes",
    category: "Application de services de super-héros",
    year: "2025",
    description:
      "Développement d'une application de services de super-héros, offrant une interface immersive pour découvrir et engager des héros fictifs pour diverses missions, avec une expérience utilisateur captivante.",
    languages: "Html — CSS — JavaScript",
    frame: "/heroes-league.gif",
    link: "#",
  },
   {
    id: "03",
    title: "Green-Roots",
    category: "E-commerce d'arbres pour la reforestation",
    year: "2026",
    description:
      "Conception d'une plateforme e-commerce dédiée à la vente d'arbres pour la reforestation, offrant une expérience utilisateur engageante et éducative pour encourager les achats responsables et soutenir les initiatives environnementales.",
    languages: "Next.Js — Tailwind CSS - node.js",
    frame: "/Encours.png",
    link: "#",
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
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* ── Curseur custom ── */
        .cursor {
          position: fixed;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #F5F2EC;
          mix-blend-mode: difference;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.25s ease, height 0.25s ease, opacity 0.2s ease;
        }
        .cursor.hovering {
          width: 52px;
          height: 52px;
        }

        /* ── Animations ── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* ── Divider ── */
        .divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          transform-origin: left;
          animation: lineGrow 1s 0.3s ease both;
        }

        /* ── Nav back ── */
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
        .nav-back:hover { color: rgba(255,255,255,0.85); }

        /* ── Grid ── */
        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 2px;
          padding: 0 0 2px;
          margin: 40px 48px 64px;
          border: 1px solid rgba(255,255,255,0.07);
        }

        /* ── Card ── */
        .project-card {
          position: relative;
          background: #0e0e0e;
          overflow: hidden;
          cursor: none;
          transition: background 0.35s ease;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .project-card:hover {
          background: #131313;
        }

        /* ── Image zone ── */
        .project-image {
          position: relative;
          height: 260px;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: #0d0d0d;
        }
        .project-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;  /* ← était "cover" */
  display: block;
  transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease;
  opacity: 0.85;
}
        .project-card:hover .project-image img {
          transform: scale(1.04);
          opacity: 1;
        }

        /* Grille décorative sur l'image */
        .project-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
          z-index: 1;
        }

        /* Overlay dégradé en bas de l'image */
        .image-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 80px;
          background: linear-gradient(transparent, rgba(13,13,13,0.85));
          z-index: 2;
        }

        /* Placeholder quand pas de gif */
        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #111 0%, #0d0d0d 100%);
        }
        .image-placeholder span {
          font-size: 48px;
          color: rgba(255,255,255,0.04);
          letter-spacing: 0.1em;
        }

        /* ── Contenu card ── */
        .project-content {
          padding: 28px 30px 32px;
        }

        .project-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .project-number {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }
        .project-year {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.18);
        }

        .project-title {
          font-size: clamp(32px, 3.5vw, 52px);
          line-height: 0.93;
          color: #F5F2EC;
          letter-spacing: 0.03em;
          margin-bottom: 14px;
        }

        .project-category {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.28);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .project-category::before {
          content: '';
          display: inline-block;
          width: 18px;
          height: 1px;
          background: rgba(255,255,255,0.2);
        }

        .project-description {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          line-height: 1.85;
          color: rgba(255,255,255,0.5);
          margin-bottom: 20px;
        }

        .project-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.05);
          margin-top: 4px;
        }
        .project-languages {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
        }
        .project-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
          cursor: none;
        }
        .project-link:hover { color: #F5F2EC; }
        .project-link svg {
          transition: transform 0.2s ease;
        }
        .project-link:hover svg {
          transform: translate(2px, -2px);
        }

        /* ── Compteur total ── */
        .projects-count {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
        }

        /* ── Responsive ── */
        @media screen and (max-width: 768px) {
          .project-grid {
            grid-template-columns: 1fr;
            margin: 24px 24px 48px;
          }
          header, .divider, footer {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .hero-section {
            padding: 40px 24px 60px !important;
          }
          .divider { margin: 0 24px !important; }
        }
      `}</style>

      {/* ── Curseur ── */}
      <div
        className={`cursor${hovered ? " hovering" : ""}`}
        style={{ left: mouseX, top: mouseY }}
      />

      {/* ── Header ── */}
      <header
        style={{
          padding: "26px 48px",
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

        <a
          href="/"
          style={{
            fontSize: 20,
            color: "#F5F2EC",
            letterSpacing: "0.05em",
            textDecoration: "none",
            cursor: "none",
          }}
        >
          Justine Ricaud
        </a>

        <span className="projects-count">
          {PROJECTS.length} projets
        </span>
      </header>

      <div className="divider" style={{ margin: "0 48px" }} />

      {/* ── Hero ── */}
      <div
        className="hero-section"
        style={{
          padding: "56px 48px 72px",
          opacity: entered ? 1 : 0,
          animation: entered ? "fadeSlideUp 0.8s 0.1s ease both" : "none",
        }}
      >
        <div
          style={{
            fontSize: "clamp(68px, 10vw, 118px)",
            lineHeight: 0.9,
            color: "#F5F2EC",
            letterSpacing: "0.02em",
          }}
        >
          WEB
        </div>
        <div
          style={{
            fontSize: "clamp(68px, 10vw, 118px)",
            lineHeight: 0.9,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.18)",
            marginLeft: "clamp(36px, 8vw, 130px)",
          }}
        >
          PROJECTS
        </div>
      </div>

      {/* ── Grid ── */}
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
            {/* Image / GIF */}
            <div className="project-image">
              {project.frame ? (
                <>
                  <img src={project.frame} alt={project.title} />
                  <div className="image-overlay" />
                </>
              ) : (
                <div className="image-placeholder">
                  <span>{project.id}</span>
                </div>
              )}
            </div>

            {/* Contenu */}
            <div className="project-content">
              <div className="project-meta">
                <span className="project-number">{project.id}</span>
                <span className="project-year">{project.year}</span>
              </div>

              <div className="project-title">{project.title}</div>
              <div className="project-category">{project.category}</div>
              <div className="project-description">{project.description}</div>

              <div className="project-footer">
                <span className="project-languages">{project.languages}</span>
                {project.link && project.link !== "#" && (
                  <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                    Voir
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="divider" style={{ margin: "0 48px" }} />

      <footer
        style={{
          padding: "26px 48px",
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
          Web & Development
        </span>
      </footer>
    </div>
  );
}
