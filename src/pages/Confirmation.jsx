import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Store } from 'lucide-react'

export default function Confirmation() {
  const { state } = useLocation()
  const [orderItems] = useState(() => state?.orderItems || [])
  const [total]      = useState(() => state?.total || 0)
  const orderNum     = useRef(`CS-${Math.floor(1000 + Math.random() * 9000)}`).current

  const subtotal    = orderItems.reduce((s, i) => s + i.price * i.quantity, 0)
  const deliveryFee = total - subtotal

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── Confirmation hero ──────────────────────────────────────── */}
        <div className="text-center">
          <motion.div
            className="w-16 h-16 rounded-full bg-surface-low flex items-center justify-center mx-auto mb-8 ambient-shadow"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <CheckCircle size={32} className="text-primary" />
          </motion.div>

          <motion.h1
            className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Your moment is being prepared.
          </motion.h1>

          <motion.p
            className="text-on-surface-variant text-lg text-center max-w-xl mx-auto mt-4 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Order <span className="font-medium text-primary">{orderNum}</span> has been placed.
            We're crafting your perfect cup.
          </motion.p>
        </div>

        {/* ── Bento info grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-surface-low p-8 rounded-2xl flex flex-col items-center text-center">
            <Clock size={28} className="text-primary/60 mb-4" />
            <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">
              Estimated Ready
            </p>
            <p className="font-headline text-2xl text-primary font-bold">12–15 mins</p>
          </div>

          <div className="md:col-span-2 bg-surface-container rounded-2xl p-8 flex items-start gap-4">
            <div className="p-3 bg-secondary-container rounded-xl flex-shrink-0">
              <Store size={22} className="text-primary" />
            </div>
            <div>
              <h3 className="font-headline text-xl text-primary mb-2">
                Pickup at CoffeeStrike Batna
              </h3>
              <p className="text-on-surface-variant font-light leading-relaxed">
                Present your order number at the Strike Bar.
                Your ritual will be ready and waiting.
              </p>
            </div>
          </div>
        </div>

        {/* ── Order summary + side ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-start">

          {/* Left: Order summary */}
          <div className="lg:col-span-7 bg-surface-low rounded-2xl p-8">
            <h2 className="font-headline text-2xl text-primary mb-8">Order Summary</h2>

            {orderItems.length === 0 ? (
              <p className="text-on-surface-variant italic text-sm">No items to display.</p>
            ) : (
              <div className="space-y-6">
                {orderItems.map((item, i) => (
                  <div
                    key={`${item.id}-${i}`}
                    className="flex items-center gap-4 pb-6 border-b border-outline-variant/20 last:border-0 last:pb-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-primary">{item.name}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        {item.size} · ×{item.quantity}
                        {item.extras?.length ? ` · ${item.extras.join(', ')}` : ''}
                      </p>
                    </div>
                    <span className="font-headline font-bold text-primary whitespace-nowrap">
                      {item.price * item.quantity} DZD
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Totals */}
            <div className="border-t border-outline-variant/20 mt-6 pt-6 space-y-2 text-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span><span>{subtotal} DZD</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Delivery</span>
                <span>{deliveryFee > 0 ? `${deliveryFee} DZD` : 'Free'}</span>
              </div>
              <div className="flex justify-between font-bold text-primary text-xl pt-2">
                <span>Total</span><span>{total} DZD</span>
              </div>
            </div>
          </div>

          {/* Right: Image + actions */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600"
                alt="Coffee bar"
                className="w-full h-full object-cover"
              />
            </div>
            <Link
              to="/"
              className="bg-secondary-container text-primary py-4 px-8 rounded-xl font-medium hover:bg-surface-high transition-all duration-200 text-center"
            >
              Return Home
            </Link>
            <Link
              to="/menu"
              className="primary-gradient text-on-primary py-4 px-8 rounded-xl font-medium ambient-shadow hover:opacity-90 transition-all text-center"
            >
              Order Again
            </Link>
          </div>
        </div>

        {/* ── Brew progress bar ─────────────────────────────────────── */}
        <div className="mt-24">
          <div className="flex justify-between px-2 mb-4">
            {['Received', 'Brewing', 'Ready'].map((stage, i) => (
              <span
                key={stage}
                className={`text-sm ${i <= 1 ? 'text-primary font-medium' : 'text-on-surface-variant'}`}
              >
                {stage}
              </span>
            ))}
          </div>
          <div className="h-1 w-full bg-surface-highest rounded-full overflow-hidden">
            <motion.div
              className="h-full accent-gradient rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '66%' }}
              transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
            />
          </div>
          <p className="text-center mt-10 font-headline italic text-on-surface-variant">
            "The best things in life take exactly as much time as they need."
          </p>
        </div>
      </div>
    </div>
  )
}
