import {arrayUnion, collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {FireStore} from "../../datasource/DatasourceInstance";
import UserAdditionDataModel from "../../model/firestore/UserAdditionDataModel";

const usersCollectionRef = collection(FireStore, 'users')

const defaultData: UserAdditionDataModel = {
    library: [],
    bills: [],
    points: 0,
    posts: [],
}
//TODO: Add delete additional user content
function createAdditionalUserInfo(userID: string) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID)
    return setDoc(usersCollectionDocRef, defaultData)
}

export default function getAdditionalUserInfo(userID: string) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID)
    return new Promise((resolve: (data: UserAdditionDataModel) => void, reject: (code: string, message: string) => void) => {
        const usersCollectionSnap = getDoc(usersCollectionDocRef)
        usersCollectionSnap.then((snapshot) => {
            if (snapshot.exists()) {
                resolve(snapshot.data() as UserAdditionDataModel)
            } else {
                createAdditionalUserInfo(userID)
                    .then(() => resolve(defaultData))
                    .catch(e => reject(e.code, e.message))
            }
        })
            .catch((e) => {
                reject(e.code, e.message)
            })
    })
}

export function addBills(userID: string, billID: string) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID)
    return updateDoc(usersCollectionDocRef, {
        bills: arrayUnion(billID)
    })
}

export function addToLibrary(userID: string, movieID: number) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID)
    return updateDoc(usersCollectionDocRef, {
        library: arrayUnion(movieID)
    })
}

export function updatePoint(userID: string, point: number) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID)
    return updateDoc(usersCollectionDocRef, {
        points: point,
    })
}