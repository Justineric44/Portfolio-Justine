"use client";

import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Mes projets", "A propos", "Contact"];

export default function PortfolioLanding() {
  const [mouseX, setMouseX] = useState(0.5);
  const [mouseY, setMouseY] = useState(0.5);
  const [entered, setEntered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setMouseX((e.clientX - rect.left) / rect.width);
    setMouseY((e.clientY - rect.top) / rect.height);
  };

  const splitX = mouseX * 100;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        width: "100%",
        height: "100vh",
        minHeight: 600,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Bebas Neue', sans-serif",
        cursor: "none",
        background: "#000",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob1 {
          0%,100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
        }

        @keyframes blob2 {
          0%,100% {
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          }
          50% {
            border-radius: 70% 30% 40% 60% / 30% 70% 50% 60%;
          }
        }

        @keyframes cursorPulse {
          0%,100% {
            transform: translate(-50%,-50%) scale(1);
          }
          50% {
            transform: translate(-50%,-50%) scale(1.3);
          }
        }

        .cursor {
          position: fixed;
          width: 18px;
          height: 18px;
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

        .nav-link:hover {
          opacity: 0.5;
        }

        .cta-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: 1px solid currentColor;
          background: transparent;
          padding: 12px 26px;
          transition: all 0.3s ease;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
        }
      `}</style>

      {/* CURSOR */}
      <div
        className="cursor"
        style={{
          left: mouseX * (containerRef.current?.offsetWidth ?? 800),
          top: mouseY * (containerRef.current?.offsetHeight ?? 600),
        }}
      />

      {/* LIGHT SIDE */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#F5F2EC",
          clipPath: `inset(0 ${100 - splitX}% 0 0)`,
          transition: "clip-path 0.08s linear",
        }}
      >
        <nav
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "28px 48px",
            zIndex: 50,
          }}
        >
          <span
            style={{
              fontSize: 22,
              color: "#111",
              letterSpacing: "0.05em",
            }}
          >
            Justine Ricaud
          </span>

          <div style={{ display: "flex", gap: 36 }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="nav-link"
                style={{ color: "#111" }}
              >
                {link}
              </a>
            ))}
          </div>
        </nav>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 48,
            transform: "translateY(-50%)",
            zIndex: 30,
            animation: entered ? "fadeUp 1s ease both" : "none",
          }}
        >
          <div
            style={{
              fontSize: "clamp(90px, 13vw, 180px)",
              lineHeight: 0.9,
              color: "#111",
            }}
          >
            DESIGN
          </div>

          <div
            style={{
              marginTop: 24,
              maxWidth: 240,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              lineHeight: 1.7,
              color: "#555",
            }}
          >
            Concevoir des espaces, physiques et numériques
          </div>
        </div>
      </div>

      {/* DARK SIDE */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0A0A0A",
          clipPath: `inset(0 0 0 ${splitX}%)`,
          transition: "clip-path 0.08s linear",
        }}
      >
        <nav
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "28px 48px",
            zIndex: 50,
          }}
        >
          <span
            style={{
              fontSize: 22,
              color: "#F5F2EC",
              letterSpacing: "0.05em",
            }}
          >
            Justine Ricaud
          </span>

          <div style={{ display: "flex", gap: 36 }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="nav-link"
                style={{ color: "#F5F2EC" }}
              >
                {link}
              </a>
            ))}
          </div>
        </nav>

        <div
          style={{
            position: "absolute",
            top: "50%",
            right: 48,
            transform: "translateY(-50%)",
            textAlign: "right",
            zIndex: 30,
            animation: entered ? "fadeUp 1s ease both" : "none",
          }}
        >
          <div
            style={{
              fontSize: "clamp(90px, 13vw, 180px)",
              lineHeight: 0.9,
              color: "#F5F2EC",
            }}
          >
            CODE
          </div>

          <div
            style={{
              marginTop: 24,
              maxWidth: 240,
              marginLeft: "auto",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              lineHeight: 1.7,
              color: "#888",
            }}
          >
            Les créateurs invisibles du monde digital.
          </div>
        </div>
      </div>

      {/* BLOBS */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-10%, -50%)",
          width: "clamp(260px, 34vw, 480px)",
          height: "clamp(260px, 34vw, 480px)",
          zIndex: 10,
          overflow: "visible",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg,#FF5F6D,#FFC371)",
            filter: "blur(90px)",
            animation: "blob1 8s ease-in-out infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: -300,
            bottom: -80,
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg,#24C6DC,#514A9D)",
            filter: "blur(90px)",
            animation: "blob2 10s ease-in-out infinite",
          }}
        />

        {/* PHOTO */}
        <img
          src="/Design sans titre (1).png"
          alt="Portrait"
          style={{
            position: "absolute",
            left: "10%",
            bottom: "-220px",
            transform: `
              translate(-50%, 0)
              translate3d(
                ${(mouseX - 0.5) * 120}px,
                ${(mouseY - 0.5) * 70}px,
                0
              )
              rotate(${(mouseX - 0.5) * 10}deg)
              scale(1.03)
            `,
            width: "clamp(340px, 38vw, 620px)",
            height: "auto",
            zIndex: 40,
            pointerEvents: "none",
            transition: `
              left 0.9s cubic-bezier(0.22,1,0.36,1),
              transform 0.25s cubic-bezier(0.22,1,0.36,1)
            `,
            filter: `
              drop-shadow(0 40px 80px rgba(0,0,0,0.45))
              brightness(1.04)
            `,
            willChange: "transform, left",
          }}
        />
      </div>
    </div>
  );
}