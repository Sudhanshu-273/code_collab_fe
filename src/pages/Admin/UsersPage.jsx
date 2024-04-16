import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Loader from '../../components/Loader';
import Table from '../../components/Table';
import { useNavigate } from 'react-router';
import LeftArrow from '../../assets/leftArrow.svg';

const UsersPage = () => {
  const navigate = useNavigate();
  const columns = [
    {
      key: 'id',
      label: '#',
      component: 'TextColumn',
    },
    {
      label: 'Name',
      key: 'name',
      component: 'TextColumn',
    },
    {
      label: 'Email',
      key: 'email',
      component: 'TextColumn',
    },
    {
      label: 'Username',
      key: 'username',
      component: 'TextColumn',
    },
    {
      label: 'User Role',
      key: 'user_role',
      component: 'TextColumn',
    },
    {
      label: 'Is Account Verified',
      key: 'isAccountVerified',
      component: 'TextColumn',
    },
  ];

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await axios.get('/api/v1/admin/users', {
        withCredentials: true,
      });
      setData(res.data);
    })();
    setIsLoading(false);
  }, []);


const handleClearVisitors = async () => {
  try {
    await axios.post('/api/v1/admin/clear-visitors', {}, {
      withCredentials: true,
    });
    setData(prev => ({...prev, visitors: 0}));
  } catch (error) {
    console.error(error);
  }
}

  if (isLoading) return <Loader />;
  return (
    <div className='flex flex-col gap-2 p-6'>
      <button
        onClick={() => {
          navigate('/admin');
        }}
        className='flex items-center text-xs'
      >
        <img src={LeftArrow} className='mt-px' width='16px' alt='left arrow' />
        <span className=''>Go Back</span>
      </button>
      <div className='flex gap-2 items-center'>

      <p>Visitors : {data?.visitors}</p>
      <button onClick={handleClearVisitors} className='px-2 py-1 rounded border bg-gray-100 text-xs w-min whitespace-nowrap'>Clear all visitor count</button>
      </div>
      <h3 className='mt-8 text-2xl font-bold'>All Users</h3>
      {data?.users.length === 0 && (
        <p className='text-center text-gray-500'>No Users Found</p>
      )}
      <Table
        rows={
          data?.users.map((user, index) => {
            return {
              id: index + 1,
              name: user.name,
              email: user.email,
              username: user.username,
              user_role: Object.keys(user.roles).join(', '),
              isAccountVerified: user.isAccountVerified ? 'Yes' : 'No',
            };
          }) || []
        }
        columns={columns}
      />
    </div>
  );
};

export default UsersPage;
