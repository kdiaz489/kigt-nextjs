import * as firebaseAdmin from 'firebase-admin';
const { privateKey } = JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY);
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: privateKey,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    }),
    databaseURL: 'https://kigtinterface.firebaseio.com',
  });
}

export { firebaseAdmin };
