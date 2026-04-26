import React, { useEffect, useState } from 'react'
import { currency } from '../Recoil/atoms'
import Title from './Title'

import { useRecoilValue } from 'recoil'
import ProductItem from './ProductItem'
import { useSearch } from '../Context/SearchContext'

function BestSellers() {
    const [bestSellers,setBestSellers] = useState([])
    const {products} = useSearch()
     const currencies = useRecoilValue(currency)
    
    useEffect(() => {
        const bestProducts = products.filter((item) => (item.bestseller))
        setBestSellers(bestProducts.slice(0,5))
    } ,[])
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title title1={"Best"} title2={"Sellers"} />
      
        <div className='pt-8 grid grid-cols-2 sm:grid-cols-3 sm:row-end-5 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
          {
            bestSellers.map((item) => (
              <ProductItem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default BestSellers