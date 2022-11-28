import React, { FC } from "react";
import config from "../../data/datasource/config";
import CartItem from "../../data/model/CartItem";
import FilmOverview from "../../data/model/Film/FilmOverview";
import AddSpaceToNumber from "../../Utils/AddSpaceToNumber";
import SVG_Close from "../common/svg/SVG_Close";
import SVG_RemoveCart from "../common/svg/SVG_RemoveCart";

//TODO
const CartCard: FC<{
    listItem: CartItem<FilmOverview>[];
    show: boolean;
    changeQuantityHandler: (id: number, newQuantity: number) => void;
    removeItemHandler: (id: number) => void;
    clearAllItemHandler: () => void;
    onClose: () => void;
    onProductClicked: (productId: number) => void;
    onCheckout: () => void;
}> = ({
    listItem,
    show,
    changeQuantityHandler,
    clearAllItemHandler,
    onProductClicked,
    onClose,
    onCheckout,
}) => {
    return (
        <div
            className='cart-card tshadow'
            style={{
                transition: ".2s ease-in-out",
                opacity: show ? "100%" : "0%",
                display: show ? 'block' : 'none'
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className='row center-child'
                style={{
                    justifyContent: "space-between",
                    paddingBottom: "20px",
                }}
            >
                <p
                    className='title'
                    style={{
                        color: "black",
                    }}
                >
                    Your Cart
                </p>
                <div
                    style={{ cursor: "pointer", padding: "5px" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                >
                    <SVG_Close />
                </div>
            </div>
            <div
                style={{
                    maxHeight: "70vh",
                    overflowY: "auto",
                }}
            >
                {listItem.map((item) => {
                    return (
                        <div
                            key={item.mainItem.id}
                            className='row cart-row'
                            onClick={(e) => {
                                e.stopPropagation()
                                onProductClicked(item.mainItem.id)
                            }}
                        >
                            <div className='row'>
                                <img
                                    src={
                                        config.posterUrl +
                                        item.mainItem.poster_path
                                    }
                                    alt={item.mainItem.title}
                                />
                                <div
                                    style={{
                                        position: "relative",
                                        paddingLeft: "20px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-evenly",
                                    }}
                                >
                                    <p className='bold'>
                                        {item.mainItem.title}
                                    </p>
                                    <p className='faded'>{AddSpaceToNumber(item.productOptions[item.currentOption].price)} VND</p>
                                    <div className='faded row center-child'>
                                        <div className='faded quantity non-selectable'>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    changeQuantityHandler(
                                                        item.mainItem.id,
                                                        item.quantity - 1
                                                    )
                                                }}
                                            >
                                                -
                                            </div>
                                            <div className='mid'>
                                                {item.quantity}
                                            </div>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    changeQuantityHandler(
                                                        item.mainItem.id,
                                                        item.quantity + 1
                                                    )
                                                }}
                                            >
                                                +
                                            </div>
                                        </div>
                                        <select
                                            className='productOption faded'
                                            name='ProductOption'
                                            id='0'
                                            onClick={e=>{
                                                e.stopPropagation()
                                            }}
                                        >
                                            <option
                                                value='1'
                                                selected
                                            >
                                                Test
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <p className='p10 bold'>
                                {AddSpaceToNumber(item.productOptions[item.currentOption].price * item.quantity)}{" "}
                                VND
                            </p>
                        </div>
                    );
                })}
            </div>
            {listItem.length ? (
                <div
                    className='row'
                    style={{
                        justifyContent: "space-between",
                        borderTop: "1px solid #888",
                    }}
                >
                    <button
                        className='tbutton bold'
                        onClick={onCheckout}
                        style={{
                            maxWidth: "none",
                            width: "300px",
                            textAlign: "center",
                        }}
                    >
                        Check Out
                    </button>
                    <button
                        className='tbutton'
                        onClick={clearAllItemHandler}
                    >
                        <SVG_RemoveCart />
                    </button>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default CartCard;
