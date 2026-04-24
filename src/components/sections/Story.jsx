import { motion } from 'framer-motion'

export default function Story() {
  return (
    <section className="py-28 px-6 bg-surface-low overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* ── Two-column alternating layout ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Decorative blob behind image */}
            <div
              className="absolute -inset-8 rounded-[40%_60%_55%_45%] opacity-50"
              style={{ background: 'radial-gradient(ellipse, rgba(200,162,124,0.20) 0%, transparent 70%)' }}
            />
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800"
                alt="Dopamine bar"
                className="w-full h-full object-cover"
              />
              {/* Warm tint overlay */}
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            {/* Small floating badge */}
            <div className="absolute -bottom-5 -right-4 md:-right-8 bg-background rounded-2xl px-5 py-4 ambient-shadow border border-outline-variant/20">
              <p className="text-[9px] uppercase tracking-[0.22em] text-accent mb-1">Since</p>
              <p className="font-headline text-2xl text-primary font-bold leading-none">2024</p>
              <p className="text-[10px] text-on-surface-variant mt-1">Batna, Algeria</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-accent mb-6">Our Story</p>

            <h2
              className="font-headline text-primary leading-tight mb-8"
              style={{ fontSize: 'clamp(32px, 4.5vw, 54px)' }}
            >
              Every cup
              <br />
              <em>tells a story.</em>
            </h2>

            <div className="space-y-5 text-on-surface-variant font-light leading-loose text-base">
              <p>
                At Dopamine, we believe that great coffee is not an accident — it is the result
                of intention. From the moment a bean is sourced to the last sip you take, every step
                is deliberate, every choice considered.
              </p>
              <p>
                We blend passion with precision. Our baristas are craftspeople. Our space is
                a sanctuary. And our coffee? It is Batna's finest — because this city deserves nothing less.
              </p>
            </div>

            {/* Divider with stat */}
            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-outline-variant/30">
              {[
                { value: '10+', label: 'Signature drinks' },
                { value: '93°', label: 'Perfect extraction' },
                { value: '∞',   label: 'Cups of care' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-headline text-2xl text-primary font-semibold">{value}</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
