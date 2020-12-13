import { firebaseAdmin } from '../firebaseAdmin';

export const getChargers = () => {
  return new Promise((resolve, reject) => {
    let data = [];
    firebaseAdmin.database
      .ref()
      .once('value')
      .then((rootSnapShot) => {
        let rootVals = rootSnapShot.val();
        for (let key in rootVals) {
          let station = rootVals[key];
          data.push(station);
        }
        resolve({ data });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
