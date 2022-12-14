import CartItem from "../../model/Cart/CartItem";
import MovieOverview from "../../model/Movie/MovieOverview";
import React from "react";
import ProductOption from "../../model/Firebase/ProductOption";

export function addItemToCart(
    cart: CartItem<MovieOverview>[],
    updateCart: React.Dispatch<React.SetStateAction<CartItem<MovieOverview>[]>>,
    item: MovieOverview,
    option: number = 0,
    quantity: number = 1,
    productOptions?: ProductOption[],
) {
    let tmp = cart.findIndex((val) => val.mainItem.id === item.id);
    if (tmp != -1 && cart[tmp].currentOption === option) {
        let tmpCart = cart.map((val) => val);
        tmpCart[tmp].quantity += quantity;
        updateCart(tmpCart);
    } else {
        //TODO: Get product options and price from Firebase
        if (productOptions !== undefined) {
            updateCart((old) => [
                ...old,
                {
                    mainItem: item,
                    quantity: 1,
                    productOptions: productOptions,
                    currentOption: option,
                }
            ])
        } else {
            import('../FireStore/AdditionalMovieInfoDAO')
                .then(DataSource => {
                    DataSource.default(item.id)
                        .then(data => {
                            updateCart((old) => [
                                ...old,
                                {
                                    mainItem: item,
                                    quantity: 1,
                                    productOptions: data.options,
                                    currentOption: option,
                                },
                            ]);
                        })
                        .catch(console.error)
                })
                .catch(console.error)
        }
    }
}

export function removeItemFormCart(
    cart: CartItem<MovieOverview>[],
    updateCart: React.Dispatch<React.SetStateAction<CartItem<MovieOverview>[]>>,
    id: number
) {
    let tmp = cart.map((val) => val);
    tmp.splice(
        tmp.findIndex((val) => val.mainItem.id === id),
        1
    );
    updateCart(tmp);
}


export function changeQuantity(
    cart: CartItem<MovieOverview>[],
    updateCart: React.Dispatch<React.SetStateAction<CartItem<MovieOverview>[]>>,
    id: number,
    newQuantity: number
) {
    if (newQuantity == 0) {
        return removeItemFormCart(cart, updateCart, id);
    }

    let tmp = cart.map((val) => val);
    tmp[tmp.findIndex((val) => val.mainItem.id === id)].quantity =
        newQuantity;
    updateCart(tmp);
}

export function changeOption(
    cart: CartItem<MovieOverview>[],
    updateCart: React.Dispatch<React.SetStateAction<CartItem<MovieOverview>[]>>,
    id: number,
    option: number
) {
    let tmpCart = cart.map(value => value)
    let item = tmpCart.findIndex(value => {
            return value.mainItem.id === id
        }
    )
    tmpCart[item].currentOption = option
    updateCart(tmpCart)
}

export function removeAllItem(
    updateCart: React.Dispatch<React.SetStateAction<CartItem<MovieOverview>[]>>,
) {
    updateCart([]);
    localStorage.setItem("Cart", JSON.stringify([]));
}


