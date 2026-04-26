import { getProduct, updateItems } from '@/api';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Spinner } from "@/components/ui/spinner"
import {  toast,Bounce } from 'react-toastify';

function EditItems() {
    const { productId } = useParams()
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        subCategory: '',
        price: ''


    })
    const [size, setSize] = useState([])
    const [allSizes, setAllSizes] = useState(["S", "M", "L", "XL", "XXL", "XS"])
    const [gender, setGender] = useState('')
    const [image, setImage] = useState({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
    })
    const [preview, setPreview] = useState({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
    })
    const [loading, setLoading] = useState(false)
    const handleImage = (e, key) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImage((prev) => ({ ...prev, [key]: file }));
        setPreview((prev) => ({
            ...prev,
            [key]: URL.createObjectURL(file),
        }));
    };

    const fetchProduct = async () => {
        const response = await getProduct(productId)
        const result = response.data.info
        setProduct(result)
        setSize(result.sizes)
        setGender(result.gender)
        setPreview({
            image1: result.image[0] || null,
            image2: result.image[1] || null,
            image3: result.image[2] || null,
            image4: result.image[3] || null,
        });





    }
    useEffect(() => {
        fetchProduct()
    }, [])
    const toogleSize = (size) => {
        setSize((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size])




    }
    const handleSubit = async (e) => {
        e.preventDefault()
        const formData = new FormData();

        // product fields
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("category", product.category);
        formData.append("subCategory", product.subCategory);
        formData.append("price", product.price);

        // gender
        formData.append("gender", gender);

        // sizes array
        size.forEach((s) => formData.append("sizes", s));

        // images (only if updated)
        if (image.image1) formData.append("image1", image.image1);
        if (image.image2) formData.append("image2", image.image2);
        if (image.image3) formData.append("image3", image.image3);
        if (image.image4) formData.append("image4", image.image4);

        try {
            setLoading(true)
            const res = await updateItems(productId, formData);
            toast.success('product data submitted successfully', {
                                       position: "top-right",
                                       autoClose: 5000,
                                       hideProgressBar: false,
                                       closeOnClick: false,
                                       pauseOnHover: true,
                                       draggable: true,
                                       progress: undefined,
                                       theme: "light",
                                       transition: Bounce,
                                   });
           
        } catch (error) {
            console.log(error);
             toast.error('couldnt submit try again',error.message, {
                                       position: "top-right",
                                       autoClose: 5000,
                                       hideProgressBar: false,
                                       closeOnClick: false,
                                       pauseOnHover: true,
                                       draggable: true,
                                       progress: undefined,
                                       theme: "light",
                                       transition: Bounce,
                                   });
        } finally {
             setLoading(false)
        }


    }




    return (
        <div>
            <form action="" onSubmit={handleSubit} encType="multipart/form-data">
                <Card className="">
                    <CardHeader>Edit Proudct</CardHeader>
                    <div className="grid sm:grid-cols-2 grid-cols-1">
                        <CardContent className="space-y-3">

                            <p>product Name</p>
                            <Input type="text" className=" " value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                        </CardContent>
                        <CardContent className="space-y-3">

                            <p>product description</p>
                            <Input type="text" className=" " value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
                        </CardContent>
                        <CardContent className="space-y-3 mt-5">

                            <p>Category</p>
                            <Input type="text" className=" " value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} />
                        </CardContent>
                        <CardContent className="space-y-3 mt-5">

                            <p>Sub Category</p>
                            <Input type="text" className=" " value={product.subCategory} onChange={(e) => setProduct({ ...product, subCategory: e.target.value })} />
                        </CardContent>
                        <CardContent className="space-y-3 mt-5 space-x-3">
                            <p>Sizes</p>
                            {allSizes.map((item, index) => {
                                return <Button type="button" onClick={() => toogleSize(item)} className={`${size.includes(item) ? 'bg-chart-2 hover:bg-chart-2' : ''}`} key={index}>{item}</Button>
                            })}


                        </CardContent>
                        <CardContent className="space-y-3 mt-5">
                            <p>Gender</p>
                            <RadioGroup
                                value={gender}
                                onValueChange={setGender}
                                className="flex gap-6 mt-3"
                            >
                                {["male", "female", "both"].map((g) => (
                                    <div key={g} className="flex items-center gap-2">
                                        <RadioGroupItem value={g} id={g} />
                                        <Label htmlFor={g}>{g}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                        <CardContent className="space-y-3 mt-5">

                            <p>Price in  ₹</p>
                            <Input type="text" className=" " value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                        </CardContent>
                        <CardContent className="space-y-3 mt-5" >
                            <p>Select Image (one image required)</p>
                            <div className="grid sm:grid-cols-2  gap-4">
                                {["image1", "image2", "image3", "image4"].map((key) => (
                                    <div key={key}>
                                        <Input
                                            type="file"
                                            onChange={(e) => handleImage(e, key)}
                                            accept="image/*"
                                        />
                                        {preview[key] && (
                                            <img
                                                src={preview[key]}
                                                alt={key}
                                                className="w-full h-64 object-cover[20%] border rounded mt-2"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardContent className="space-y-3 mt-5">
                            {loading ? (
                                <Button disabled className="px-6 py-3 w-28">
                                    <Spinner className="mr-2" />
                                    Submiting...
                                </Button>
                            ) : (
                                <Button type="submit" className="px-6 py-3 w-30">
                                    Submit
                                </Button>
                            )}
                        </CardContent>



                    </div>
                </Card>
            </form>


        </div>
    )
}

export default EditItems