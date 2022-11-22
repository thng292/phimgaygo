import React, { FC } from "react"
import config from "../../data/datasource/config"
import FilmOverview from "../../data/model/FilmOverview"
import Cart from "./Cart"

const CartCard: FC<{
    cart: Cart<FilmOverview>,
    onClose: () => void,
}> = ({ cart }) => {
    let cartItem = cart.getItems()
    return <div className="cart-card">
        {cartItem.map((item, index) => {
            return <>
                <div className="row">
                    <img
                        src={config.posterUrl + item.mainItem.poster_path}
                        alt={item.mainItem.title}
                    />
                    <div>
                        <p className="p10">{item.mainItem.title}</p>
                        <p className="p10">{ item.price * item.quantity }</p>
                        <p className="p10">{ item.quantity }</p>
                    </div>
                </div>
            </>
        })}
    </div>
}

export default CartCard;