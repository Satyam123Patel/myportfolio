import { useState, useEffect } from 'react'
import './BackgroundClock.css'

export default function BackgroundClock() {
  // ─── STARS GENERATION ──────────────────────────────────────────────────────
  const [stars, setStars] = useState([])
  useEffect(() => {
    const starList = Array.from({ length: 110 }).map((_, i) => ({
      id: i,
      size: Math.random() * 1.6 + 0.4,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.35 + 0.04
    }))
    setStars(starList)
  }, [])

  // ─── CLOCK STATE & PARAMETERS ──────────────────────────────────────────────
  const [time, setTime] = useState(new Date())
  const [progress, setProgress] = useState(0)

  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  function pad(n) {
    return String(Math.floor(Math.abs(n))).padStart(2, '0')
  }

  // ─── TICK INTERVAL (24-Hour Format Only) ──────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setTime(now)

      const h24 = now.getHours()
      const m = now.getMinutes()
      const s = now.getSeconds()
      const ms = now.getMilliseconds()

      const secOfDay = h24 * 3600 + m * 60 + s + ms / 1000
      const prog = secOfDay / 86400
      setProgress(prog)
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // ─── SAND GRAPHICS PATH GENERATOR ──────────────────────────────────────────
  const p = Math.min(1, Math.max(0, progress))

  // LERP Helper
  const lerp = (a, b, t) => a + (b - a) * t

  // TOP: full = surface at y=12, empty = surface at y=147 (neck)
  const topY = lerp(12, 147, p)
  const topLX = lerp(12, 77, p)
  const topRX = lerp(158, 93, p)
  const topPoints = `${topLX},${topY} ${topRX},${topY} 93,147 77,147`
  const topSurfCx = (topLX + topRX) / 2
  const topSurfCy = topY
  const topSurfRx = Math.max(2, (topRX - topLX) / 2)

  // BOTTOM: empty = surface at y=295, full = surface at y=156 (neck)
  const botY = lerp(295, 156, p)
  const botLX = lerp(12, 77, p)
  const botRX = lerp(158, 93, p)
  const botPoints = `${botLX},${botY} ${botRX},${botY} 158,295 12,295`

  // Hide stream when finished
  const streamOpacity = p > 0.988 ? 0 : 1

  // Display fields for Live Clock Card (24-Hour Format)
  const dispHours = time.getHours()
  const dispMinutes = time.getMinutes()
  const dispSeconds = time.getSeconds()
  const dispDateStr = `${DAYS[time.getDay()]} · ${MONTHS[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}`

  return (
    <>
      {/* ─── BACKGROUND LAYERS ─── */}
      <div className="ambient"></div>
      <div id="stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity
            }}
          />
        ))}
      </div>

      {/* ─── BACKGROUND CLOCK WATERMARK ─── */}
      <div className="background-clock-container">
        {/* Hourglass */}
        <div className="hg-wrap">
          <svg viewBox="0 0 170 310" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(124, 58, 237, 0.14)" />
                <stop offset="30%" stop-color="rgba(192, 132, 252, 0.38)" />
                <stop offset="55%" stop-color="rgba(167, 139, 250, 0.18)" />
                <stop offset="100%" stop-color="rgba(124, 58, 237, 0.18)" />
              </linearGradient>
              <linearGradient id="stg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="var(--accent)" />
                <stop offset="60%" stop-color="var(--accent)" />
                <stop offset="100%" stop-color="var(--accent-secondary)" />
              </linearGradient>
              <linearGradient id="sbg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="var(--accent-secondary)" />
                <stop offset="100%" stop-color="var(--accent)" />
              </linearGradient>
              <linearGradient id="rimG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(167, 139, 250, 0.12)" />
                <stop offset="50%" stop-color="rgba(167, 139, 250, 0.35)" />
                <stop offset="100%" stop-color="rgba(167, 139, 250, 0.12)" />
              </linearGradient>
              <clipPath id="tc"><polygon points="12,12 158,12 93,147 77,147" /></clipPath>
              <clipPath id="bc"><polygon points="77,156 93,156 158,295 12,295" /></clipPath>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="softglow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base rim shadow */}
            <rect x="6" y="297" width="158" height="10" rx="4" fill="rgba(0,0,0,0.4)" />

            {/* Bottom cap */}
            <rect
              x="6"
              y="290"
              width="158"
              height="13"
              rx="4"
              fill="url(#rimG)"
              stroke="rgba(167, 139, 250, 0.35)"
              strokeWidth="1.2"
            />
            {/* Top cap */}
            <rect
              x="6"
              y="7"
              width="158"
              height="13"
              rx="4"
              fill="url(#rimG)"
              stroke="rgba(167, 139, 250, 0.35)"
              strokeWidth="1.2"
            />

            {/* Glass body — top chamber */}
            <polygon
              points="12,12 158,12 93,147 77,147"
              fill="url(#cg)"
              stroke="rgba(167, 139, 250, 0.35)"
              strokeWidth="1.3"
            />
            {/* Glass body — bottom chamber */}
            <polygon
              points="77,156 93,156 158,295 12,295"
              fill="url(#cg)"
              stroke="rgba(167, 139, 250, 0.35)"
              strokeWidth="1.3"
            />

            {/* Neck sleeve */}
            <rect
              x="77"
              y="147"
              width="16"
              height="9"
              rx="3"
              fill="rgba(167, 139, 250, 0.2)"
              stroke="rgba(167, 139, 250, 0.42)"
              strokeWidth="1.1"
            />

            {/* SAND TOP */}
            <g clipPath="url(#tc)">
              <polygon id="sandTop" fill="url(#stg)" opacity="0.9" points={topPoints} />
              <ellipse
                id="sandTopSurf"
                cx={topSurfCx}
                cy={topSurfCy}
                rx={topSurfRx}
                ry="3.5"
                fill="var(--accent-secondary)"
                opacity="0.6"
              />
            </g>

            {/* SAND BOTTOM */}
            <g clipPath="url(#bc)">
              <polygon id="sandBot" fill="url(#sbg)" opacity="0.9" points={botPoints} />
              <line
                id="sandBotLine"
                x1={botLX}
                x2={botRX}
                y1={botY}
                y2={botY}
                stroke="var(--accent)"
                strokeWidth="2"
                opacity="0.6"
              />
            </g>

            {/* Falling stream */}
            <g id="streamG" filter="url(#glow)" opacity={streamOpacity}>
              <line x1="85" y1="147" x2="85" y2="230" stroke="url(#stg)" strokeWidth="1.8" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.18;0.5" dur="0.85s" repeatCount="indefinite" />
              </line>
              {/* Sand grains */}
              <circle cx="85" cy="156" r="1.4" fill="var(--accent)">
                <animateMotion path="M0,0 L0,76" dur="1.0s" repeatCount="indefinite" begin="0s" />
                <animate attributeName="opacity" values="1;0" dur="1.0s" repeatCount="indefinite" begin="0s" />
              </circle>
              <circle cx="85" cy="156" r="1.1" fill="var(--accent-secondary)">
                <animateMotion path="M-1.5,0 L2,76" dur="1.25s" repeatCount="indefinite" begin="0.28s" />
                <animate attributeName="opacity" values="1;0" dur="1.25s" repeatCount="indefinite" begin="0.28s" />
              </circle>
              <circle cx="85" cy="156" r="1.5" fill="var(--accent)">
                <animateMotion path="M1.5,0 L-1.5,76" dur="0.98s" repeatCount="indefinite" begin="0.52s" />
                <animate attributeName="opacity" values="1;0" dur="0.98s" repeatCount="indefinite" begin="0.52s" />
              </circle>
              <circle cx="85" cy="156" r="1.2" fill="var(--accent-secondary)">
                <animateMotion path="M-2,0 L1,76" dur="1.18s" repeatCount="indefinite" begin="0.16s" />
                <animate attributeName="opacity" values="1;0" dur="1.18s" repeatCount="indefinite" begin="0.16s" />
              </circle>
            </g>

            {/* Glass reflections / highlights */}
            <polygon points="16,18 34,18 78,138 68,147" fill="rgba(255,255,255,0.06)" />
            <polygon points="142,18 158,18 98,147 90,147" fill="rgba(255,255,255,0.03)" />
            <polygon points="16,295 28,295 78,168 72,156" fill="rgba(255,255,255,0.03)" />

            {/* Neck glow */}
            <ellipse cx="85" cy="151" rx="16" ry="4.5" fill="var(--accent-bg)" filter="url(#softglow)" />
          </svg>
        </div>

        {/* Live Clock Card */}
        <div className="clock-card">
          <div className="clock-time">
            <span>{pad(dispHours)}</span>
            <span className="colon">:</span>
            <span>{pad(dispMinutes)}</span>
            <span className="colon">:</span>
            <span>{pad(dispSeconds)}</span>
          </div>
          <div className="clock-date">{dispDateStr}</div>
          <div className="progress-wrap">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${(p * 100).toFixed(1)}%` }}></div>
            </div>
            <div className="progress-labels">
              <span>00:00</span>
              <span>{Math.round(p * 100)}%</span>
              <span>23:59</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
