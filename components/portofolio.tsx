"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Mes projets", href: "/projet" },
  { label: "A propos",    href: "/a-propos" },
  { label: "Contact",     href: "/contact" },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Justineric44",
    icon: (color: string) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/justine-ricaud-b2363b183/",
    icon: (color: string) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452H17.01v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.589V9h3.308v1.561h.046c.461-.872 1.586-1.791 3.264-1.791 3.49 0 4.135 2.296 4.135 5.284v6.398zM5.337 7.433a1.92 1.92 0 1 1 0-3.84 1.92 1.92 0 0 1 0 3.84zM6.758 20.452H3.914V9h2.844v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];


export default function PortfolioLanding() {
  const [mouseX, setMouseX] = useState(0.5);
  const [mouseY, setMouseY] = useState(0.5);
  const [entered, setEntered] = useState(false);

  const [dragStartY, setDragStartY]   = useState<number | null>(null);
  const [dragDelta, setDragDelta]     = useState(0);
  const [launching, setLaunching]     = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouseX((e.clientX - rect.left) / rect.width);
    setMouseY((e.clientY - rect.top) / rect.height);

    if (dragStartY !== null && !launching) {
      const delta = e.clientY - dragStartY;
      setDragDelta(Math.min(0, delta));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartY(e.clientY);
    setDragDelta(0);
  };

  const handleMouseUp = () => {
    if (launching) return;
    const threshold = window.innerHeight * 0.22;
    if (dragDelta < -threshold) {
      setLaunching(true);
      setTimeout(() => router.push("/projet"), 650);
    } else {
      setDragDelta(0);
    }
    setDragStartY(null);
  };

  const handleMouseLeave = () => {
    if (!launching) {
      setDragStartY(null);
      setDragDelta(0);
    }
  };

  const splitX    = mouseX * 100;
  const photoLeft = 20 + mouseX * 60;

  const liftY    = launching ? -window.innerHeight : dragDelta / 2.5;
  const progress = launching ? 1 : Math.min(1, Math.abs(dragDelta) / (window.innerHeight * 0.22));

  const renderNav = (textColor: string, isLight: boolean) => (
    <nav style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 48px", zIndex: 50 }}>
      {/* LEFT — nom + séparateur + sous-titre */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 22, color: textColor, letterSpacing: "0.05em" }}>Justine Ricaud</span>
        <div style={{ width: 1, height: 16, background: isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)" }} />
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: isLight ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.45)",
        }}>
          Architecte d'intérieur &amp; conceptrice web
        </span>
      </div>

      {/* RIGHT — liens + icônes */}
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="nav-link"
            style={{ color: textColor }}
            onClick={label === "Mes projets" ? (e) => { e.preventDefault(); setLaunching(true); setTimeout(() => router.push("/projet"), 650); } : undefined}
          >
            {label}
          </a>
        ))}
        <div style={{ width: 1, height: 16, background: isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {SOCIALS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{ display: "flex", alignItems: "center", opacity: 0.75, transition: "opacity 0.2s ease" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.75")}
            >
              {icon(textColor)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100%",
        height: "100vh",
        minHeight: 600,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Bebas Neue', sans-serif",
        cursor: "none",
        background: "#000",
        transform: `translateY(${liftY}px)`,
        transition: launching
          ? "transform 0.65s cubic-bezier(0.76,0,0.24,1)"
          : dragStartY !== null
            ? "none"
            : "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        willChange: "transform",
        userSelect: "none",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob1 {
          0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes blob2 {
          0%,100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          50%      { border-radius: 70% 30% 40% 60% / 30% 70% 50% 60%; }
        }
        @keyframes cursorPulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.3); }
        }
        @keyframes floatArrow {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes revealExplorer {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cursor {
          position: fixed;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: white;
          mix-blend-mode: difference;
          pointer-events: none;
          z-index: 9999;
          animation: cursorPulse 2s ease-in-out infinite;
        }

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .nav-link:hover { opacity: 0.5; }

        .move-explorer {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 200;
          animation: revealExplorer 1s 1.6s ease both;
          white-space: nowrap;
          pointer-events: none;
        }
        .move-explorer-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          mix-blend-mode: difference;
          transition: color 0.2s ease;
        }
        .move-explorer-arrow {
          animation: floatArrow 1.6s ease-in-out infinite;
        }
      `}</style>

      {/* CURSOR */}
      <div
        className="cursor"
        style={{
          left: mouseX * (containerRef.current?.offsetWidth ?? 800),
          top:  mouseY * (containerRef.current?.offsetHeight ?? 600),
        }}
      />

      {/* LIGHT SIDE */}
      <div style={{ position: "absolute", inset: 0, background: "#F5F2EC", clipPath: `inset(0 ${100 - splitX}% 0 0)`, transition: "clip-path 0.08s linear" }}>
        {renderNav("#111", true)}
        <div style={{ position: "absolute", top: "38%", left: 48, transform: "translateY(-50%)", zIndex: 30, animation: entered ? "fadeUp 1s ease both" : "none" }}>
          <div style={{ fontSize: "clamp(90px, 13vw, 180px)", lineHeight: 0.9, color: "#111", textShadow: "4px 8px 24px rgba(243, 121, 6, 0.5)"}}>DESIGN</div>
          <div style={{ marginTop: 20, maxWidth: 240, fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.7, color: "#555" }}>
            Concevoir des espaces, physiques et numériques
          </div>
        </div>
      </div>

      {/* DARK SIDE */}
      <div style={{ position: "absolute", inset: 0, background: "#0A0A0A", clipPath: `inset(0 0 0 ${splitX}%)`, transition: "clip-path 0.08s linear" }}>
        {renderNav("#F5F2EC", false)}
        <div style={{ position: "absolute", top: "38%", right: 48, transform: "translateY(-50%)", textAlign: "right", zIndex: 30, animation: entered ? "fadeUp 1s ease both" : "none" }}>
          <div style={{ fontSize: "clamp(90px, 13vw, 180px)", lineHeight: 0.9, color: "#F5F2EC", textShadow: "4px 8px 24px rgba(20, 144, 216, 0.9)" }}>CODE</div>
          <div style={{ marginTop: 20, maxWidth: 240, marginLeft: "auto", fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.7, color: "#ffffff" }}>
            Les créateurs invisibles du monde digital.
          </div>
        </div>
      </div>

      {/* BLOBS — zIndex: -1 */}
      <div style={{ position: "absolute", top: "50%", left: `${photoLeft}%`, transform: "translate(-50%, -50%)", width: "clamp(260px, 34vw, 480px)", height: "clamp(260px, 34vw, 480px)", zIndex: 5, overflow: "visible", transition: "left 0.9s cubic-bezier(0.22,1,0.36,1)" }}>
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#FF5F6D,#FFC371)", filter: "blur(90px)", animation: "blob1 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", left: -300, bottom: -80, width: "100%", height: "100%", background: "linear-gradient(135deg,#24C6DC,#514A9D)", filter: "blur(90px)", animation: "blob2 10s ease-in-out infinite" }} />
      </div>

      {/* PHOTO — zIndex: 10 */}
      <div style={{ position: "absolute", top: "50%", left: `${photoLeft}%`, transform: "translate(-50%, -50%)", width: "clamp(260px, 34vw, 480px)", height: "clamp(260px, 34vw, 480px)", zIndex: 10, overflow: "visible", transition: "left 0.9s cubic-bezier(0.22,1,0.36,1)", pointerEvents: "none" }}>
        <img
          src="/Design sans titre (1).png"
          alt="Portrait"
          style={{
            position: "absolute", left: "50%", bottom: "-220px",
            transform: `translate(-50%, 0) translate3d(${(mouseX - 0.5) * 120}px, ${(mouseY - 0.5) * 70}px, 0) rotate(${(mouseX - 0.5) * 10}deg) scale(1.03)`,
            width: "clamp(340px, 38vw, 620px)", height: "auto",
            zIndex: 40, pointerEvents: "none",
            transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
            filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.45)) brightness(1.04)",
            willChange: "transform",
          }}
        />
      </div>

      {/* MOVE EXPLORER */}
      <div className="move-explorer">
        <span
          className="move-explorer-label"
          style={{ color: `rgba(255,255,255,${0.4 + progress * 0.6})` }}
        >
          {progress > 0.6 ? "Lâchez !" : "Glissez vers le haut"}
        </span>
        <svg
          className="move-explorer-arrow"
          width="16" height="16" viewBox="0 0 16 16"
          fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.4 + progress * 0.6 }}
        >
          <path
            d="M8 13V3M3 7l5-5 5 5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
