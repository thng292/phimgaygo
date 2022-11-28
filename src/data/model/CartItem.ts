import ProductOption from "./firestore/ProductOption";

export default interface CartItem<Type> {
    mainItem: Type,
    quantity: number,
    currentOption: number,
    productOptions: ProductOption[],
}