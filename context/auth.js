import { createContext, useContext, useState, useEffect } from 'react';
import nookies from 'nookies';
import { firebaseClient } from '../firebaseClient';
const AuthContext = createContext({ user: null });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (typeof window !== undefined) {
      window.nookies = nookies;
    }
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        console.log('No token found.');
        setUser(null);
        nookies.destroy(null, 'token');
        // nookies.set(null, 'token', '', {});

        return;
      }
      console.log('Updating Token');
      const token = await user.getIdToken();
      let formattedUser = formatUser(user);
      setUser(formattedUser);
      nookies.destroy(null, 'token');
      nookies.set(null, 'token', token, {});
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      console.log('Refreshing token');
      const user = firebaseClient.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
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
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
