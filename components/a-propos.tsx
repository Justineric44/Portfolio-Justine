"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const FORMATIONS = [
  {
    year: "2026",
    title: "Diplôme de Concepteur Développeur d’Applications",
    school: "O'clock",
    description:
      "Apprentissage intensif du développement web full-stack, sur 9 mois, en téléprésentiel, avec un focus sur les technologies modernes comme React, Next.js, Node.js et les bonnes pratiques de développement.",
  },
  {
    year: "2014",
    title: "Diplôme d'Architecte d'intérieur",
    school: "IFFDEC",
    description:
      "Formation en architecture intérieure, design d’espace et aménagement, avec une approche centrée sur la créativité, l’esthétique et la fonctionnalité des espaces physiques.",
  },
  {
    year: "2013",
    title: "Diplôme de Décorateur d'intérieur",
    school: "IFFDEC",
    description:
      "Formation en décoration d’intérieur, axée sur la création d’ambiances, le choix des matériaux, des couleurs et du mobilier pour sublimer les espaces de vie et de travail.",
  },
    {
    year: "2011",
    title: "Baccarauréat professionnel en techniques de l'architecture et de l'habitat",
    school: "St Louis",
    description:
      "Formation sur les techniques de construction, les matériaux, la lecture de plans et les normes du bâtiment, avec une orientation vers l’architecture et l’habitat. En option : étude et économie de la construction",
  },
];

export default function AboutPage() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [hovered, setHovered] = useState(false);
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
        color: "#F5F2EC",
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

        * {
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

        .section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          padding: 80px 48px;
        }

        .section-title {
          font-size: clamp(48px, 7vw, 70px);
          line-height: 0.9;
          letter-spacing: 0.03em;
        }

        .section-content {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.9;
          color: rgba(255,255,255,0.72);
          max-width: 600px;
        }

        .timeline {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .timeline-item {
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.3s ease;
        }

        .timeline-item:hover {
          border-color: rgba(255,255,255,0.2);
        }

        .timeline-year {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 10px;
        }

        .timeline-title {
          font-size: clamp(28px, 3vw, 44px);
          margin-bottom: 10px;
          letter-spacing: 0.03em;
        }

        .timeline-school {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 12px;
        }

        .timeline-description {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          line-height: 1.8;
          color: rgba(255,255,255,0.65);
          max-width: 520px;
        }

        @media screen and (max-width: 900px) {
          .section {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 64px 24px;
          }
        }
      `}</style>

      {/* CURSOR */}
      <div
        className={`cursor ${hovered ? "hovering" : ""}`}
        style={{ left: mouseX, top: mouseY }}
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
        <a
          href="/"
          className="nav-back"
          onClick={goBack}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
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
          À propos
        </span>
      </header>

      <div className="divider" style={{ margin: "0 48px" }} />

      {/* HERO */}
      <section
        style={{
          padding: "80px 48px 40px",
          opacity: entered ? 1 : 0,
          animation: entered ? "fadeSlideUp 0.8s 0.1s ease both" : "none",
        }}
      >
        <div
          style={{
            fontSize: "clamp(20px, 11vw, 120px)",
            lineHeight: 0.88,
            letterSpacing: "0.02em",
          }}
        >
          À PROPOS
        </div>

        <div
          style={{
            fontSize: "clamp(20px, 11vw, 120px)",
            lineHeight: 0.88,
            WebkitTextStroke: "1px rgba(255,255,255,0.22)",
            color: "transparent",
            marginLeft: "clamp(30px, 8vw, 140px)",
          }}
        >
          DE MOI
        </div>
        {/* BLOB */}

      <div style={{ position: "absolute", top: "50%", left: `${photoLeft}%`, transform: "translate(-50%, -50%)", width: "clamp(260px, 34vw, 480px)", height: "clamp(260px, 34vw, 480px)", zIndex: -3, overflow: "visible", transition: "left 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#FF5F6D,#FFC371)", filter: "blur(90px)", animation: "blob1 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", left: -300, bottom: -80, width: "100%", height: "100%", background: "linear-gradient(135deg,#24C6DC,#514A9D)", filter: "blur(90px)", animation: "blob2 10s ease-in-out infinite" }} />
      </div>
      </section>
<div className="divider" style={{ margin: "0 48px" }} />



      {/* INTRO */}
      <section className="section">
        <div className="section-title">
          MON
          <br />
          PARCOURS
        </div>

        <div className="section-content">
          Depuis plus de 11 ans, j’évolue entre architecture intérieure, design et impression tout support, avec une même obsession : créer des expériences visuelles fortes, cohérentes et impactantes.

          <br />
          <br />

          Concevoir un espace, imaginer une identité ou travailler la matière et le détail m’a appris à penser chaque projet dans son ensemble : esthétique, fonctionnalité et émotion.

          <br />
          <br />

          Aujourd’hui, cette vision se prolonge naturellement dans le développement web. Plus qu’une reconversion, c’est une évolution logique de mon parcours. Le digital est devenu un nouveau terrain de création où le design, l’expérience utilisateur et la technique se rencontrent pour donner vie à des projets modernes, intuitifs et vivants.

          <br />
          <br />

          Du print au digital, de l’espace à l’interface, je continue à faire ce que j’ai toujours aimé : transformer des idées en expériences.
        </div>
      </section>

      <div className="divider" style={{ margin: "0 48px" }} />

      {/* FORMATIONS */}
      <section className="section">
        <div className="section-title">
          MES
          <br />
          FORMATIONS
        </div>

        <div className="timeline">
          {FORMATIONS.map((f) => (
            <div
              key={f.title}
              className="timeline-item"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className="timeline-year">{f.year}</div>

              <div className="timeline-title">{f.title}</div>

              <div className="timeline-school">{f.school}</div>

              <div className="timeline-description">
                {f.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: "0 48px" }} />

      {/* FOOTER */}
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
          Design & Code
        </span>
      </footer>
    </div>
  );
}