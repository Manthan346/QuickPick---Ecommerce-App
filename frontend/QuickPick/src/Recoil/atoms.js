import {atom} from 'recoil'



export const currency = atom({
    key: "currencyAtom",
    default: "₹"

})

export const deliveryFee = atom({
    key: "deliveryFee",
    default: 30
})

