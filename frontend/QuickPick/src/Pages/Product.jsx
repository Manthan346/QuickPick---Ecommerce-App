import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { currency } from '../Recoil/atoms'
import { useRecoilValue } from 'recoil'
import RelatedProducts from '../components/RelatedProducts'
import { Button } from '../components/ui/button'
 import {  toast,Bounce } from 'react-toastify';
import {useSearch} from '../Context/SearchContext'



function Product() {
     const {products} = useSearch()
  const {productId} = useParams()
  const [productData, setProdutData] = useState('')
const {addToCart} = useSearch()
  const [image,setImage] = useState('')
  const currencies = useRecoilValue(currency)
  const [size, setSize] = useState('')



  const fethProduct = () => {
    products.map((item)=> {
      if(item._id === productId){
        setProdutData(item)
        setImage(item.image[0])
        return null
      }
    })
  }
  const select = 'bg-blue-400'



  useEffect(() => {
    fethProduct()
  }, [productId,products])


  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        
       
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          
          
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index) => (
                <img 
                  onClick={() => setImage(item)}
                  src={item} 
                  key={index} 
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' 
                />
              ))
            }
          </div>


          
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>


        </div>


        
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <p className='font-medium text-3xl'>{currencies}{productData.price}</p>
          </div>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col  gap-4  my-8'>
            <p>Select size</p>
            <div className=' gap-2 grid grid-cols-4 sm:grid-cols-8 '>
              {
                productData.sizes.map((item,index) => (
                  <Button
                   
                  
                
                  onClick={()=>setSize(item)} className={` border-2 bg-background text-foreground rounded-4xl h-13 w-20    ${item === size ? 'bg-gray-950 text-white  hover:bg-gray-950'  : 'hover:bg-gray-600 '}`} key={index} >{item}</Button>


                ))
              }
           
            </div>
     <div className='pt-3'>
              <Button onClick={()=> size ? addToCart(productData._id,size) : toast.error("Please select a size ") } className='w-full h-10  bg-foreground hover:bg-gray-600 xl:w-190'>Add to Cart</Button>
              </div>
          </div>
         
        </div>

          
      </div>
<RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>

  ) : <div className='opacity-0'></div>
}


export default Product