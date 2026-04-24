import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import menuData from '../../data/menuData'

const daily = menuData.find(d => d.id === 'frapp-lotus')

export default function DailyStrike() {
  return (
    <section className="py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <motion.p
          className="text-[10px] uppercase tracking-[0.3em] text-accent mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Today
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Image side ────────────────────────────────────────────── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            {/* Soft background shape */}
            <div
              className="absolute inset-0 -m-6 rounded-[50%] opacity-40 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(200,162,124,0.25) 0%, transparent 65%)' }}
            />

            <div className="relative group aspect-square max-w-md mx-auto rounded-3xl overflow-hidden ambient-shadow">
              <img
                src={daily.image}
                alt={daily.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />

              {/* Today's Pick badge */}
              <div className="absolute top-5 left-5 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 ambient-shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-primary font-medium">
                  Today's Pick
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Content side ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-accent mb-4">
              {daily.category}
            </p>

            <h2
              className="font-headline text-primary leading-[1.1] mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              {daily.name}
            </h2>

            <p className="text-on-surface-variant font-light leading-loose text-base mb-8 max-w-[42ch]">
              {daily.description} A coffee that makes the morning worth anticipating.
            </p>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { label: 'Origin', value: 'House Blend & Lotus' },
                { label: 'Process', value: 'Ice Blended' },
                { label: 'Tasting notes', value: 'Caramelized Biscuit' },
                { label: 'Price', value: `${daily.price} DZD` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-surface-low rounded-2xl px-4 py-4">
                  <p className="text-[9px] uppercase tracking-widest text-outline mb-1.5">{label}</p>
                  <p className="text-sm text-on-surface font-medium">{value}</p>
                </div>
              ))}
            </div>

            <Link
              to="/order"
              className="inline-flex items-center gap-2 primary-gradient text-on-primary px-9 py-3.5 rounded-full font-medium text-sm ambient-shadow hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
            >
              Order This Cup
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
