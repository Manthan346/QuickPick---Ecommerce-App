import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { useSearch } from '../Context/SearchContext';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useDebounce } from 'use-debounce';
import { DualRangeSlider } from '../components/ui/dual-range-slider';


function Collection() {
  const { products, setProducts, page, totalPages, nextPage, prevPage, getProducts, filter, setFilters } = useSearch();
  const [showFilter, setShowFilter] = useState(false);
  const [values , setValues] = useState([0,10000])
  const [debounced] = useDebounce(values, 400)

const handlePriceFilter = (val) => {
  setValues(val);
};

  useEffect(() => {
  setFilters(prev => ({
    ...prev,
    priceMin: debounced[0],
    priceMax: debounced[1],
    page: 1
  }));
}, [debounced]);

  // Handle checkbox changes
  const toggleCategory = (e) => {
    const val = e.target.value;
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(val)
        ? prev.category.filter(c => c !== val)
        : [...prev.category, val]
    }));
  };
 const toggleSubCategory = (e) => {
const val = e.target.value;
setFilters(prev => ({
...prev,
subCategory: prev.subCategory.includes(val)
? prev.subCategory.filter(c => c !== val)
: [...prev.subCategory, val]
}));
 }





  return (
    <div className='lg:flex flex-row gap-1 pt-10 border-t font-sans'>
      {/* Filters */}
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img
            onClick={() => setShowFilter(!showFilter)}
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
          />
        </p>

        {/* Category */}
        <div className={`border border-gray-200 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {["Men", "Women", "Kids"].map(cat => (
              <p className='flex gap-2' key={cat}>
                <input className='w-3' type="checkbox" value={cat} onChange={toggleCategory} />{cat}
              </p>
            ))}
          </div>
        </div>

        {/* SubCategory */}
        <div className={`border border-gray-200 pl-5 py-3 mt-6 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {["Topwear", "Bottomwear", "Winterwear"].map(sub => (
              <p className='flex gap-2' key={sub}>
                <input className='w-3' type="checkbox" value={sub} onChange={toggleSubCategory} />{sub}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
     {/* Products */}
<div className='flex-1'>
  <div className='lg:flex justify-between items-center text-base sm:text-2xl mb-4 gap-4'>
    {/* Title */}
    <Title title1="ALL" title2="COLLECTIONS" />

    {/* Price slider */}
    <div className="w-full max-w-xs lg:w-80">
      <p className="text-sm font-bold text-lg relative bottom-2 ">Filter by Price</p>
      <DualRangeSlider className=""
      
        value={values}
        onValueChange={handlePriceFilter}
        min={0}
        max={10000}
        step={1}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>₹{values[0]}</span>
        <span>₹{values[1]}</span>
      </div>
    </div>
  </div>

  {/* Products grid */}
  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
    {products.map(item => (
      <ProductItem key={item._id} name={item.name} id={item._id} price={item.price} image={item.image} />
    ))}
  </div>

  {/* Pagination */}
  <div className="flex justify-center gap-4 mt-8">
    <button disabled={page === 1} onClick={prevPage}>Prev</button>
    <span>{page} / {totalPages}</span>
    <button disabled={page === totalPages} onClick={nextPage}>Next</button>
  </div>
</div>
    </div>
  );

 }

export default Collection