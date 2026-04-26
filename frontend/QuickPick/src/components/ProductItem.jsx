import React from 'react'
import { useRecoilValue } from 'recoil'
import { currency } from '../Recoil/atoms'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

export default function ProductItem({ id, name, price, mrp, image = [], liked }) {
  const curr = useRecoilValue(currency)
  const discount = mrp ? Math.round(((mrp - price) / mrp) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/product/${id}`} className="block">
        {/* Image Container with Modern Overlay */}
        <div className="relative aspect-[3/4] bg-gradient-to-br from-muted to-secondary/30 rounded-2xl overflow-hidden mb-4">
          <img
            src={image[0]}
            alt={name}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Discount Badge - Top Right */}
          {discount > 0 && (
            <motion.div 
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: -12 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-xl backdrop-blur-sm"
            >
              -{discount}%
            </motion.div>
          )}

          {/* Quick View Button on Hover */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <div className="bg-primary/95 backdrop-blur-md text-primary-foreground text-center py-2.5 rounded-xl font-medium text-sm shadow-lg">
              Quick View
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2.5 px-1">
          {/* Product Name */}
          <h3 
            className="text-base font-semibold text-card-foreground line-clamp-2 min-h-[3rem] leading-snug group-hover:text-primary transition-colors duration-300" 
            style={{fontFamily: 'var(--font-manthan)'}}
          >
            {name}
          </h3>
          
          {/* Price Section */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-card-foreground tracking-tight">
              {curr}{price.toLocaleString()}
            </span>
            {mrp && mrp > price && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground line-through font-medium">
                  {curr}{mrp.toLocaleString()}
                </span>
                <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2 py-0.5 rounded">
                  Save {curr}{(mrp - price).toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Tax Info with Icon */}
          <div className="flex items-center gap-1.5 pt-1">
            <svg className="w-3 h-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-muted-foreground font-medium">Inclusive of all taxes</p>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </Link>
    </motion.div>
  )
}