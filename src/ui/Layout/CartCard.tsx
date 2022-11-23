import React, { FC } from "react"
import config from "../../data/datasource/config"
import CartItem from "../../data/model/CartItem"
import FilmOverview from "../../data/model/FilmOverview"
import AddSpaceToNumber from "../../Utils/AddSpaceToNumber"
import SVG_Close from "../common/svg/SVG_Close"
import SVG_RemoveCart from "../common/svg/SVG_RemoveCart"


//TODO
const CartCard: FC<{
    listItem: CartItem<FilmOverview>[],
    changeQuantityHandler: (id: number, newQuantity: number) => void,
    removeItemHandler: (id: number) => void,
    clearAllItemHandler: () => void,
    onClose: () => void,
    onProductClicked: (productId: number) => void,
    onCheckout: () => void,
}> = ({ listItem, changeQuantityHandler, clearAllItemHandler, onProductClicked, onClose, onCheckout }) => {
    return <div
        className="cart-card shadow"
        onClick={(e) => e.stopPropagation()}
    >
        <div className="row center-child" style={{
            justifyContent: 'space-between',
            paddingBottom: '20px',
        }}>
            <p className="title" style={{
                color: "black",
            }}>Your Cart</p>
            <div style={{ cursor: 'pointer', padding: '5px' }} onClick={(e) => {
                e.stopPropagation()
                onClose()
            }}>
                <SVG_Close />
            </div>
        </div>
        <div style={{
            maxHeight: '70vh',
            overflowY: 'auto'
        }}>
            {listItem.map((item, index) => {
                return <div key={item.mainItem.id} className="row cart-row" onClick={()=>onProductClicked(item.mainItem.id)}>
                    <div className="row">
                        <img
                            src={config.posterUrl + item.mainItem.poster_path}
                            alt={item.mainItem.title}
                        />
                        <div style={{
                            position: 'relative',
                            paddingLeft: '20px'
                        }}>
                            <p className="bold">{item.mainItem.title}</p>
                            <p className="faded quantity">
                                <div>-</div>
                                <div className="mid">{item.quantity}</div>
                                <div>+</div>
                            </p>
                            <p className="faded" style={{
                                position: 'absolute',
                                bottom: '0px'
                            }}>Option: <span>
                                    <select name="productOption" id="0">
                                        <option value=""></option>
                                    </select>
                                </span></p>
                        </div>
                    </div>
                    <p className="p10 bold">{AddSpaceToNumber(item.price * item.quantity)} VND</p>
                </div>
            })}
        </div>
        {listItem.length ?
            <div className="row" style={{
                justifyContent: 'space-between',
                borderTop: '1px solid #888'
            }}>
                <button className="bold" onClick={onCheckout} style={{
                    maxWidth: 'none'
                }}>Check Out</button>
                <button onClick={clearAllItemHandler}>
                    <SVG_RemoveCart />
                </button>
            </div> : ''}

    </div>
}

export default CartCard;