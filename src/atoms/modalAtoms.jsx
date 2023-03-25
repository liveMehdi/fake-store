import {atom} from "recoil"

export const landingSearchedValue = atom({
    key: "landingSearchedValue",
    default: "",
})


export const fetchedProducts = atom({
    key: "fetchedProducts",
    default: [],
})

export const originalProducts = atom({
    key: "originalProducts",
    default: [],
})

export const cartQuantity = atom({
    key: "cartQuantity",
    default: 0,
})