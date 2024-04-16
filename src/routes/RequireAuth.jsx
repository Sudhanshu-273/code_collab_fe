import React, { useContext, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import AuthContext from '../context/AuthProvider';
import PendingAccountVerification from '../pages/Unathorized/PendingAccountVerification';
// allowedRoles -- array like [2001, 1984 , 5150]
// {
//   "Admin": 5150,
//   "Editor": 1984,
//   "User": 2001
// }

export default function RequireAuth({ allowedRoles }) {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  if (auth?.isLoading) return <Loader width='20' height='20' />;
  if (auth?.username && !auth?.isAccountVerified) {
    return <PendingAccountVerification />;
  }

  if (
    auth?.username &&
    auth?.roles?.find((role) => allowedRoles?.includes(role))
  ) {
    return <Outlet {...location} />;
  }
  // all roles failed
  if (auth?.username) {
    toast.error('You are not authorized to access this page!', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return <Navigate to='/unauthorized' state={{ from: location }} />;
  }
  document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie =
    'jwt_access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  return (
    <Navigate
      to={`/auth/login?next=${location.pathname}`}
      state={{ from: location }}
    />
  );
}
