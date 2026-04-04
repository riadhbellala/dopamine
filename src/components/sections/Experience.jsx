import { motion } from 'framer-motion'
import { Wind, Droplets, Award } from 'lucide-react'

const pillars = [
  {
    Icon: Wind,
    title: 'Calm Atmosphere',
    desc: `A space where time slows and your thoughts find room to breathe. We designed it that way.`,
    color: 'bg-secondary-container',
  },
  {
    Icon: Droplets,
    title: 'Crafted Drinks',
    desc: `Every pour is measured. Every shot is timed. The difference between good and exceptional lives in the details.`,
    color: 'bg-tertiary-fixed',
  },
  {
    Icon: Award,
    title: 'Premium Quality',
    desc: `Only beans that earn their place in your cup make it this far. The rest we simply don't serve.`,
    color: 'bg-surface-container',
  },
]

export default function Experience() {
  return (
    <section className="py-28 px-6 bg-surface-low">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center max-w-xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-5">The Experience</p>
          <h2
            className="font-headline text-primary leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}
          >
            More than coffee.
            <br />
            <em>A feeling.</em>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map(({ Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              className="group bg-background rounded-3xl p-9 ambient-shadow hover:ambient-shadow-md transition-all duration-400 cursor-default"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              {/* Icon circle */}
              <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110`}>
                <Icon size={20} className="text-primary" strokeWidth={1.5} />
              </div>

              <h3 className="font-headline text-xl text-primary mb-4">{title}</h3>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed">{desc}</p>

              {/* Bottom line */}
              <div className="h-px w-0 group-hover:w-full bg-accent/30 transition-all duration-500 mt-8" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
