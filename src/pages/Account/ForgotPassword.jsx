import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Input from './components/Input';
import FormAction from './components/FormAction';
import { useNavigate } from 'react-router';

import axios from '../../api/axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    if (!username) return setError('Username is required');

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        '/auth/forgot-password?username=' + username,
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      toast.success(
        response?.data?.message || 'Recovery email sent successfully'
      );
      navigate('/');
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message || 'Something went wrong');
    }
    setIsLoading(false);
  };

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
      <p className='text-center text-red-600'>{error || ''}</p>
      <form className='mt-8 space-y-6'>
        <div className='-space-y-px flex flex-col gap-4'>
          <div className='mt-2 flex flex-col gap-1'>
            <label htmlFor='name' className='text-sm font-medium text-gray-700'>
              Username
            </label>
            <Input
              handleChange={setUsername}
              id='username'
              name='username'
              type='text'
              value={username || ''}
              labelText='Username'
              labelFor='username'
              isRequired={true}
              autoComplete='username'
              placeholder='Enter your username'
              customClass={'border border-gray-300'}
            />{' '}
          </div>
          <FormAction
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            text='Send Recovery Email'
          />
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
