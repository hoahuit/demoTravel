import React from 'react';
import tracedPaths from '../data/tracedPaths.json';

interface HeroSvgSketchProps {
  isDissolving?: boolean;
}

export default function HeroSvgSketch({ isDissolving = false }: HeroSvgSketchProps) {
  return (
    <div
      className={`hero-sketch-container ${isDissolving ? 'is-dissolving' : ''}`}
      aria-hidden="true"
    >
      <svg
        className="hero-sketch-svg"
        viewBox="0 0 5952 3968"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Authentic Charcoal / Graphite Pencil Gradients */}
          <linearGradient id="pencilDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="pencilMedium" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#475569" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="pencilFaint" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* ── FRAME 02: VẼ VÁCH NÚI TRÁI (0.2s - 0.8s) ── */}
        <g id="left-cliff">
          <path
            className="draw-stroke stage-01-left-main"
            d={tracedPaths.leftCliff}
            stroke="url(#pencilDark)"
            strokeWidth="1.2"
            fill="rgba(30, 41, 59, 0.04)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* ── FRAME 03: VẼ VÁCH NÚI PHẢI (0.75s - 1.4s) ── */}
        <g id="right-cliff">
          <path
            className="draw-stroke stage-03-right-main"
            d={tracedPaths.rightCliff}
            stroke="url(#pencilDark)"
            strokeWidth="1.2"
            fill="rgba(30, 41, 59, 0.04)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* ── FRAME 04: VẼ NÚI PHÍA SAU (1.35s - 1.9s) ── */}
        <g id="background-mountains">
          <path
            className="draw-stroke stage-04-bg-mountain-1"
            d={tracedPaths.bgMountains}
            stroke="url(#pencilFaint)"
            strokeWidth="1.0"
            fill="rgba(100, 116, 139, 0.03)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* ── FRAME 05: VẼ NHÀ + CÂY (1.85s - 2.5s) ── */}
        <g id="houses">
          <path
            className="draw-stroke stage-05-house-main"
            d={tracedPaths.housesAndTrees}
            stroke="url(#pencilDark)"
            strokeWidth="1.3"
            fill="rgba(15, 23, 42, 0.05)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* ── FRAME 06: VẼ MẶT NƯỚC & REFLECTION (2.45s - 3.1s) ── */}
        <g id="water">
          <path
            className="draw-stroke stage-08-water-ripples"
            d={tracedPaths.waterAndReflection}
            stroke="url(#pencilMedium)"
            strokeWidth="1.1"
            fill="rgba(51, 65, 85, 0.03)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* ── FRAME 07: HOÀN THIỆN LINE ART (3.05s - 3.45s) ── */}
        <g id="details" className="stage-10-details">
          {/* Sky birds */}
          <g stroke="url(#pencilMedium)" strokeWidth="1.2" fill="none" strokeLinecap="round">
            <path d="M 440,110 Q 448,102 456,110 Q 464,102 472,110" />
            <path d="M 480,95 Q 486,88 492,95 Q 498,88 504,95" />
            <path d="M 415,130 Q 421,123 427,130 Q 433,123 439,130" />
          </g>
        </g>
      </svg>
    </div>
  );
}
