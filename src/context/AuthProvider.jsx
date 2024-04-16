import Loader from '../components/Loader';
import React, { createContext, useEffect, useState } from 'react';
import axios from '../api/axios';

const AuthContext = createContext(false);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState({
    isLoading : true,
  });

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await axios.get('/user', { withCredentials: true });
        // console.log(response?.data);
        setAuth({...response?.data , isLoading : false});
      } catch (error) {
        setAuth(null);
      }
    })();
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
