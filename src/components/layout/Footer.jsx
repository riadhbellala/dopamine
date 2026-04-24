import { NavLink } from 'react-router-dom'

const footerLinks = ['Menu', 'Order', 'About']

export default function Footer() {
  return (
    <footer className="bg-surface-low border-t border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-8 py-16">

        {/* ── Three columns ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">

          {/* Left — Brand ────────────────────────────────────────────────────── */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <NavLink
              to="/"
              className="flex items-baseline gap-0.5 hover:opacity-80 transition-opacity duration-200 select-none"
            >
              <span className="font-headline font-bold text-2xl text-primary tracking-tight">
                dopa
              </span>
              <span className="font-headline font-bold text-2xl text-accent tracking-tight">
                mine
              </span>
            </NavLink>

            <p className="text-sm text-on-surface-variant font-light leading-relaxed max-w-[22ch]">
              Precision coffee. Calm space.
            </p>

            <p className="text-xs uppercase tracking-[0.15em] text-outline mt-1">
              Batna, Algeria
            </p>
          </div>

          {/* Center — Hours ──────────────────────────────────────────────────── */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-xs uppercase tracking-[0.15em] text-outline font-medium">
              Hours
            </p>
            <div className="flex flex-col gap-1.5 text-sm text-on-surface-variant">
              <div className="flex justify-between gap-8">
                <span>Mon – Fri</span>
                <span className="text-on-surface">08:00 – 20:00</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>Sat – Sun</span>
                <span className="text-on-surface">09:00 – 18:00</span>
              </div>
            </div>
          </div>

          {/* Right — Social ──────────────────────────────────────────────────── */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-xs uppercase tracking-[0.15em] text-outline font-medium">
              Follow Us
            </p>
            <div className="flex flex-col gap-2.5 md:flex-col">
              {[
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'Facebook',  href: 'https://facebook.com' },
                { label: 'Twitter',   href: 'https://twitter.com'  },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-widest text-outline hover:text-primary transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-outline-variant/30 text-sm text-outline">
          <p>
            © {new Date().getFullYear()} Dopamine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
