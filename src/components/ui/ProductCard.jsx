import { motion } from 'framer-motion'

export default function ProductCard({
  id,
  name,
  category,
  description,
  price,
  image,
  isSignature,
  isFeatured,
  featured,
  onAddToCart,
}) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div className="bg-surface-low rounded-2xl overflow-hidden transition-all duration-300 hover:ambient-shadow-md group cursor-pointer">

        {/* Image area */}
        <div className={`relative overflow-hidden rounded-xl mx-4 mt-4 ${featured ? 'aspect-[16/7]' : 'aspect-[4/3]'}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {isSignature && (
            <span className="absolute top-3 right-3 bg-accent/90 text-white text-[10px] uppercase tracking-wide px-3 py-1 rounded-full">
              Signature
            </span>
          )}
          {isFeatured && (
            <span className="absolute top-3 left-3 bg-primary text-on-primary text-[10px] uppercase tracking-wide px-3 py-1 rounded-full">
              Today's Pick
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 className="font-headline text-xl text-primary">{name}</h3>
          <p className="text-sm text-on-surface-variant mt-1 leading-relaxed line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="font-medium text-primary text-lg">{price} DZD</span>
            <button
              onClick={() => onAddToCart?.({ id, name, price, image })}
              className="bg-primary text-on-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-container transition-colors duration-200 cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
