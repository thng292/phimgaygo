import {arrayUnion, collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {FireStore} from "../../Datasource/DatasourceInstance";
import UserAdditionData from "../../model/Firebase/UserAdditionData";
import {User} from "firebase/auth";
import config from "../../Datasource/Config";

const usersCollectionRef = collection(FireStore, 'users')

const defaultData = {
    library: [],
    bills: [],
    points: 500000,
    posts: [],
    role: 'member',
}
//TODO: Add delete additional user content
function createAdditionalUserInfo(userID: string, user: User) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID)
    return setDoc(usersCollectionDocRef, {
        ...defaultData,
        photoURL: user.photoURL ?? config.StorageURL(config.defaultAvatar),
        displayName: user.displayName,
    })
}

export default function getAdditionalUserInfo(userID: string, user?: User) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID)
    return new Promise((resolve: (data: UserAdditionData) => void, reject: (code: string, message: string) => void) => {
        const usersCollectionSnap = getDoc(usersCollectionDocRef)
        usersCollectionSnap.then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data()
                //@ts-ignore
                let tmp = data.library.map(value => {
                    return {
                        id: Number(Object.keys(value)[0]),
                        option: Object.values(value)[0],
                    }
                })
                // const tmp2: UserAdditionData = {...data}
                resolve({...data, library: tmp} as UserAdditionData)
            } else {
                if (user!==undefined) {
                    createAdditionalUserInfo(userID, user)
                        .then(() => resolve({
                            ...defaultData,
                            photoURL: user.photoURL ?? config.StorageURL(config.defaultAvatar),
                            displayName: user.displayName
                        } as UserAdditionData))
                        .catch(e => reject(e.code, e.message))
                } else {
                    reject('Idk','')
                }
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

export function addToLibrary(userID: string, movieID: number, option: string) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID)
    return updateDoc(usersCollectionDocRef, {
        library: arrayUnion({[movieID] : option})
    })
}

export function updatePoint(userID: string, point: number) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID)
    return updateDoc(usersCollectionDocRef, {
        points: point,
    })
}