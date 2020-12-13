import firebaseClient from 'firebase/app';
import 'firebase/auth';

/*
Copy/paste your *client-side* Firebase credentials below. 
To get these, go to the Firebase Console > open your project > Gear Icon >
Project Settings > General > Your apps. If you haven't created a web app
already, click the "</>" icon, name your app, and copy/paste the snippet.
Otherwise, go to Firebase SDK Snippet > click the "Config" radio button >
copy/paste.
*/
const CLIENT_CONFIG = {
  apiKey: 'AIzaSyDvHUOaaxeOwJDW3XS3yjqmjwDoXYCxKjQ',
  authDomain: 'kigtinterface.firebaseapp.com',
  databaseURL: 'https://kigtinterface.firebaseio.com',
  projectId: 'kigtinterface',
  storageBucket: 'kigtinterface.appspot.com',
  messagingSenderId: '663507140562',
  appId: '1:663507140562:web:d709b10d93ffddc263d20b',
};

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  window.firebase = firebaseClient;
}

export { firebaseClient };
