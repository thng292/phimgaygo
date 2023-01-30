import {
    createUserWithEmailAndPassword,
    deleteUser,
    GoogleAuthProvider,
    reauthenticateWithPopup,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateEmail,
    updatePassword,
    updateProfile,
    User,
} from 'firebase/auth'
import {FireAuth} from '../../Datasource/DatasourceInstance'

// Sign in, sign up and sign out
//region
export function signUpEmail(email: string, password: string, displayName: string) {
    return new Promise((resolve: (user: User) => void, reject: (error: any) => void) => {
        createUserWithEmailAndPassword(FireAuth, email, password)
            .then((userCredential) => {
                updateProfile(userCredential.user, {
                    displayName,
                })
                resolve(userCredential.user)
            })
            .catch(reject)
    })
}

export function signInEmail(email: string, password: string) {
    return signInWithEmailAndPassword(FireAuth, email, password)
}

export function signInGoogle() {
    return signInWithPopup(FireAuth, new GoogleAuthProvider())
}

export function signUserOut() {
    return signOut(FireAuth)
}

export function deleteUserAccount(user: User) {
    return deleteUser(user)
}