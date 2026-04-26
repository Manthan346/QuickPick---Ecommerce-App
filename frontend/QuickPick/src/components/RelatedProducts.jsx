import React, { useEffect, useState } from 'react'

import Title from './Title'
import ProductItem from '../components/ProductItem'
import { useSearch } from '../Context/SearchContext'

function RelatedProducts({category,subCategory}) {
    const [related,setRelated] = useState([])
    const {products} = useSearch()
    useEffect(() => {
        if (products.length >0) {
            let productCopy = products.slice()
            productCopy = productCopy.filter((item) => category === item.category)
            productCopy = productCopy.filter((item) => subCategory === item.subCategory)
            setRelated(productCopy.slice());
            
        }
    }, [products])
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title title1={"Related"} title2={"Products"}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {
                related.map((item,index) => (
                    <ProductItem id={item._id} name={item.name} price={item.price} image={item.image}  />

                ))
            }

        </div>
    </div>
  )
}

export default RelatedProducts