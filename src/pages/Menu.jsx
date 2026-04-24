import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import menuData from '../data/menuData'
import ProductCard from '../components/ui/ProductCard'
import useCartStore from '../store/cartStore'

const CATEGORIES = [
  { key: 'all',       label: 'All' },
  { key: 'hot',       label: 'Hot Drinks' },
  { key: 'iced',      label: 'Iced Drinks' },
  { key: 'sweets',    label: 'Sweets' },
  { key: 'crepes',    label: 'Crepes' },
]

export default function Menu() {
  const [category, setCategory]     = useState('all')
  const [toastVisible, setToast]    = useState(false)
  const addItem                      = useCartStore((s) => s.addItem)

  const filtered =
    category === 'all' ? menuData : menuData.filter((d) => d.category === category)

  const handleAddToCart = (item) => {
    addItem(item)
    setToast(true)
  }

  useEffect(() => {
    if (!toastVisible) return
    const t = setTimeout(() => setToast(false), 2000)
    return () => clearTimeout(t)
  }, [toastVisible])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <motion.h1
          className="font-headline text-4xl md:text-5xl text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Morning Ritual
        </motion.h1>
        <motion.p
          className="text-on-surface-variant font-light mt-3 max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          Select from our curated collections of artisanal roasts and seasonal specialties.
        </motion.p>
        <motion.div
          className="h-0.5 accent-gradient rounded-full mt-6"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-3 mt-4 px-6 max-w-7xl mx-auto">
        {CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className="relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer overflow-hidden"
          >
            {category === key && (
              <motion.div
                layoutId="pillBackground"
                className="absolute inset-0 bg-primary rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 35 }}
              />
            )}
            <span className={`relative z-10 ${category === key ? 'text-on-primary' : 'text-on-surface-variant'}`}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-6 max-w-7xl mx-auto mt-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((item, index) => {
              const isFeaturedCard = item.isFeatured
              return (
                <motion.div
                  key={item.id}
                  layout
                  className={isFeaturedCard ? 'md:col-span-2' : ''}
                  initial={{ opacity: 0, scale: 0.9, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <ProductCard
                    {...item}
                    featured={isFeaturedCard}
                    onAddToCart={handleAddToCart}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-6 py-3 rounded-full text-sm font-medium ambient-shadow whitespace-nowrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            Added to your ritual ✓
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
