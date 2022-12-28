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
    return new Promise((resolve: (user: User) => void, reject: (errorCode: string, errorMessage: string) => void) => {
        createUserWithEmailAndPassword(FireAuth, email, password)
            .then((userCredential) => {
                FireAuth.currentUser &&
                updateProfile(FireAuth.currentUser, {
                    displayName,
                })
                resolve(userCredential.user)
            })
            .catch((error) => {
                reject(error.code, error.message)
            })
    })
}

export function signInEmail(email: string, password: string) {
    return new Promise((resolve: (user: User) => void, reject: (errorCode: string, errorMessage: string) => void) => {
        signInWithEmailAndPassword(FireAuth, email, password)
            .then((userCredential) => {
                resolve(userCredential.user)
            })
            .catch((error) => {
                reject(error.code, error.message)
            })
    })
}

export function signInGoogle() {
    return new Promise((resolve: (user: User) => void, reject: (errorCode: string, errorMessage: string) => void) => {
        // getRedirectResult(FireAuth)
        const providerGoogle = new GoogleAuthProvider()
        signInWithPopup(FireAuth, providerGoogle)
            .then((result) => {
                if (result) {
                    resolve(result.user)
                } else {
                    reject("Idk", "Strange error")
                }
            })
            .catch((error) => {
                reject(error.code, error.message)
            })
    })
}

export function signUserOut() {
    return signOut(FireAuth)
}

//endregion

//Edit user profile
//region
export function editUserDisplayName(newName: string) {
    return new Promise<void>((resolve: () => void, reject: (errorCode: string, errorMessage: string) => void) => {
        if (FireAuth.currentUser) {
            updateProfile(FireAuth.currentUser, {
                displayName: newName,
            })
                .then(() => {
                    resolve()
                })
                .catch((error) => {
                    reject(error.code, error.message)
                })
        } else {
            reject("Idk", 'User not signed in')
        }
    })
}

export function editUserPhoto(photoUrl: string) {
    return new Promise<void>((resolve: () => void, reject: (errorCode: string, errorMessage: string) => void) => {
        if (FireAuth.currentUser) {
            updateProfile(FireAuth.currentUser, {
                photoURL: photoUrl,
            })
                .then(() => {
                    resolve()
                })
                .catch((error) => {
                    reject(error.code, error.message)
                })
        } else {
            reject("Idk", 'User not signed in')
        }
    })
}

export function changeUserEmail(newEmail: string) {
    return new Promise<void>((resolve: () => void, reject: (errorCode: string, errorMessage: string) => void) => {
        if (FireAuth.currentUser !== null) {
            updateEmail(FireAuth.currentUser, newEmail)
                .then(() => {
                    resolve()
                })
                .catch((e) => {
                    reject(e.code, e.message)
                })
        } else {
            reject("Idk", 'User not signed in')
        }
    })
}


export function changeUserPassword(newPassword: string) {
    return new Promise<void>((resolve: () => void, reject: (errorCode: string, errorMessage: string) => void) => {
        if (FireAuth.currentUser !== null) {
            updatePassword(FireAuth.currentUser, newPassword)
                .then(() => {
                    resolve()
                })
                .catch((e) => {
                    reject(e.code, e.message)
                })
        } else {
            reject("Idk", 'User not signed in')
        }
    })
}

//endregion

// utils
//region

export function sendVerificationEmail(
    // Redirect to this page
    redirectedUrl: string
) {
    return new Promise<void>((resolve: () => void, reject: (code: string, message: string) => void) => {
        if (FireAuth.currentUser) {
            sendEmailVerification(FireAuth.currentUser, {
                url: redirectedUrl,
            }).then(() => {
                resolve()
            }).catch((e) => {
                reject(e.code, e.message)
            })
        } else {
            reject("Idk", 'User not signed in')
        }
    })
}

export function sendResetPasswordEmail(email: string) {
    return new Promise<void>((resolve: () => void, reject: (code: string, message: string) => void) => {
        if (FireAuth.currentUser) {
            sendPasswordResetEmail(FireAuth, email,).then(() => {
                resolve()
            }).catch((e) => {
                reject(e.code, e.message)
            })
        } else {
            reject("Idk", 'User not signed in')
        }
    })
}

export function reauthenticateUser() {
    return new Promise<void>((resolve: () => void, reject: (code: string, message: string) => void) => {
        if (FireAuth.currentUser) {
            const providerGoogle = new GoogleAuthProvider()
            reauthenticateWithPopup(FireAuth.currentUser, providerGoogle).then(() => {
                resolve()
            }).catch((e) => {
                reject(e.code, e.message)
            })
        } else {
            reject("Idk", 'User not signed in')
        }
    })
}

export function deleteUserAccount() {
    return new Promise<void>((resolve: () => void, reject: (code: string, message: string) => void) => {
        if (FireAuth.currentUser) {
            deleteUser(FireAuth.currentUser).then(() => {
                resolve()
            }).catch((e) => {
                reject(e.code, e.message)
            })
        } else {
            reject("Idk", 'User not signed in')
        }
    })
}
//endregion