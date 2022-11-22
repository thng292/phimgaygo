export default interface CartItem<Type> {
    mainItem: Type,
    quantity: number,
    price: number,
}