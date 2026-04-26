import React, { useEffect, useState } from 'react'

import Title from './Title'
import ProductItem from './ProductItem'
import { useSearch } from '../Context/SearchContext'
    


function LatestCollections() {
    const [latestproduct, setLatestProduct] = useState([])
    const {products} = useSearch()
    useEffect(() =>{
        setLatestProduct(products.slice(0,10))
    }, [products])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl '>
            <Title title1={"Latest"} title2={"Collections"}/>
        </div>
        <div className='grid grid-cols-2  sm:grid-cols-3 sm:row-end-5 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
            {latestproduct.map((item)=>( 
                <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))}


        </div>
        
    </div>
  )
}

export default LatestCollections