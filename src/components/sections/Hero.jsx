import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import menuData from '../../data/menuData'

const FEATURED = [
  {
    ...menuData.find(d => d.id === 'golden-roast'),
    tagline: 'A honey-kissed Ethiopian with dark caramel warmth. Your morning deserves this.',
  },
  {
    ...menuData.find(d => d.id === 'cloud-latte'),
    tagline: 'Oat milk and Ethiopian espresso — as light and airy as the morning feels.',
  },
  {
    ...menuData.find(d => d.id === 'silent-strike'),
    tagline: 'Double ristretto over black ice. Intense, deliberate, unforgettable.',
  },
  {
    ...menuData.find(d => d.id === 'amber-cold-brew'),
    tagline: 'Twenty-four hours of patience. One extraordinary cold cup.',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  // Always-on ticker — resets whenever `current` changes (including manual dot clicks)
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(prev => (prev + 1) % FEATURED.length)
    }, 5000)
    return () => clearInterval(t)
  }, [current])

  const product = FEATURED[current]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">

      {/* ── Soft radial glow behind image ───────────────────────────── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 560, height: 560,
          background: 'radial-gradient(circle, rgba(200,162,124,0.18) 0%, transparent 70%)',
        }}
      />

      {/* ── Floating decorative blobs ────────────────────────────────── */}
      <div className="absolute top-32 left-16 w-3 h-3 rounded-full bg-accent/30 animate-float" />
      <div className="absolute top-48 right-20 w-2 h-2 rounded-full bg-accent/20 animate-float-slow" />
      <div className="absolute bottom-40 left-24 w-4 h-4 rounded-full bg-primary/10 animate-float-slower" />
      <div className="absolute bottom-52 right-16 w-2.5 h-2.5 rounded-full bg-accent/25 animate-float" style={{ animationDelay: '3s' }} />
      {/* Organic shape blobs */}
      <div
        className="absolute top-16 right-32 pointer-events-none opacity-60"
        style={{ width: 180, height: 180, background: 'radial-gradient(ellipse, rgba(200,162,124,0.12) 0%, transparent 70%)', borderRadius: '60% 40% 70% 30%' }}
      />
      <div
        className="absolute bottom-24 left-32 pointer-events-none opacity-50"
        style={{ width: 140, height: 140, background: 'radial-gradient(ellipse, rgba(107,79,58,0.07) 0%, transparent 70%)', borderRadius: '40% 60% 30% 70%' }}
      />

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto pt-24 pb-12">

        {/* Label */}
        <motion.p
          className="text-[10px] uppercase tracking-[0.3em] text-accent mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Specialty Coffee · Batna, Algeria
        </motion.p>

        {/* Static headline */}
        <motion.h1
          className="font-headline text-primary leading-tight mb-10"
          style={{ fontSize: 'clamp(40px, 6.5vw, 80px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Start Your Day
          <br />
          <em className="text-accent">With a Strike.</em>
        </motion.h1>

        {/* ── Product image (crossfade) ──────────────────────────────── */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
          <AnimatePresence mode="wait">
            <motion.img
              key={`img-${current}`}
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover rounded-full"
              style={{
                boxShadow: '0 24px 60px rgba(107,79,58,0.18), 0 8px 24px rgba(107,79,58,0.10)',
              }}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            />
          </AnimatePresence>
        </div>

        {/* ── Dynamic text (crossfade) ───────────────────────────────── */}
        <div className="min-h-[88px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <p className="font-headline text-2xl md:text-3xl text-primary font-semibold">
                {product.name}
              </p>
              <p className="text-on-surface-variant font-light text-sm md:text-base max-w-[38ch] leading-relaxed">
                {product.tagline}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Link
            to="/menu"
            className="primary-gradient text-on-primary px-10 py-3.5 rounded-full font-medium text-sm ambient-shadow hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
          >
            Explore Menu
          </Link>

          {/* Navigation dots */}
          <div className="flex items-center gap-2.5">
            {FEATURED.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Product ${i + 1}`}
                className={`rounded-full transition-all duration-400 cursor-pointer ${
                  i === current
                    ? 'w-6 h-2 bg-primary'
                    : 'w-2 h-2 bg-outline-variant hover:bg-outline'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>


    </section>
  )
}
