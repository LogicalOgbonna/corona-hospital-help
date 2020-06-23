import firebase from "firebase";

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: "corona-hospital-help",
    storageBucket: "corona-hospital-help.appspot.com",
    messagingSenderId: "423434005418",
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

interface userAuth {
    displayName: string;
    email: string;
    uid: string;
}
export const createUserProfileDocument = async ({ displayName, email, uid }: userAuth, additionalData: any) => {
    if (!displayName || !email || !uid) return

    const userRef = db.doc(`users/${uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (e) {
            console.log("createUserProfileDocument -> e", e.message)
        }
    }
    return userRef;

}
interface User {
    id: string
}
export const createSearchHistory = async ({ id }: User, search: Object) => {
    const searchRef = db.doc(`users/${id}`);
    const searchSnapshot = await searchRef.get();
    const searchData: any = searchSnapshot.data();
    if (!searchData.search) {
        try {
            await searchRef.set({
                ...searchData,
                search: [search]
            })
        } catch (e) {
            console.log("createSearchHistory -> e", e.message)

        }

        return;
    }
    try {
        await searchRef.set({
            ...searchData,
            search: [...searchData.search, { ...search }]
        })
    } catch (e) {
        console.log("createSearchHistory -> e", e.message)
    }
    return;
}

export const getUserSearches = async ({ id }: User) => {
    const searchRef = db.doc(`users/${id}`);
    const searchSnapshot = await searchRef.get();
    const searchData: any = searchSnapshot.data();

    if (!searchData.search) {
        return [];
    }

    return searchData.search
}

export default firebase;