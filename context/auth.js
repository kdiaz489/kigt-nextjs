import { createContext, useContext, useState, useEffect } from 'react';
import nookies from 'nookies';
import { firebaseClient } from '../firebaseClient';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const AuthContext = createContext({ user: null });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleUser = async (rawUser) => {
    if (rawUser) {
      // take user data and format it

      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      // createUser(user.uid, userWithoutToken);
      // set formatted user data to state
      setUser(user);
      Cookies.set('auth', true, { expires: 1 });
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const register = async (name, email, password) => {
    let res = await firebaseClient
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return handleUser(res);
  };

  const login = async (email, password) => {
    let res = await firebaseClient
      .auth()
      .signInWithEmailAndPassword(email, password);
    router.push('/dashboard');
    return handleUser(res.user);
  };

  const signout = async () => {
    router.push('/');
    let res = await firebaseClient.auth().signOut();
    // setUser(false);
    Cookies.remove('auth');
    return res;
  };

  useEffect(() => {
    // if (typeof window !== undefined) {
    //   window.nookies = nookies;
    // }
    return firebaseClient.auth().onIdTokenChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        console.log('No token found.');
        // setUser(null);
        // nookies.destroy(null, 'token');
        Cookies.remove('auth');
        handleUser(false);
        // nookies.set(null, 'token', '', {});

        return;
      }
      console.log('Updating Token');

      // const token = await user.getIdToken();
      let ref = firebaseClient
        .firestore()
        .collection('users')
        .doc(firebaseUser.uid);
      let doc = await ref.get();

      let formattedUser = formatUser({
        ...firebaseUser,
        apiKey: doc.data().apiKey,
      });
      console.log(formattedUser);
      setUser(formattedUser);
      // nookies.destroy(null, 'token');
      // nookies.set(null, 'token', token, {});
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      console.log('Refreshing token');
      const firebaseUser = firebaseClient.auth().currentUser;
      if (firebaseUser) await firebaseUser.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);
  return (
    <AuthContext.Provider value={{ user, register, login, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Pulls out necessary info from user and formats
const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    token: user.ya,
    displayName: user.displayName,
    photoUrl: user.photoURL,
    apiKey: user.apiKey,
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
