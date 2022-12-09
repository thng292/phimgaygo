import React, {FunctionComponent, useEffect, useState} from 'react';
import {useOutletContext} from "react-router-dom";
import ContextProps from "../Layout/ContextProps";
import '../tailwindTemplate.css';
import AddSpaceToNumber from "../../Utils/AddSpaceToNumber";
import config from "../../data/datasource/config";
import createBill from "../../data/DAO/FireStore/BillDAO";
import LoadingSpinner from "../common/LoadingSpinner";
import {addBills, addToLibrary, updatePoint} from "../../data/DAO/FireStore/AdditionalUserInfoDAO";

const CheckOut: FunctionComponent<{}> = (props) => {
    const {navController, checkoutStuff, setCheckoutStuff, user, additionalUserInfo} = useOutletContext<ContextProps>();
    const [showSpinner, changeShowSpinner] = useState(false)
    const [total, changeTotal] = useState(0)
    //False: point, True: card
    const [PaymentMethod, changePaymentMethod] = useState(false)
    const currTax = .1;
    useEffect(() => {
        let tmp = 0;
        checkoutStuff.every(value => {
            tmp += value.productOptions[value.currentOption].price * value.quantity
        })
        changeTotal(tmp);
    }, [checkoutStuff])
    useEffect(() => {
        let tmp = setTimeout(() => {
                if (!user) {
                    navController('/auth')
                }
            }
            , 5000)
        if (user === null) {
            changeShowSpinner(true)
        } else {
            changeShowSpinner(false)
        }
        return () => {
            clearTimeout(tmp)
        }
    }, [user])
    if (user !== null) {
        // if (1) {
        return <>
            <div style={{
                display: showSpinner ? 'flex' : 'none',
                position: "fixed",
                height: '100vh',
                width: '100vw',
                zIndex: '100',
                justifyContent: "center",
                alignItems: "center",
            }}>
                <LoadingSpinner/>
            </div>
            <div className={'w-full max-w-5xl grid grid-cols-3/2 gap-4 justify-evenly p-8'}>
                <section className={'bg-white rounded-xl shadow-2xl p-6 h-fit'}>
                    <p className={'text-2xl font-bold pb-2'}>Order Summary</p>
                    {checkoutStuff.length ? <p>Please check your order.</p> : <p>Your cart are empty.</p>}
                    <div>
                        {checkoutStuff.map((item) => {
                            return (
                                <div
                                    className='flex flex-row justify-start items-start w-full rounded-2xl my-4 cursor-pointer transition-all hover:bg-containerBG-1000'
                                    onClick={() => {
                                        navController('/detail/' + item.mainItem.id)
                                    }}
                                >
                                    <img
                                        src={
                                            config.posterUrl +
                                            item.mainItem.poster_path
                                        }
                                        alt={item.mainItem.title}
                                        className={'w-20 rounded-xl border border-gray-400'}
                                    />
                                    <div
                                        className={'pl-4 w-full h-full flex flex-col items-between'}
                                    >
                                        <p className='font-bold'>
                                            {item.mainItem.title}
                                        </p>
                                        <p className={''}>Option: {item.productOptions[item.currentOption].title}</p>
                                        <div className={'flex flex-row justify-between w-full'}>
                                            <p>
                                                {AddSpaceToNumber(item.productOptions[item.currentOption].price)} x {item.quantity}
                                            </p>
                                            <p className='font-bold'>
                                                {AddSpaceToNumber(item.productOptions[item.currentOption].price * item.quantity)}{" "}
                                                VND
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <div>
                    <section className={'p-6 shadow-xl bg-white rounded-xl'}>
                        <p className={'text-2xl font-bold pb-2'}>Payment Detail</p>
                        <div className={'w-full'}>
                            <p>Choose your payment method.</p>
                            <div className={'flex flex-row w-full justify-evenly rounded-t-xl'}>
                                <p
                                    className={'text-xl font-bold py-2 cursor-pointer transition-all border-b-main-1000' +
                                        ' w-full text-center hover:bg-gray-100' + (PaymentMethod ? '' : ' border-b-2')}
                                    onClick={() => changePaymentMethod(false)}
                                >Point</p>
                                <p
                                    className={'text-xl font-bold py-2 cursor-pointer transition-all border-b-main-1000' +
                                        ' w-full text-center hover:bg-gray-100' + (PaymentMethod ? ' border-b-2' : '')}
                                    onClick={() => changePaymentMethod(true)}
                                >Card</p>
                            </div>
                            {PaymentMethod ? <form>
                                <input type="radio" id="Visa" name="Payment" className={'hidden checkedLabel'}/>
                                <label
                                    htmlFor='Visa'
                                    className={'block font-bold py-4 px-4 border-2 my-2 border-main-400' +
                                        ' transition-all' +
                                        ' rounded-xl' +
                                        ' hover:bg-gray-100'}
                                >
                                    Visa
                                </label>
                                <input type="radio" id="MasterCard" name="Payment" className={'hidden checkedLabel'}/>
                                <label htmlFor='MasterCard' className={'block font-bold py-4 px-4 border-2 my-2' +
                                    ' border-main-400' +
                                    ' transition-all' +
                                    ' rounded-xl' +
                                    ' hover:bg-gray-100'}>
                                    Master Card
                                </label>
                                <input type="radio" id="Momo" name="Payment" className={'hidden checkedLabel'}/>
                                <label htmlFor='Momo'
                                       className={'block font-bold py-4 px-4 border-2 my-2 border-main-400' +
                                           ' transition-all' +
                                           ' rounded-xl' +
                                           ' hover:bg-gray-100'}>
                                    Momo
                                </label>
                            </form> : <div className={'py-4'}>
                                <p>You have: {additionalUserInfo?.points} points</p>
                                {
                                    (additionalUserInfo?.points >= total) ?
                                        <p>You have enough point to pay this.</p> :
                                        <p>You don't have enough point to pay this.</p>
                                }
                            </div>}
                        </div>
                        <div className={'grid grid-cols-2 pt-2'}>
                            <p className={'font-bold'}>Sub Total</p>
                            <p className={'text-right'}>{AddSpaceToNumber(total)} VND</p>
                            <p className={'font-bold'}>Tax({currTax * 100}%)</p>
                            <p className={'text-right'}>{AddSpaceToNumber(total * currTax)} VND</p>
                            <div className={'col-span-full border-b border-gray-300 my-1'}></div>
                            <p className={'font-bold'}>Total</p>
                            <p className={'text-right'}>{AddSpaceToNumber(Number((total * (1 + currTax)).toFixed(0)))} VND</p>
                        </div>
                        <button
                            disabled={(((additionalUserInfo?.points ?? 0) < total) || (checkoutStuff.length === 0))}
                            className={`mt-4 p-4 bg-main-1000 text-center rounded-xl w-full font-bold text-white text-xl tracking-wider disabled:bg-main-400`}
                            onClick={() => {
                                changeShowSpinner(true)
                                createBill({
                                    userID: user?.uid,
                                    total: total,
                                    tax: .1,
                                    discount: 0,
                                    productList: checkoutStuff.map(value => {
                                        return {
                                            productID: value.mainItem.id,
                                            productName: value.mainItem.original_title,
                                            productOption: value.productOptions[value.currentOption],
                                            quantity: value.quantity,
                                        }
                                    })
                                })
                                    .then(val => {
                                        //TODO: Add movie to user library, add bill to user data, change point
                                        checkoutStuff.every(value => {
                                            addToLibrary(user.uid, value.mainItem.id, value.productOptions[value.currentOption].title)
                                                .then(()=>{
                                                    additionalUserInfo.library.push({
                                                        id: value.mainItem.id,
                                                        option: value.productOptions[value.currentOption].title,
                                                    })
                                                })
                                                .catch(console.log)
                                        })
                                        addBills(user.uid, val)
                                            .then(()=>{
                                                (!PaymentMethod) && updatePoint(user.uid, additionalUserInfo.points - total)
                                                setCheckoutStuff([])
                                                navController(`bill/${val}`)
                                            })
                                            .catch(console.log)
                                    })
                            }}
                        >
                            {PaymentMethod ?
                                `Pay with your card`
                                :
                                `Pay using ${AddSpaceToNumber(Number((total * (1 + currTax)).toFixed(0)))} points`
                            }
                        </button>
                    </section>
                </div>
            </div>
        </>
    } else {
        return <div style={{
            display: showSpinner ? 'flex' : 'none',
            position: "fixed",
            height: '100vh',
            width: '100vw',
            zIndex: '100',
            justifyContent: "center",
            alignItems: "center",
        }}>
            <LoadingSpinner/>
        </div>
    }
};

export default CheckOut;
