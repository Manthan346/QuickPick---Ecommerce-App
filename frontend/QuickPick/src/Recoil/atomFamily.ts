import { atomFamily } from 'recoil'
import { products } from '../assets/assets'

export const productsFamily = atomFamily({
    key: "productFamily",
    default: id => {
        return products.find(x => x._id === id)
        
    }
})