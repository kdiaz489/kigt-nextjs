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
      console.log('Token Changed.');
      if (!user) {
        console.log('No token found.');
        setUser(null);
        nookies.destroy(null, 'token');
        nookies.set(null, 'token', '', {});
        return;
      }
      console.log('Updating Token');
      try {
        const token = await user.getIdToken();
        setUser(user);
        nookies.destroy(null, 'token');
        nookies.set(null, 'token', token, {});
      } catch (error) {
        console.log(error);
      }
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

export const useAuth = () => {
  return useContext(AuthContext);
};
