import ProductOption from "./ProductOption";

export default interface Bill {
    discount: number,
    productList: {
        productID: number,
        productName: string,
        quantity: number,
        productOption: ProductOption,
    }[],
    tax: number,
    time: string,
    total: number,
    userID: string,
    id: string,
}