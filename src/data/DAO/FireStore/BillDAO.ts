import {collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, where} from "firebase/firestore";
import {FireStore} from "../../datasource/DatasourceInstance";
import ProductOption from "../../model/firestore/ProductOption";
import Bill from "../../model/firestore/Bill";
import firebase from "firebase/compat";
import Comment from "../../model/firestore/Comment";

const billCollectionRef = collection(FireStore, 'bills')

export interface createBillProps {
    discount: number,
    productList: {
        productID: number,
        quantity: number,
        productOption: ProductOption,
    }[],
    tax: number,
    time: string,
    total: number,
    userID: string,
}

const createBill = (props: createBillProps) => {
    const billDocRef = doc(billCollectionRef)
    return new Promise((resolve: (billID: string) => void, reject: (code: string, message: string) => void) => {
        setDoc(billDocRef, props)
            .then(() => {
                resolve(billDocRef.id)
            })
            .catch((e) => reject(e.code, e.message))
    })
};

export function getBillDetail(billID: string) {
    const billDocRef = doc(billCollectionRef, billID)
    return new Promise((resolve: (data: Bill) => void, reject: (code: string, message: string) => void) => {
        getDoc(billDocRef)
            .then(snapshot => {
                //TODO: watch out!
                resolve({
                    id: billID,
                    ...snapshot.data(),
                } as Bill)
            })
            .catch((e) =>
                reject(e.code, e.message)
            )
    })
}


export function getUserBills(userID: string, resultLimit: number = 20) {
    const getQuery = query(billCollectionRef, where('userID','==',userID), orderBy(firebase.firestore.FieldPath.documentId()), orderBy('time',"desc"), limit(resultLimit))
    return new Promise((resolve: (data: Bill[]) => void, reject: (code: string, message: string) => void) => {
        getDocs(getQuery)
            .then(snapshot => {
                const results: Bill[] = []
                //TODO: watch out! Need Index
                snapshot.forEach(value => {
                    results.push({
                        ...value.data(),
                        id: value.id,
                    } as Bill)
                })
            })
            .catch(e => reject(e.code, e.message))
    })
}

export default createBill