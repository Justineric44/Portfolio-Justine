"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
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

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
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
          cursor: none;
        }

        .nav-back:hover {
          color: rgba(255,255,255,0.8);
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 600px;
        }

        .input, .textarea {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          padding: 14px 16px;
          color: #F5F2EC;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border 0.2s ease;
        }

        .input:focus, .textarea:focus {
          border-color: rgba(255,255,255,0.4);
        }

        .textarea {
          min-height: 140px;
          resize: none;
        }

        .button {
          background: #F5F2EC;
          color: #0A0A0A;
          padding: 14px 18px;
          border: none;
          cursor: none;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-size: 12px;
          transition: transform 0.2s ease;
        }

        .button:hover {
          transform: scale(1.02);
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
        <a href="/" className="nav-back" onClick={goBack}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          Retour
        </a>

        <span style={{ fontSize: 20 }}><a href="/">Justine Ricaud</a></span>

        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          Contact
        </span>
      </header>

      <div className="divider" />

      {/* TITLE */}
      <div
        style={{
          padding: "40px 48px 0px",
          opacity: entered ? 1 : 0,
          animation: entered
            ? "fadeSlideUp 0.8s 0.1s ease both"
            : "none",
        }}
      >
        <div style={{ fontSize: "clamp(20px, 10vw, 120px)",
          lineHeight: 0.88,
            letterSpacing: "0.02em",
        }}>
          CONTACT
        </div>
        <div
          style={{
            fontSize: "clamp(20px, 10vw, 120px)",
            lineHeight: 0.88,
            WebkitTextStroke: "1px rgba(255,255,255,0.22)",
            color: "transparent",
            marginLeft: "clamp(30px, 8vw, 140px)",
          }}
        >
          ME
        </div>
      </div>

      {/* FORM */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 20px 60px",
          opacity: entered ? 1 : 0,
          animation: entered
            ? "fadeSlideUp 0.9s 0.2s ease both"
            : "none",
        }}
      >
        <form
          className="form"
          style={{
            width: "100%",
            maxWidth: "900px",
            gap: "26px",
          }}
        >
          <input className="input" placeholder="Nom" />
          <input className="input" placeholder="Email" />
          <input className="input" placeholder="Sujet" />

          <textarea
            className="textarea"
            placeholder="Message"
            style={{
              minHeight: "220px",
            }}
          />

          <button
            className="button"
            type="submit"
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "18px",
              letterSpacing: "0.25em",
            }}
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
