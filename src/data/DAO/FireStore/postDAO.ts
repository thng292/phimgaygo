import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    where
} from "firebase/firestore";
import {FireStore} from "../../datasource/DatasourceInstance";
import firebase from "firebase/compat";
import Post from "../../model/firestore/Post";

const postCollectionRef = collection(FireStore, 'posts')

export default function createPost(userID: string, title: string, content: HTMLElement) {
    const postDocRef = doc(postCollectionRef)
    return setDoc(postDocRef, {
        author: userID,
        title: title,
        body: content.innerHTML,
        comments: [],
        down_vote_count: 0,
        up_vote_count: 0,
        time: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

export function getPostDetail(postID: string) {
    const postDocRef = doc(postCollectionRef, postID)
    return new Promise((resolve: (data: Post) => void, reject: (code: string, message: string) => void) => {
        getDoc(postDocRef)
            .then(snapshot => {
                if (snapshot.exists()) {
                    resolve({
                        ...snapshot.data(),
                        id: snapshot.id
                    } as Post)
                } else {
                    reject('404', 'Not found')
                }
            })
            .catch(e => {
                reject(e.code, e.message)
            })
    })
}

export function getUserPosts(userID: string, resultLimit: number) {
    const getQuery = query(postCollectionRef, where('author', '==', userID), orderBy('time', 'desc'), limit(resultLimit))
    return new Promise((resolve: (data: Post[])=>void, reject: (code: string, message: string)=>void) => {
        getDocs(getQuery)
            .then(snapshot => {
                const results: Post[] = []
                snapshot.forEach(value => {
                    results.push({
                        ...value.data(),
                        id: value.id
                    } as Post)
                })
                resolve(results)
            })
            .catch(e=>reject(e.code, e.message))
    })
}

export function getAllPosts(resultLimit: number) {
    const getQuery = query(postCollectionRef, orderBy('time', "desc"))
    return new Promise((resolve: (data: Post[])=>void, reject: (code: string, message: string)=>void) => {
        getDocs(getQuery)
            .then(snapshot => {
                let results: Post[] = []
                snapshot.forEach(value => {
                    results.push({
                        ...value.data(),
                        id: value.id,
                    } as Post)
                })
                resolve(results)
            })
            .catch(e => reject(e.code, e.message))
    })
}