import {
    createUserWithEmailAndPassword,
    deleteUser,
    getAuth,
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
import {FireAuth, FireBaseApp} from './DatasourceInstance'

export default class Authenticate {
    #auth = FireAuth
    #providerGoogle = new GoogleAuthProvider()

    constructor() {
        this.#auth.languageCode = 'en'
        this.#providerGoogle.setCustomParameters({
            'login_hint': 'user@example.com',
        });

        // Connect to emulator
        //#region
        //connectAuthEmulator(this.#auth, "http://localhost:9099");
        //#endregion
    }

    getUser = () => this.#auth.currentUser

    // Sign in, sign up and sign out
    //#region 
    signUpEmail(email: string, password: string, displayName: string) {
        return new Promise((resolve: (user: User) => void, reject: (errorCode: string, errorMessage: string) => void) => {
            createUserWithEmailAndPassword(this.#auth, email, password)
                .then((userCredential) => {
                    this.#auth.currentUser &&
                    updateProfile(this.#auth.currentUser, {
                        displayName,
                    })
                    resolve(userCredential.user)
                })
                .catch((error) => {
                    reject(error.code, error.message)
                })
        })
    }

    signInEmail(email: string, password: string) {
        return new Promise((resolve: (user: User) => void, reject: (errorCode: string, errorMessage: string) => void) => {
            signInWithEmailAndPassword(this.#auth, email, password)
                .then((userCredential) => {
                    resolve(userCredential.user)
                })
                .catch((error) => {
                    reject(error.code, error.message)
                })
        })
    }

    signInGoogle() {
        return new Promise((resolve: (user: User) => void, reject: (errorCode: string, errorMessage: string) => void) => {
            // getRedirectResult(this.#auth)
            signInWithPopup(this.#auth, this.#providerGoogle)
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

    signUserOut() {
        return signOut(this.#auth)
    }

    //#endregion

    //Edit user profile
    //#region
    editUserDisplayName(newName: string) {
        return new Promise<void>((resolve: () => void, reject: (errorCode: string, errorMessage: string) => void) => {
            if (this.#auth.currentUser) {
                updateProfile(this.#auth.currentUser, {
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

    editUserPhoto(photoUrl: string) {
        return new Promise<void>((resolve: () => void, reject: (errorCode: string, errorMessage: string) => void) => {
            if (this.#auth.currentUser) {
                updateProfile(this.#auth.currentUser, {
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

    changeUserEmail(newEmail: string) {
        return new Promise<void>((resolve: () => void, reject: (errorCode: string, errorMessage: string) => void) => {
            if (this.#auth.currentUser !== null) {
                updateEmail(this.#auth.currentUser, newEmail)
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


    changeUserPassword(newPassword: string) {
        return new Promise<void>((resolve: () => void, reject: (errorCode: string, errorMessage: string) => void) => {
            if (this.#auth.currentUser !== null) {
                updatePassword(this.#auth.currentUser, newPassword)
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

    //#endregion

    // Utils
    //#region

    sendVerificationEmail(
        // Redirect to this page
        redirectedUrl: string
    ) {
        return new Promise<void>((resolve: () => void, reject: (code: string, message: string) => void) => {
            if (this.#auth.currentUser) {
                sendEmailVerification(this.#auth.currentUser, {
                    url: redirectedUrl,
                }).then(()=>{
                    resolve()
                }).catch((e)=>{
                    reject(e.code, e.message)
                })
            } else {
                reject("Idk", 'User not signed in')
            }
        })
    }

    sendResetPasswordEmail(email: string) {
        return new Promise<void>((resolve: () => void, reject: (code: string, message: string) => void) => {
            if (this.#auth.currentUser) {
                sendPasswordResetEmail(this.#auth, email, ).then(()=>{
                    resolve()
                }).catch((e)=>{
                    reject(e.code, e.message)
                })
            } else {
                reject("Idk", 'User not signed in')
            }
        })
    }

    reauthenticateUser() {
        return new Promise<void>((resolve: () => void, reject: (code: string, message: string) => void) => {
            if (this.#auth.currentUser) {
                reauthenticateWithPopup(this.#auth.currentUser, this.#providerGoogle).then(()=>{
                    resolve()
                }).catch((e)=>{
                    reject(e.code, e.message)
                })
            } else {
                reject("Idk", 'User not signed in')
            }
        })
    }

    deleteUserAccount() {
        return new Promise<void>((resolve: () => void, reject: (code: string, message: string) => void) => {
            if (this.#auth.currentUser) {
                deleteUser(this.#auth.currentUser).then(()=>{
                    resolve()
                }).catch((e)=>{
                    reject(e.code, e.message)
                })
            } else {
                reject("Idk", 'User not signed in')
            }
        })
    }

    //#endregion


}