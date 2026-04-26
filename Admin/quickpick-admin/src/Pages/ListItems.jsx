import { listItems, removeProduct } from '@/api'
import { Card, CardContent } from '../components/ui/card'
import React, { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';

function ListItems() {
  const [list, setList] = useState([])
  const [reload, setReload] = useState(false)
  const navigate = useNavigate()
  const { productPage, totalPages, limit, productNextPage, productPrevPage, setTotalPages } = useAuth()



  const fetchProduct = async () => {
    try {

      const params = new URLSearchParams();


      params.append("page", productPage);
      params.append("limit", limit);
            const response = await listItems(params.toString())
      const result = response.data.products

      setTotalPages(response.data.totalPages);
      setList(result)
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleDelete = async (id) => {
    await removeProduct(id);
    setReload(prev => !prev);
  };


  useEffect(() => {
    fetchProduct()
  }, [productPage])

  return (
    <div className="  ">

      {/* Header */}
      <h1 className="text-3xl   font-bold">All Products</h1>
      <Card className=" hidden  sm:block "> 
        <CardContent className="grid grid-cols-4   font-semibold">
          <p>Product</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </CardContent>
      </Card>


      <div className="">
        {list.map((item, index) => (
          <Card key={index} className="border-b-0 ">
            <CardContent className="grid grid-cols-1 gap-4 sm:gap-0  sm:grid-cols-4  items-center">

              <p className="block sm:hidden font-bold ">Product</p>
              <div className="flex items-center gap-3 ">
               
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="h-12 w-12 rounded object-cover"
                />
               
                <span>{item.name}</span>
              </div>
              
             <p className="block sm:hidden font-bold ">Category</p>
              <p>{item.category}</p>

           <p className="block sm:hidden font-bold ">Price</p>

              <p>₹ {item.price}</p>

              <div className="space-x-3 space-y-4">
                   <p className="block sm:hidden font-bold ">Action </p>
                <Button onClick={() => navigate(`/edit/${item._id}`)} className="px-3 py-1 bg-foreground w-10   rounded text-sm">

                  <Pencil color="#ffffff" />
                </Button>
                <Button onClick={() => handleDelete(item._id)} className="px-3 py-1 bg-foreground w-10   rounded text-sm">

                  <Trash2 color="#ffffff" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <Button disabled={productPage === 1} onClick={productPrevPage}>Prev</Button>
        <span>{productPage} / {totalPages}</span>
        <Button disabled={productPage === totalPages} onClick={productNextPage}>Next</Button>
      </div>

    </div>
  )
}

export default ListItems
