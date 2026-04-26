import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import axios from 'axios'
import { addProduct } from "@/api";
import { Spinner } from "@/components/ui/spinner"
import {  toast,Bounce } from 'react-toastify';

function AddItems() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [gender, setGender] = useState("both");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [loading, setLoading] = useState(false)


  const [sizes, setSizes] = useState([]);
  const [preview, setPreview] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  // Toggle size selection
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const handleImage = (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("iage is", file)

    setImages((prev) => ({ ...prev, [key]: file }));
    setPreview((prev) => ({
      ...prev,
      [key]: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)

      const formdata = new FormData();


      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("category", category);
      formdata.append("subCategory", subCategory);
      formdata.append("gender", gender);
      formdata.append("price", price);
      formdata.append("date", date);


      formdata.append("bestseller", bestSeller);
      sizes.forEach(size => {
        formdata.append("sizes[]", size);
      });


      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formdata.append(key, images[key]);
        }
      });


      await addProduct(formdata)

      setName("");
      setDescription("");
      setCategory("");
      setSubCategory("");
      setGender("both");
      setPrice("");
      setDate("");
      setBestSeller(false);
      setSizes([]);
      setImages({ image1: null, image2: null, image3: null, image4: null });
      setPreview({ image1: null, image2: null, image3: null, image4: null });


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
       toast.success('couldnt submit try again',error.message, {
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

    }
    setLoading(false)

  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="grid sm:grid-cols-12 grid-cols-1 gap-2">
        {/* Left Section */}
        <div className="col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Add Products</CardTitle>
              <CardDescription>Product Information</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p>Product Name</p>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  required
                  placeholder="enter your product name"
                />
              </div>

              <div>
                <p>Product Description</p>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  required
                  placeholder="enter your product description"
                />
              </div>

              <div>
                <p>Category</p>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  name="category"
                  required
                />
              </div>

              <div>
                <p>Sub Category</p>
                <Input
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  name="subCategory"
                  required
                />
              </div>

              <div>
                <p className="mb-2">Sizes</p>
                {["S", "X", "XL", "XS", "M", "L","XXL"].map((size) => (
                  <Button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`mr-2 ${sizes.includes(size)
                        ? "bg-chart-2 hover:bg-chart-2"
                        : ""
                      }`}
                  >
                    {size}
                  </Button>
                ))}
              </div>

              <div>
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
              </div>


              <div className="flex  gap-2 mt-6">
                <Input
                  type="checkbox"
                  checked={bestSeller}
                  onChange={() => setBestSeller(!bestSeller)}
                  className="w-5 h-5" />
                <Label>Best Seller</Label>
              </div>

              <div>
                <p>Price</p>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  name="price"
                />
              </div>

              <div>
                <p>Date</p>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  name="date"
                />
              </div>
            </CardContent>
          </Card>
        </div>


        <div className="col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Add Images</CardTitle>
              <CardDescription>Minimum 1 image required</CardDescription>
            </CardHeader>

            <CardContent>
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
                        className="w-full h-64 object-cover border rounded mt-2"
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-full flex mt-8">
        {loading ? (
          <Button disabled className="px-6 py-3">
            <Spinner className="mr-2" />
            Loading...
          </Button>
        ) : (
          <Button type="submit" className="px-6 py-3 w-30">
            Submit
          </Button>
        )}

      </div>
      
    </form>
  );
}

export default AddItems;
