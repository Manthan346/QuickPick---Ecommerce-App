import React from 'react'
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Footer = () => {
  const productLinks = ['T-Shirt','Hoodie','Jacket','Jeans','Hand Bags','Sneakers']
  const categoryLinks = ['Men','Women','Kids','Gift','Collection','New Arrivals']
  const helpLinks = ['Customer Service','My HRF','Find a Store','Legal & Privacy','Contact','Cookie Notice']
  const socials = [FaInstagram, FaTwitter, FaLinkedin, FaGithub]

  return (
    <motion.footer
      initial={{ y: 0 }}
      whileTap={{ y: 5 }}
      className="bg-white mt-20"
    >
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Newsletter */}
        <div className="flex flex-col space-y-4">
          <img src={assets.logo} alt="HRF Logo" className="h-30 w-30" />
          <p className="text-gray-600 text-sm">
            Get newsletter update for upcoming products and best offers and discount for all items.
          </p>
          
        </div>

        {/* Product */}
        <div>
          <h3 className="uppercase text-gray-800 font-semibold mb-4 text-sm">Product</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            {productLinks.map(link => <li key={link}>{link}</li>)}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="uppercase text-gray-800 font-semibold mb-4 text-sm">Categories</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            {categoryLinks.map(link => <li key={link}>{link}</li>)}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="uppercase text-gray-800 font-semibold mb-4 text-sm">Help</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            {helpLinks.map(link => <li key={link}>{link}</li>)}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} HRF. All rights reserved.
          </p>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:text-black transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
