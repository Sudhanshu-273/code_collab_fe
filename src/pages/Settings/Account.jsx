import React, { useContext, useState } from 'react';
import Input from '../Account/components/Input';
import FormAction from '../Account/components/FormAction';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
const Account = () => {
  const { auth } = useContext(AuthContext);
  const [name, setName] = useState(auth.name);
  const [username, setUsername] = useState(auth.username);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        `/api/v1/settings/account`,
        {
          name,
          username,
        },
        {
          withCredentials: true,
        }
      );
      alert(
        "Account updated successfully ! You're about to logout, login again to view changes "
      );
      navigate('/logout');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Account - Settings</title>
      </Helmet>
      <div className='pt-10 pb-20'>
        <h2 className='text-xl md:text-2xl font-semibold text-gray-700'>
          {' '}
          Account{' '}
        </h2>

        <div className='mt-2 flex flex-col gap-4 text-xs md:text-sm'>
          <div className='text-red-500 text-xs md:text-sm '>{error}</div>
          <div className='mt-2 flex flex-col gap-1'>
            <label htmlFor='name' className='text-sm font-medium text-gray-700'>
              Name
            </label>
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
          </div>
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
          <div className='flex gap-4 w-76 md:w-96'>
            <FormAction
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              text='Save Changes'
            />
            <button
              className='relative flex justify-center w-full px-4 py-2 mt-10 text-sm font-medium text-white bg-red-400 border border-transparent rounded-md group hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400'
              onClick={(e) => {
                e.preventDefault();
                setName(auth.name);
                setUsername(auth.username);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
