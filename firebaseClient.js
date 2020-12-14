import firebaseClient from 'firebase/app';
import 'firebase/auth';
console.log(process.env.NEXT_PUBLIC_FIREBASE_CLIENT_APIKEY);

const CLIENT_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_DATABASEURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_APPID,
};

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  window.firebase = firebaseClient;
}

export { firebaseClient };
