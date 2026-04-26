import React from 'react'
import Hero from '../components/Hero'
import ObserverProvider from '../components/ObeserverProvider'

import LatestCollections from '../components/LatestCollections'
import BestSellers from '../components/BestSellers'
import OurPolicy from '../components/OurPolicy'

function Home() {
  return (
    <div className=''>
      <Hero />
      <ObserverProvider>

      <LatestCollections />
      <BestSellers />
      
      </ObserverProvider>
      <OurPolicy />
      
    </div>
  )
}

export default Home