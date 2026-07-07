import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'

const LINKS = [
  { label: 'Story',    href: '#story'    },
  { label: 'Titans',   href: '#titans'   },
  { label: 'Soldiers', href: '#soldiers' },
  { label: 'Walls',    href: '#walls'    },
  { label: 'Chronicle',href: '#chronicle'},
]

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [activeLink,  setActiveLink]  = useState(null)
  const indicatorRef = useRef(null)
  const linksRef     = useRef([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const moveIndicator = (i) => {
    const el  = linksRef.current[i]
    const bar = indicatorRef.current
    if (!el || !bar) return
    const rect = el.getBoundingClientRect()
    const parentRect = el.closest('.navbar__links').getBoundingClientRect()
    bar.style.width = `${rect.width}px`
    bar.style.transform = `translateX(${rect.left - parentRect.left}px)`
    bar.style.opacity = '1'
  }

  const hideIndicator = () => {
    if (indicatorRef.current) indicatorRef.current.style.opacity = '0'
    setActiveLink(null)
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}>

        <div className="navbar__rule navbar__rule--left" />

        <a href="#" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <img src="/images/logo.png" alt="Attack on Titan" className="navbar__logo-img" />
          <span className="navbar__logo-text">
            <span className="navbar__logo-main">ATTACK</span>
            <span className="navbar__logo-sub">ON TITAN</span>
          </span>
        </a>

        <ul className="navbar__links" onMouseLeave={hideIndicator}>
          {LINKS.map((link, i) => (
            <li key={link.label}>
              <a
                ref={el => linksRef.current[i] = el}
                href={link.href}
                className={`navbar__link ${activeLink === i ? 'navbar__link--active' : ''}`}
                onMouseEnter={() => { setActiveLink(i); moveIndicator(i) }}
              >
                <span className="navbar__link-num">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
          <div className="navbar__indicator" ref={indicatorRef} />
        </ul>

        <a href="https://github.com/Mohammad-Asfin/ATTACK-ON-TITAN.git" target="_blank" rel="noopener noreferrer" className="navbar__cta">
          <span className="navbar__cta-inner">
            <span>GitHub</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </span>
          <span className="navbar__cta-bg" />
        </a>

        <div className="navbar__rule navbar__rule--right" />

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

      </nav>

      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}>
        <div className="navbar__drawer-inner">
          {LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__drawer-link"
              style={{ '--i': i }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="navbar__drawer-num">0{i + 1}</span>
              {link.label}
            </a>
          ))}
          <a href="https://github.com/Mohammad-Asfin/ATTACK-ON-TITAN.git" target="_blank" rel="noopener noreferrer" className="navbar__drawer-cta" onClick={() => setMenuOpen(false)}>
            GitHub
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar