import Loader from '../../components/Loader';
import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useSearchParams from '../../hooks/useSearchParams';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Input from './components/Input';
import FormAction from './components/FormAction';
const Recover = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const searchParams = useSearchParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (
      !newPassword.length ||
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(newPassword)
    ) {
      setError(null);
      setIsLoading(true);
      try {
        const response = await axios.put(
          `/auth/recover?token=${searchParams.token}`,
          {
            newPassword,
            confirmPassword,
          },
          {
            withCredentials: true,
          }
        );
        toast.success('Password Updated Successfully', {
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
        // console.error(err);
        setError(err?.response?.data?.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError(
        'Password must be 6-16 characters long and must contain at least one number and one special character'
      );
    }
  };

  const [error, setError] = React.useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
          '/auth/recover?token=' + searchParams?.token,
          { withCredentials: true }
        );
        //  check if token valid else dont show page
        //   toast.success('Email Verification Success', {
        //     position: 'bottom-right',
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //   });
        //   navigate('/auth/login', {
        //     replace: true,
        //   });
      } catch (err) {
          toast.error('Invalid Token or Token Expired', {
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
  return (
    <>
      <Helmet>
        <title>Recover your Account </title>
      </Helmet>
      <Header
        heading='Recover your Account '
        paragraph='Want to create new account ?'
        linkName='Signup'
        linkUrl='../signup'
      />
      <form className='mt-8 space-y-6'>
        <div className='-space-y-px flex flex-col gap-4 text-xs md:text-sm'>
          <div className='text-red-500 text-xs md:text-sm '>{error}</div>

          <div className='mt-2 flex flex-col gap-1'>
            <label
              htmlFor='newPassword'
              className='text-sm font-medium text-gray-700'
            >
              New Password
            </label>
            <Input
              handleChange={setNewPassword}
              id='newPassword'
              name='newPassword'
              type='password'
              value={newPassword || ''}
              labelText='newPassword'
              labelFor='newPassword'
              isRequired={true}
              autoComplete='newPassword'
              placeholder='Enter your New Password'
              customClass={'border border-gray-300'}
            />{' '}
          </div>

          <div className='mt-2 flex flex-col gap-1'>
            <label
              htmlFor='confirmPassword'
              className='text-sm font-medium text-gray-700'
            >
              Confirm new Password
            </label>
            <Input
              handleChange={setConfirmPassword}
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              value={confirmPassword || ''}
              labelText='confirmPassword'
              labelFor='confirmPassword'
              isRequired={true}
              autoComplete='confirmPassword'
              placeholder='Re enter your New Password'
              customClass={'border border-gray-300'}
            />{' '}
          </div>
          <FormAction
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            text='Set New Password'
          />
        </div>
      </form>
    </>
  );
};

export default Recover;
