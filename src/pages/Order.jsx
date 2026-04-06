import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import menuData from '../data/menuData'
import useCartStore from '../store/cartStore'

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'hot', label: 'Hot Drinks' },
  { key: 'iced', label: 'Iced' },
  { key: 'sweets', label: 'Sweets' },
  { key: 'crepes', label: 'Crepes' },
]

const SIZES = [
  { key: 'small',  label: 'Small',  adj: -50 },
  { key: 'medium', label: 'Medium', adj: 0 },
  { key: 'large',  label: 'Large',  adj: +80 },
]

const EXTRAS = [
  { label: 'Extra Shot',    price: 100 },
  { label: 'Oat Milk',      price: 80  },
  { label: 'Vanilla Syrup', price: 60  },
  { label: 'Whipped Cream', price: 70  },
]

export default function Order() {
  const [category,      setCategory]      = useState('all')
  const [selectedItem,  setSelectedItem]  = useState(null)
  const [size,          setSize]          = useState('medium')
  const [sugar,         setSugar]         = useState(2)
  const [extras,        setExtras]        = useState([])
  const [confirmed,     setConfirmed]     = useState(false)

  const { items, addItem, removeItem } = useCartStore()

  const filtered =
    category === 'all' ? menuData : menuData.filter((d) => d.category === category)

  const toggleExtra = (label) =>
    setExtras((prev) =>
      prev.includes(label) ? prev.filter((e) => e !== label) : [...prev, label]
    )

  const isDrink = selectedItem && (selectedItem.category === 'hot' || selectedItem.category === 'iced')

  const sizeAdj  = (isDrink && SIZES.find((s) => s.key === size)?.adj) || 0
  const extrasTotal = isDrink ? extras.reduce(
    (sum, label) => sum + (EXTRAS.find((e) => e.label === label)?.price ?? 0),
    0
  ) : 0
  const itemTotal = selectedItem ? selectedItem.price + sizeAdj + extrasTotal : 0

  const cartTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const handleSelect = (item) => {
    setSelectedItem(item)
    setSize('medium')
    setSugar(2)
    setExtras([])
    setConfirmed(false)
  }

  const handleAddToRitual = () => {
    if (!selectedItem) return
    const cartItemData = isDrink
      ? { ...selectedItem, size, sugar, extras, price: itemTotal }
      : { ...selectedItem, price: itemTotal }

    addItem(cartItemData)
    setSelectedItem(null)
    setConfirmed(true)
    setTimeout(() => setConfirmed(false), 2000)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">

        {/* ── Left: Menu grid ─────────────────────────────────────────── */}
        <div className="flex-1">
          <h1 className="font-headline text-3xl text-primary mb-2">Build Your Ritual</h1>
          <p className="text-on-surface-variant text-sm mb-8">
            Select a drink to customize and add to your order.
          </p>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-3 mb-6">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  category === key
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-low text-on-surface-variant hover:text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Items list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`flex items-center gap-4 p-4 rounded-2xl bg-surface-low hover:bg-surface-container transition-colors cursor-pointer border-2 text-left w-full ${
                  selectedItem?.id === item.id ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-headline text-primary text-base">{item.name}</p>
                  <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>
                <span className="text-accent font-medium text-sm ml-auto whitespace-nowrap">
                  {item.price} DZD
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: Customization + Cart ─────────────────────────────── */}
        <div className="w-full lg:w-96 sticky top-28 self-start">

          {/* Customize card */}
          <div className="bg-surface-container rounded-3xl p-8 ambient-shadow border border-outline-variant/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-2xl text-primary">Customize</h2>
              {selectedItem && (
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {!selectedItem ? (
              <p className="text-on-surface-variant italic text-sm text-center py-8">
                Select a drink to customize
              </p>
            ) : (
              <div className="space-y-6">
                <p className="font-headline text-lg text-primary">{selectedItem.name}</p>

                {/* Show customization options only for drinks */}
                {isDrink && (
                  <>
                    {/* Size */}
                    <div>
                      <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-3">Size</p>
                      <div className="grid grid-cols-3 gap-3">
                        {SIZES.map(({ key, label }) => (
                          <button
                            key={key}
                            onClick={() => setSize(key)}
                            className={`rounded-xl py-2 text-sm font-medium transition-colors cursor-pointer ${
                              size === key
                                ? 'bg-primary text-on-primary'
                                : 'border border-outline-variant text-on-surface hover:border-primary'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sugar */}
                    <div>
                      <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-3">Sugar Level</p>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setSugar((v) => Math.max(0, v - 1))}
                          className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary transition-colors cursor-pointer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold w-8 text-center text-primary">{sugar}</span>
                        <button
                          onClick={() => setSugar((v) => Math.min(5, v + 1))}
                          className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary transition-colors cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                        <span className="text-xs text-on-surface-variant">/ 5</span>
                      </div>
                    </div>

                    {/* Extras */}
                    <div>
                      <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-3">Extras</p>
                      <div className="flex flex-col gap-2">
                        {EXTRAS.map(({ label, price }) => (
                          <label
                            key={label}
                            className="flex items-center gap-3 p-3 rounded-2xl border border-outline-variant/40 hover:bg-surface-low cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={extras.includes(label)}
                              onChange={() => toggleExtra(label)}
                              className="accent-primary w-4 h-4 cursor-pointer"
                              style={{ accentColor: '#553722' }}
                            />
                            <span className="flex-1 text-sm text-on-surface">{label}</span>
                            <span className="text-xs text-on-surface-variant">+{price}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Total + CTA */}
                <div className="border-t border-outline-variant/20 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-on-surface-variant">Total for item</span>
                    <span className="font-headline text-2xl text-primary">{itemTotal} DZD</span>
                  </div>
                  <button
                    onClick={handleAddToRitual}
                    className="w-full py-4 rounded-2xl primary-gradient text-on-primary font-bold ambient-shadow hover:opacity-90 transition-all cursor-pointer"
                  >
                    Add to Ritual
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart summary card */}
          <div className="bg-surface-low rounded-3xl p-6 border border-outline-variant/10 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag size={18} className="text-primary" />
              <h3 className="font-headline text-xl text-primary">Your Ritual</h3>
            </div>

            {items.length === 0 ? (
              <p className="text-on-surface-variant italic text-sm text-center py-4">
                Your ritual is empty.
              </p>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-on-surface font-medium">{item.name}</span>
                        {item.size && <span className="text-on-surface-variant ml-1">({item.size})</span>}
                        <span className="text-on-surface-variant ml-1">×{item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-medium">
                          {item.price * item.quantity} DZD
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-outline hover:text-primary transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-outline-variant/20 mt-4 pt-4 flex justify-between font-bold text-primary">
                  <span>Subtotal</span>
                  <span>{cartTotal} DZD</span>
                </div>
                <Link
                  to="/checkout"
                  className="mt-4 w-full py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-on-primary transition-all duration-200 text-center block"
                >
                  Proceed to Checkout
                </Link>
              </>
            )}
          </div>

          {/* Confirmation flash */}
          <AnimatePresence>
            {confirmed && (
              <motion.div
                className="mt-4 bg-primary text-on-primary px-4 py-3 rounded-2xl text-sm font-medium text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
              >
                Added to your ritual ✓
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
