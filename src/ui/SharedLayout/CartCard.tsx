import React, {FC} from "react";
import config from "../../data/Datasource/Config";
import CartItem from "../../data/model/Cart/CartItem";
import MovieOverview from "../../data/model/Movie/MovieOverview";
import AddSpaceToNumber from "../../utils/AddSpaceToNumber";
import SVG_Close from "../common/SVG/SVG_Close";
import SVG_RemoveCart from "../common/SVG/SVG_RemoveCart";
import SVG_Delete from "../common/SVG/SVG_Delete";

//TODO
const CartCard: FC<{
    listItem: CartItem<MovieOverview>[];
    show: boolean;
    changeQuantityHandler: (id: number, newQuantity: number) => void;
    changeOptionHandler: (id: number, option: number) => void;
    removeItemHandler: (id: number) => void;
    clearAllItemHandler: () => void;
    onClose: () => void;
    onProductClicked: (productId: number) => void;
    onCheckout: () => void;
}> = ({
          listItem,
          show,
          changeQuantityHandler,
          changeOptionHandler,
          removeItemHandler,
          clearAllItemHandler,
          onClose,
          onProductClicked,
          onCheckout,
      }) => {
    return (
        <div
            className='fixed top-12 right-0 w-screen rounded-2xl bg-white p-6 shadow-2xl sm:absolute sm:top-14 sm:w-fit'
            style={{
                minWidth: 'max-content',
                transition: ".2s ease-in-out",
                opacity: show ? "100%" : "0%",
                visibility: show ? 'visible' : 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className={'flex flex-row justify-between items-center'}
            >
                <p
                    className='text-2xl font-bold'
                >
                    Your Cart
                </p>
                <div
                    className={'cursor-pointer p-1'}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                >
                    <SVG_Close/>
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
                            className='my-2 flex min-h-min w-full cursor-default flex-row justify-between border-b border-gray-300 hover:rounded-xl hover:bg-gray-50'
                            onClick={(e) => {
                                e.stopPropagation()
                                onProductClicked(item.mainItem.id)
                            }}
                        >
                            <div className='flex flex-row'>
                                <img
                                    className={'rounded-xl'}
                                    style={{
                                        maxHeight: '7rem'
                                    }}
                                    src={
                                        config.posterUrl +
                                        item.mainItem.poster_path
                                    }
                                    alt={item.mainItem.title}
                                />
                                <div
                                    className={'relative pl-4 flex flex-col justify-evenly'}
                                >
                                    <p className='font-bold'>
                                        {item.mainItem.title}
                                    </p>
                                    <p>{AddSpaceToNumber(item.productOptions[item.currentOption].price)} VND</p>
                                    <div className='flex flex-row items-center'>
                                        <div className='rounded-sm border border-gray-300 bg-white'>
                                            <div
                                                className={'cursor-pointer inline-block w-fit h-fit px-2'}
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
                                            <div
                                                className={'cursor-default inline-block w-fit h-fit px-2 border-l border-r border-l-gray-300 border-r-gray-300'}>
                                                {item.quantity}
                                            </div>
                                            <div
                                                className={'cursor-pointer inline-block w-fit h-fit px-2'}
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
                                            className='border border-gray-300 rounded-sm mx-2 p-0.5 font-bold'
                                            name='ProductOption'
                                            id='0'
                                            onClick={e => {
                                                e.stopPropagation()
                                            }}
                                            value={item.currentOption}
                                            onChange={event => {
                                                changeOptionHandler(item.mainItem.id, Number(event.currentTarget.value))
                                            }}
                                        >
                                            {item.productOptions.map((value, index) => {
                                                return <option value={index}>{value.title}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='p-2 font-bold'>
                                    {AddSpaceToNumber(item.productOptions[item.currentOption].price * item.quantity)}{" "}
                                    VND
                                </p>
                                <button
                                    className={'float-right p-4'}
                                    onClick={() => removeItemHandler(item.mainItem.id)}
                                >
                                    <SVG_Delete/>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {listItem.length ? (
                <div
                    className='flex flex-row justify-between border-t border-t-gray-300'
                >
                    <button
                        className='text-center font-bold tbutton'
                        onClick={onCheckout}
                    >
                        Check Out
                    </button>
                    <button
                        className='tbutton'
                        onClick={clearAllItemHandler}
                    >
                        <SVG_RemoveCart/>
                    </button>
                </div>
            ) : (
                "There is nothing in your cart."
            )}
        </div>
    );
};

export default CartCard;
