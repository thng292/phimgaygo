import {
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { FireStore } from "../../Datasource/DatasourceInstance";
import UserAdditionData, {
    FavoriteItem,
    HistoryItem,
} from "../../model/Firebase/UserAdditionData";
import { User } from "firebase/auth";

const usersCollectionRef = collection(FireStore, "users");

const defaultData: UserAdditionData = {
    favorites: [],
    histories: [],
};

export function deleteAdditionalUserInfo(userID: string) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID);
    return deleteDoc(usersCollectionDocRef);
}

function createAdditionalUserInfo(userID: string) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID);
    return setDoc(usersCollectionDocRef, {
        ...defaultData,
    });
}

export default function getAdditionalUserInfo(userID: string, user?: User) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID);
    return new Promise(
        (
            resolve: (data: UserAdditionData) => void,
            reject: (code: string, message: string) => void
        ) => {
            const usersCollectionSnap = getDoc(usersCollectionDocRef);
            usersCollectionSnap
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.data();
                        resolve(data as UserAdditionData);
                    } else {
                        createAdditionalUserInfo(userID)
                            .then(() =>
                                resolve({
                                    ...defaultData,
                                })
                            )
                            .catch((e) => reject(e.code, e.message));
                    }
                })
                .catch((e) => {
                    reject(e.code, e.message);
                });
        }
    );
}

export function addToFavorite(userID: string, favoriteItem: FavoriteItem) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID);
    return updateDoc(usersCollectionDocRef, {
        favorites: arrayUnion(favoriteItem),
    });
}

export function removeFromFavorite(userID: string, favoriteItem: FavoriteItem) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID);
    return updateDoc(usersCollectionDocRef, {
        favorites: arrayRemove(favoriteItem),
    });
}

export function addToHistory(userID: string, historyItem: HistoryItem) {
    const usersCollectionDocRef = doc(usersCollectionRef, userID);
    return updateDoc(usersCollectionDocRef, {
        histories: arrayUnion(historyItem),
    });
}

//TODO auto remove item in history if size exceed 200
//TODO limit favorite size to 200