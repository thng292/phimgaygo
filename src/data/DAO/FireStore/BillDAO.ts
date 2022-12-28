import {collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, where} from "firebase/firestore";
import {FireStore} from "../../Datasource/DatasourceInstance";
import ProductOption from "../../model/Firebase/ProductOption";
import Bill from "../../model/Firebase/Bill";
import firebase from "firebase/compat";

const billCollectionRef = collection(FireStore, 'bills')

export interface createBillProps {
    discount: number,
    productList: {
        productID: number,
        productName: string,
        quantity: number,
        productOption: ProductOption,
    }[],
    tax: number,
    total: number,
    userID: string,
}

const createBill = (props: createBillProps) => {
    const billDocRef = doc(billCollectionRef)
    return new Promise((resolve: (billID: string) => void, reject: (code: string, message: string) => void) => {
        setDoc(billDocRef, {
            ...props,
            time: firebase.firestore.FieldValue.serverTimestamp(),
        })
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
                if (snapshot.exists()) {

                    resolve({
                        id: billID,
                        ...snapshot.data(),
                    } as Bill)
                } else {
                    reject('404', 'Not Found')
                }
            })
            .catch((e) =>
                reject(e.code, e.message)
            )
    })
}


export function getUserBills(userID: string, resultLimit: number = 20) {
    const getQuery = query(billCollectionRef, where('userID', '==', userID), orderBy(firebase.firestore.FieldPath.documentId()), orderBy('time', "desc"), limit(resultLimit))
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