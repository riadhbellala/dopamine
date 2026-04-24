import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'
import useCartStore from '../../store/cartStore'

const navLinks = [
  { label: 'Home',  to: '/' },
  { label: 'Menu',  to: '/menu' },
  { label: 'Order', to: '/order' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [activeLink,  setActiveLink]  = useState(null)

  const navigate     = useNavigate()
  const totalItems   = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0))

  /* ── Scroll listener ──────────────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass border-b border-outline-variant/20 shadow-warm'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* ── Logo ──────────────────────────────────────────────────────────── */}
        <NavLink
          to="/"
          className="flex items-baseline gap-0.5 hover:opacity-80 transition-opacity duration-200 select-none"
        >
          <span className="font-headline font-bold text-2xl text-primary tracking-tight">
            Dopa
          </span>
          <span className="font-headline font-bold text-2xl text-accent tracking-tight">
            mine
          </span>
        </NavLink>

        {/* ── Desktop links ─────────────────────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map(({ label, to }) => (
            <li key={to} className="relative">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  [
                    'font-headline tracking-tight text-lg transition-colors duration-200 pb-0.5',
                    isActive
                      ? 'text-primary font-medium'
                      : 'text-on-surface-variant hover:text-primary',
                  ].join(' ')
                }
                onMouseEnter={() => setActiveLink(to)}
                onMouseLeave={() => setActiveLink(null)}
                end={to === '/'}
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Right: cart + hamburger ────────────────────────────────────────── */}
        <div className="flex items-center gap-4">
          {/* Cart icon */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/order')}
            aria-label="View cart"
            className="relative p-1 text-primary cursor-pointer"
          >
            <ShoppingBag size={24} strokeWidth={1.7} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-on-primary text-[10px] font-semibold flex items-center justify-center"
              >
                {totalItems > 9 ? '9+' : totalItems}
              </motion.span>
            )}
          </motion.button>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-1 text-primary cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={24} strokeWidth={1.7} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={24} strokeWidth={1.7} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden glass border-b border-outline-variant/20"
          >
            <ul className="flex flex-col gap-6 px-8 py-6 list-none">
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      [
                        'font-headline tracking-tight text-lg transition-colors duration-200',
                        isActive
                          ? 'text-primary font-medium'
                          : 'text-on-surface-variant',
                      ].join(' ')
                    }
                    onClick={() => setMobileOpen(false)}
                    end={to === '/'}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
