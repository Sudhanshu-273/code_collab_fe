import AuthContext from '../../context/AuthProvider';
import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import useSearchParams from '../../hooks/useSearchParams';
import ForgotPassword from './ForgotPassword';
import Success from './Success';
import Recover from './Recover';

export default function Account() {
  const searchParams = useSearchParams();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.username) {
      navigate(searchParams?.next || '/user', { replace: true });
    }
  }, [auth]);

  return (
    <div className='flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8 '>
        <Routes>
          <Route path='/' element={<Navigate to={'./login'} replace />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/success' element={<Success />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/recover' element={<Recover />} />
        </Routes>
      </div>
    </div>
  );
}
