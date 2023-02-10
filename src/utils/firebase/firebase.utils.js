import { initializeApp } from 'firebase/app';

import { 
  getAuth, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged, } from 'firebase/auth';

import { 
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs, 
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCP9MXuJeFZ681RJS85zh8-1uHOp04wg0w",
    authDomain: "react-crwn-2c7e5.firebaseapp.com",
    projectId: "react-crwn-2c7e5",
    storageBucket: "react-crwn-2c7e5.appspot.com",
    messagingSenderId: "404805341164",
    appId: "1:404805341164:web:4bdab806f40beaf91bbac9"
  };
  
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGoooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore();

export const addCollectionAndDocments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('added data to firestore')
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());

//   const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
//     const {title, items} = docSnapshot.data();
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});

//   return categoryMap;
};


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;

  const userRefDoc = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userRefDoc);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRefDoc, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user' + error.message)
    }
  }
  return userRefDoc;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback);