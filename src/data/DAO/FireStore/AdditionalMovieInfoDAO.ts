import {arrayUnion, collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {FireStore} from "../../datasource/DatasourceInstance";
import AdditionalMovieInfo from "../../model/firestore/AdditionalMovieInfo";

const moviesCollectionRef = collection(FireStore, 'movies')

const defaultData: AdditionalMovieInfo = {
    comments: [],
    options: [{
       title: '720P',
       price: 200_000
    }, {
        title: 'FullHD',
        price: 500_000
    }, {
        title: '4K',
        price: 1_000_000
    }, {
        title: '4K-HDR',
        price: 1_500_000,
    }, {
        title: 'Original',
        price: 3_000_000
    }, {
        title: '720P_RENT',
        price: Math.floor(200_000*.4)
    }, {
        title: 'FullHD_RENT',
        price: Math.floor(500_000*.4)
    }, {
        title: '4K_RENT',
        price: Math.floor(1_000_000*.4)
    }, {
        title: '4K-HDR_RENT',
        price: Math.floor(1_500_000*.4)
    }, {
        title: 'ORIGINAL_RENT',
        price: Math.floor(3_000_000*.4)
    }],
}

function createAdditionalMovieInfo(movieID: number) {
    const moviesCollectionDocRef = doc(moviesCollectionRef, String(movieID))
    return setDoc(moviesCollectionDocRef, defaultData)
}

export default function getAdditionalMovieInfo(movieID: number) {
    const moviesCollectionDocRef = doc(moviesCollectionRef, String(movieID))
    return new Promise((resolve: (data: AdditionalMovieInfo) => void, reject: (code: string, message: string) => void) => {
        const moviesCollectionSnap = getDoc(moviesCollectionDocRef)
        moviesCollectionSnap.then((snapshot) => {
            if (snapshot.exists()) {
                resolve(snapshot.data() as AdditionalMovieInfo)
            } else {
                createAdditionalMovieInfo(movieID)
                    .then(() => resolve(defaultData))
                    .catch(e => reject(e.code, e.message))
            }
        })
            .catch((e) => {
                reject(e.code, e.message)
            })
    })
}

export function addComments(movieID: number, commentID: string) {
    const moviesCollectionDocRef = doc(moviesCollectionRef, String(movieID))
    return updateDoc(moviesCollectionDocRef, {
        comments: arrayUnion(commentID)
    })
}