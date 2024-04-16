import React, { useContext, useEffect } from 'react';
import FormAction from './components/FormAction';
import Header from './components/Header';
import Input from './components/Input';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthProvider';

import axios from '../../api/axios';
import { REGISTER_URL } from '../../constants';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { LOGIN_URL } from '../../constants';
import useSearchParams from '../../hooks/useSearchParams';

export default function SignupPage() {
  const navigate = useNavigate();
  const searchParams = useSearchParams();

  const { setAuth } = useContext(AuthContext);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [isPasswordMatchError, setIsPasswordMatchError] = React.useState(false);
  const [passwordNotStrongEnough, setPasswordNotStrongEnough] =
    React.useState(false);

  useEffect(() => {
    if (password.length && confirmPassword !== password) {
      setIsPasswordMatchError(true);
    } else {
      setIsPasswordMatchError(false);
    }
  }, [confirmPassword]);
  useEffect(() => {
    if (password.length == 0) {
      setPasswordNotStrongEnough(false);
      setIsPasswordMatchError(false);
      setError(null);
      return;
    }
    if (
      !password.length ||
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    ) {
      setPasswordNotStrongEnough(false);
      setError(null);
      return;
    }
    setPasswordNotStrongEnough(true);
    setError(
      'Password must be at least 6 characters long and contain at least one number and one special character'
    );
  }, [password]);

  const CreateUser = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!name) {
      setError('Name is required');
      return;
    }
    if (isPasswordMatchError) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      const SignupState = {
        username,
        password,
        name,
        email,
      };

      const response = await axios.post(
        `/${REGISTER_URL}`,
        JSON.stringify(SignupState),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      navigate('../login', { replace: true });
      toast.success(
        'Account Created Successfully! Please verify your account throught link in mail.',
        {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      if (!error.response) {
        setError('Server error', error);
      } else if (error?.response?.status === 400) {
        setError('Missing username or password');
      } else if (error?.response?.status === 409) {
        setError(error?.response?.data?.message);
        // setError('Username already exists');
      } else {
        setError('Server error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async (response) => {
    // console.log(response);
    if (response.error) {
      setError('Google Login Failed');
      toast.error('Google Login Failed', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    var decoded = jwt_decode(response.credential);
    try {
      const LoginState = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      };
      const response = await axios.post(
        `/${LOGIN_URL}/o-auth`,
        JSON.stringify(LoginState),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      setAuth({
        username: decoded.email.split('@')[0],
        email: decoded.email,
        password,
        accessToken: response?.data?.accessToken,
        roles: response?.data.roles,
        ...response?.data,
      });
      navigate(searchParams.next || '/problem', { replace: true });
      // console.log({response});
    } catch (error) {
      console.log(error);
    }
    // navigate(searchParams.next || '/problem', { replace: true });
    toast.success('Logged in Successfully!', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <Helmet>
        <title>Singup</title>
      </Helmet>
      <Header
        heading='Signup to create an account'
        paragraph='Already have an account? '
        linkName='Login'
        linkUrl='../login'
      />
      <p className='text-center text-red-600'>{error || ''}</p>
      <form className='mt-8 space-y-6'>
        <div className='-space-y-px flex flex-col gap-4'>
          <Input
            handleChange={setName}
            id='name'
            name='mame'
            type='text'
            value={name}
            labelText='Name'
            labelFor='name'
            isRequired={true}
            autoComplete='false'
            placeholder='Enter your full name'
          />

          <Input
            handleChange={setUsername}
            id='username'
            name='usermame'
            type='text'
            value={username}
            labelText='Username'
            labelFor='username'
            isRequired={true}
            autoComplete='false'
            placeholder='Enter your username'
          />
          <Input
            handleChange={setEmail}
            id='email'
            name='email'
            type='email'
            value={email}
            labelText='Email'
            labelFor='email'
            isRequired={true}
            autoComplete='false'
            placeholder='Enter your email'
          />
          <Input
            handleChange={setPassword}
            id='password'
            name='password'
            type='password'
            value={password}
            labelText='Password'
            labelFor='password'
            autoComplete='password'
            isRequired={true}
            placeholder='Enter your password'
            customClass={
              passwordNotStrongEnough
                ? 'border border-red-700 focus:border-red-500'
                : 'border border-gray-300'
            }
            isError={passwordNotStrongEnough}
            errorMessage={'Password Validation Error'}
          />
          <Input
            handleChange={setConfirmPassword}
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            labelText='Confirm Password'
            labelFor='confirmPassword'
            autoComplete={'false'}
            isRequired={true}
            placeholder='Renter your password to confirm'
            customClass={
              isPasswordMatchError
                ? 'border border-red-700 focus:border-red-500'
                : 'border border-gray-300'
            }
            isError={isPasswordMatchError}
            errorMessage='Passwords do not match'
          />
        <FormAction
          handleSubmit={CreateUser}
          isLoading={isLoading}
          text='Create Account'
          />
          </div>
      </form>
      <div className='flex flex-col items-center gap-4'>
        <span>or</span>
        <GoogleLogin
          onSuccess={handleGoogleAuth}
          // (credentialResponse) => {
          // console.log(credentialResponse);
          // }
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
          // auto_select
        />
      </div>
    </>
  );
}
