import React, {FunctionComponent, useState} from 'react';
import {useOutletContext, useParams, Link} from "react-router-dom";
import ContextProps from "../Layout/ContextProps";
import '../tailwindTemplate.css'
import {getBillDetail} from "../../data/DAO/FireStore/BillDAO";
import Bill from "../../data/model/firestore/Bill";
import LoadingSpinner from "../common/LoadingSpinner";
import Logo from "../common/Logo";
import AddSpaceToNumber from "../../Utils/AddSpaceToNumber";

const BillView: FunctionComponent<{}> = (props) => {
    const {navController, user, additionalUserInfo} = useOutletContext<ContextProps>()
    const {billId} = useParams()
    const [billDetail, changeBillDetail] = useState<Bill>()
    const [err, setErr] = useState<{ code: string, msg: string }>()
    if (billId) {
        getBillDetail(billId)
            .then(data => {
                changeBillDetail(data)

            })
            // @ts-ignore
            .catch((code, msg) => {
                setErr({code, msg})
            })
    }
    if (err !== undefined) {
        return <div className={'w-screen h-screen flex flex-col justify-center items-center'}>
            <h1 className={'font-bold text-8xl'}>{err.code}</h1>
            <h3>{err.msg}</h3>
        </div>
    } else if (billDetail !== undefined && user !== null) {
        return <div className={'w-screen h-screen flex justify-center items-center'}>
            <div className={'bg-white p-6 rounded-xl shadow-xl'}>
                <Logo/>
                <p className={'text-3xl text-bold w-full text-center'}>Bill</p>
                <div className={'grid grid-cols-2'}>
                    <p className={'text-bold'}>Name:</p>
                    <p className={'text-right'}>{user.displayName}</p>
                    <p className={'text-bold'}>Email:</p>
                    <p className={'text-right'}>{user.email}</p>
                </div>
                <div className={'grid grid-cols-bill gap-2 py-4'}>
                    <p className={'text-bold'}>Id</p>
                    <p className={'text-bold'}>Name</p>
                    <p className={'text-bold text-right'}>Quantity</p>
                    <p className={'text-bold text-right'}>Option</p>
                    <p className={'text-bold text-right'}>Price</p>
                    {billDetail.productList.map(value => {
                        return <>
                            <p>{value.productID}</p>
                            <p>{value.productName}</p>
                            <p className={'text-right'}>{value.quantity}</p>
                            <p className={'text-right'}>{value.productOption.title}</p>
                            <p className={'text-right'}>{AddSpaceToNumber(value.productOption.price)}</p>
                        </>
                    })}
                </div>
                <div className={'w-full grid grid-cols-2'}>
                    <p className={'text-bold'}>Tax:</p>
                    <p className={'text-right'}>{billDetail.tax * 100}%</p>
                    <p className={'text-bold'}>Total:</p>
                    <p className={'text-right'}>{AddSpaceToNumber(billDetail.total)} VND</p>
                </div>
                <p className={'w-full text-center text-xl'}>Thank you for using our service!</p>
                <Link className={'w-full text-center hover:text-main-400    '} to={'/'}>Return to home page.</Link>
            </div>
        </div>
    } else {
        return <div className={'w-screen h-screen flex justify-center items-center'}>
            <LoadingSpinner/>
        </div>
    }
};

export default BillView;
