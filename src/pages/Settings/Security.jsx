import React, { useContext, useState } from 'react';
import Input from '../Account/components/Input';
import FormAction from '../Account/components/FormAction';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
const Security = () => {
  const { auth } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
    if (newPassword === currentPassword) {
      setError('New password cannot be same as current password');
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
          `/api/v1/settings/security`,
          {
            currentPassword,
            newPassword,
            confirmPassword,
          },
          {
            withCredentials: true,
          }
        );
        alert(
          "Security updated successfully ! You're about to logout, login again to view changes "
        );
        navigate('/logout');
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError(
        'Password must be at least 6 characters long and contain at least one number and one special character'
      );
    }
  };
  return (<>
   <Helmet>
        <title>Security - Settings</title>
      </Helmet>
 
    <div className='py-9'>
      <h2 className='text-xl font-semibold text-gray-700 md:text-2xl'> Security </h2>

      <div className='flex flex-col gap-4 mt-2 text-xs md:text-sm'>
        <div className='text-xs text-red-500 md:text-sm '>{error}</div>
        <div className='flex flex-col gap-1 mt-2'>
          <label
            htmlFor='currentPassword'
            className='text-sm font-medium text-gray-700'
          >
            Current Password <span className='opacity-60'>(For google logged in users, leave this field empty)</span>
          </label>
          <Input
            handleChange={setCurrentPassword}
            id='currentPassword'
            name='currentPassword'
            type='password'
            value={currentPassword}
            labelText='currentPassword'
            labelFor='currentPassword'
            // isRequired={true}
            autoComplete='false'
            placeholder='Enter your Current Password'
          />
        </div>
        <div className='flex flex-col gap-1 mt-2'>
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

        <div className='flex flex-col gap-1 mt-2'>
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
        <div className='flex w-48 gap-4'>
          <FormAction
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            text='Save Changes'
          />
        </div>
      </div>
    </div>
</>  );
};

export default Security;
