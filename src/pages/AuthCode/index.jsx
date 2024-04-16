import Loader from '../../components/Loader';
import axios from '../../api/axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useSearchParams from '../../hooks/useSearchParams';
import { toast } from 'react-toastify';
const AuthCode = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (!searchParams.token) {
        navigate('/', {
          replace: true,
        });
        return;
      }

      try {
        const response = await axios.get(
          '/auth/authCode?token=' + searchParams?.token,
          { withCredentials: true }
        );
        toast.success('Email Verification Success', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/auth/login', {
          replace: true,
        });
      } catch (err) {
        toast.error('Email Verification Failed or Already Verified', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/', {
          replace: true,
        });
      }
    })();
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loader />;
  return <></>;
};

export default AuthCode;
