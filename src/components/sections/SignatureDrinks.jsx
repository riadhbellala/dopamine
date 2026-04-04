import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import menuData from '../../data/menuData'
import useCartStore from '../../store/cartStore'

const drinks = menuData.filter(d => d.isSignature || d.isFeatured)

export default function SignatureDrinks() {
  const addItem = useCartStore(s => s.addItem)

  return (
    <section className="py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-5">
              Signature Collection
            </p>
            <h2
              className="font-headline text-primary leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              Drinks we refuse
              <br />
              <em className="text-accent">to simplify.</em>
            </h2>
          </div>
          <Link
            to="/menu"
            className="group flex items-center gap-2 text-sm text-primary border-b border-primary/25 pb-1 hover:border-primary transition-colors self-end whitespace-nowrap"
          >
            Full menu
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {drinks.map((drink, i) => (
            <motion.article
              key={drink.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Image container */}
              <div className="relative aspect-square rounded-3xl overflow-hidden mb-6 bg-surface-low">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ transform: 'scale(1)' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Gradient bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Badges */}
                {drink.isSignature && (
                  <span className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-[9px] uppercase tracking-[0.18em] text-primary px-3 py-1.5 rounded-full">
                    Signature
                  </span>
                )}
                {drink.isFeatured && (
                  <span className="absolute top-4 left-4 bg-primary text-on-primary text-[9px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full">
                    Today's Pick
                  </span>
                )}
              </div>

              {/* Info */}
              <h3 className="font-headline text-xl text-primary mb-2">{drink.name}</h3>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed line-clamp-2 mb-4">
                {drink.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-accent font-medium text-base">{drink.price} DZD</span>
                <button
                  onClick={() => addItem(drink)}
                  className="text-[10px] uppercase tracking-[0.2em] text-primary border-b border-primary/20 pb-0.5 hover:border-primary transition-colors cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Add +
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
