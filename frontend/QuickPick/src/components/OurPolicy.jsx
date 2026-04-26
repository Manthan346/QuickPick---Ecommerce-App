import React from 'react'
import {assets} from '../assets/assets'
import { motion } from 'motion/react'


function OurPolicy() {
  return (
    <>
 
    <motion.div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-2' 
    initial={{scale: 0}}
    whileInView={{scale: 1}}
    transition={{duration: 0.5}}
    >
        <div>
         
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We offer hassle free exchange plocy</p>
          
        </div>
        
         
          <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>7 days return policy</p>
            <p className='text-gray-400'>We offer 7 days free return policy</p>
        </div>
          <div>
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Best customer service</p>
            <p className='text-gray-400'>we 24/7 customer xervice</p>
        </div>
          
         
        
    </motion.div>
    </>
   
  )
}

export default OurPolicy