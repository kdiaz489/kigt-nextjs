import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export const app =
  !firebase.apps.length &&
  firebase.initializeApp(
    {
      apiKey: 'AIzaSyBMHmzKD1PEdbJVcRudGJtrFfxcfzo-FCg',
      authDomain: 'historical-database-36668.firebaseapp.com',
      databaseURL: 'https://historical-database-36668.firebaseio.com',
      projectId: 'historical-database-36668',
      storageBucket: 'historical-database-36668.appspot.com',
      messagingSenderId: '61744408080',
      appId: '1:61744408080:web:00ce3c64a3c31087500c95',
    },
    'HistoricalDatabase',
  );

// export const realTimeInterfaceApp =
//   !firebase.apps.length &&
//   firebase.initializeApp(
//     {
//       apiKey: 'AIzaSyDvHUOaaxeOwJDW3XS3yjqmjwDoXYCxKjQ',
//       authDomain: 'kigtinterface.firebaseapp.com',
//       databaseURL: 'https://kigtinterface.firebaseio.com',
//       projectId: 'kigtinterface',
//       storageBucket: 'kigtinterface.appspot.com',
//       messagingSenderId: '663507140562',
//       appId: '1:663507140562:web:d709b10d93ffddc263d20b',
//     },
//     'KigtInterface',
//   );
