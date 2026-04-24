import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && i.size === (item.size || 'medium')
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.size === existing.size
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }
          return {
            items: [
              ...state.items,
              {
                ...item,
                size: item.size || 'medium',
                sugar: item.sugar ?? 2,
                extras: item.extras || [],
                quantity: 1,
              },
            ],
          }
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateItem: (id, changes) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, ...changes } : i)),
        })),

      incrementQuantity: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        })),

      decrementQuantity: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id)
          if (!item) return state
          if (item.quantity <= 1) {
            return { items: state.items.filter((i) => i.id !== id) }
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          }
        }),

      clearCart: () => set({ items: [] }),

      // Selectors (call as functions: useCartStore(s => s.totalItems()))
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'dopamine-cart' }
  )
)

export default useCartStore
