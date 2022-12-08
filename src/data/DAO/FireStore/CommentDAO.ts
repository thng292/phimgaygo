import {
    arrayUnion,
    collection,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import {FireStore} from "../../datasource/DatasourceInstance";
import firebase from "firebase/compat";
import Comment from "../../model/firestore/Comment";

const commentsCollectionRef = collection(FireStore, 'comments')

export default function createComment(userID: string, content: string) {
    const commentsCollectionDocRef = doc(commentsCollectionRef)
    return new Promise((resolve: (cmt: Comment)=>void, reject) => {
        setDoc(commentsCollectionDocRef, {
            author: userID,
            comments: [],
            content: content,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            down_vote_count: 0,
            up_vote_count: 0,
        }).then(()=>{
            resolve({
                author: userID,
                comments: [],
                content: content,
                time: '0',
                down_vote_count: 0,
                up_vote_count: 0,
                id: commentsCollectionDocRef.id,
            })
        })
            .catch(e=>{
                reject(e)
            })
    })
}

//TODO: Impl Pagination
export function getComments(CommentsID: string[], getLimit: number = 20) {
    //console.log("CommentIDs are: ", CommentsID)
    if (CommentsID.length === 0) {
        return new Promise((resolve: (data: Comment[]) => void, reject: (code: string, message: string) => void) => {
            resolve([])
        })
    }
    const getQuery = query(commentsCollectionRef, where(firebase.firestore.FieldPath.documentId(), 'in', CommentsID), limit(getLimit))
    return new Promise((resolve: (data: Comment[]) => void, reject: (code: string, message: string) => void) => {
        getDocs(getQuery)
            .then(snapshot => {
                const results: Comment[] = []
                //TODO: watch out! Need Index
                snapshot.forEach(value => {
                    results.push({
                        ...value.data(),
                        id: value.id,
                    } as Comment)
                })
                resolve(results)
            })
            .catch(e => reject(e.code, e.message))
    })
}

export function updateComment(parentCommentID: string, childCommentID: string) {
    const parentCommentDocRef = doc(commentsCollectionRef, parentCommentID)
    return updateDoc(parentCommentDocRef, {
        comments: arrayUnion(childCommentID)
    })
}

export function upVoteComment(commentID: string) {
    const commentDocRef = doc(commentsCollectionRef, commentID)
    return updateDoc(commentDocRef, {
        up_vote_count: firebase.firestore.FieldValue.increment(1)
    })
}

export function downVoteComment(commentID: string) {
    const commentDocRef = doc(commentsCollectionRef, commentID)
    return updateDoc(commentDocRef, {
        down_vote_count: firebase.firestore.FieldValue.increment(1)
    })
}