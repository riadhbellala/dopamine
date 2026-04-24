import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Truck, Store, Landmark, Banknote } from 'lucide-react'
import useCartStore from '../store/cartStore'

export default function Checkout() {
  const [method,  setMethod]  = useState('pickup')
  const [payment, setPayment] = useState('baridimob')
  const navigate = useNavigate()
  const { items, clearCart } = useCartStore()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const subtotal     = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const deliveryFee  = method === 'delivery' ? 200 : 0
  const total        = subtotal + deliveryFee

  const onSubmit = () => {
    const snapshot = [...items]
    navigate('/confirmation', { state: { orderItems: snapshot, total } })
    clearCart()
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.h1
          className="font-headline text-4xl md:text-5xl text-primary mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Finalize Your Order
        </motion.h1>
        <motion.div
          className="h-0.5 accent-gradient rounded-full mt-6"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">

          {/* ── Left: Order flow ──────────────────────────────────── */}
          <div className="lg:col-span-7">

            {/* Delivery Method */}
            <section>
              <h2 className="font-headline text-2xl text-primary mb-6">Delivery Method</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'delivery', Icon: Truck,  label: 'Delivery' },
                  { key: 'pickup',   Icon: Store,  label: 'Pick Up' },
                ].map(({ key, Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setMethod(key)}
                    className={`rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 border-2 ${
                      method === key
                        ? 'border-primary bg-surface-container ambient-shadow'
                        : 'border-transparent bg-surface-low hover:border-outline-variant'
                    }`}
                  >
                    <Icon size={32} className="text-primary" />
                    <span className="font-medium text-on-surface">{label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Contact Info */}
            <section className="mt-10 p-8 rounded-2xl bg-surface-low">
              <h2 className="font-headline text-2xl text-primary mb-6">Contact Information</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
                      Full Name
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Amine Rahmani"
                      className="w-full bg-surface-high border-none rounded-xl p-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-outline"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
                      Phone Number
                    </label>
                    <input
                      {...register('phone', { required: 'Phone is required' })}
                      placeholder="+213 6XX XX XX XX"
                      className="w-full bg-surface-high border-none rounded-xl p-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-outline"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {method === 'delivery' && (
                  <div>
                    <label className="text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
                      Delivery Address
                    </label>
                    <input
                      {...register('address', { required: method === 'delivery' })}
                      placeholder="123 Rue Liberté, Batna"
                      className="w-full bg-surface-high border-none rounded-xl p-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-outline"
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500 mt-1">Address is required for delivery</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="text-xs uppercase tracking-widest text-on-surface-variant mb-2 block">
                    Notes (Optional)
                  </label>
                  <textarea
                    {...register('notes')}
                    placeholder="Any special requests?"
                    rows={3}
                    className="w-full bg-surface-high border-none rounded-xl p-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-outline resize-none"
                  />
                </div>
              </form>
            </section>

            {/* Payment */}
            <section className="mt-10">
              <h2 className="font-headline text-2xl text-primary mb-6">Payment Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    key:      'baridimob',
                    Icon:     Landmark,
                    iconBg:   'bg-orange-100',
                    iconCls:  'text-orange-800',
                    title:    'BaridiMob',
                    subtitle: 'Transfer via Algérie Poste app',
                  },
                  {
                    key:      'cash',
                    Icon:     Banknote,
                    iconBg:   'bg-green-50',
                    iconCls:  'text-green-700',
                    title:    'Cash on Pickup',
                    subtitle: 'Pay when you collect your order',
                  },
                ].map(({ key, Icon, iconBg, iconCls, title, subtitle }) => (
                  <button
                    key={key}
                    onClick={() => setPayment(key)}
                    className={`relative text-left p-6 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                      payment === key
                        ? 'border-primary bg-surface-container ambient-shadow'
                        : 'border-transparent bg-surface-low hover:border-outline-variant'
                    }`}
                  >
                    {payment === key && (
                      <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center">
                        ✓
                      </span>
                    )}
                    <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center mb-4`}>
                      <Icon size={22} className={iconCls} />
                    </div>
                    <p className="font-bold text-on-surface">{title}</p>
                    <p className="text-xs text-on-surface-variant mt-1">{subtitle}</p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* ── Right: Order Summary ──────────────────────────────── */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-surface-low rounded-3xl p-8 ambient-shadow">
              <h2 className="font-headline text-2xl text-primary text-center mb-8">
                Your Strike Summary
              </h2>

              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-on-surface-variant italic mb-4">No items in your cart.</p>
                  <Link to="/menu" className="text-primary border-b border-primary/30 text-sm">
                    Browse Menu →
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-primary text-sm">{item.name}</p>
                          <p className="text-xs text-on-surface-variant mt-0.5">
                            {item.size}
                            {item.extras?.length ? ` · ${item.extras.join(', ')}` : ''}
                          </p>
                        </div>
                        <span className="font-medium text-primary whitespace-nowrap">
                          {item.price * item.quantity} DZD
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-outline-variant/30 my-6" />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Subtotal</span><span>{subtotal} DZD</span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Delivery Fee</span>
                      <span>{method === 'delivery' ? '200 DZD' : 'Free'}</span>
                    </div>
                    <div className="flex justify-between font-bold text-primary text-xl pt-2 border-t border-outline-variant/30">
                      <span>Total</span><span>{total} DZD</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="w-full mt-8 primary-gradient text-on-primary py-5 rounded-2xl font-bold text-lg tracking-wide hover:opacity-90 active:scale-[0.98] transition-all ambient-shadow cursor-pointer"
                  >
                    Complete Your Strike
                  </button>
                  <span className="text-on-surface-variant/70 text-[10px] uppercase tracking-widest font-bold">
                    Secure transaction powered by Dopamine
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
