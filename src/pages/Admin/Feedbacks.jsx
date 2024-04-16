import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Loader from '../../components/Loader';
import Table from '../../components/Table';
import { useNavigate } from 'react-router';
import LeftArrow from '../../assets/leftArrow.svg';
import timeSince from '../../../utils/timeSince';


const Feedbacks = () => {
  const navigate = useNavigate();
  const columns = [
    {
      key: 'id',
      label: '#',
      component: 'TextColumn',
    },
    {
      label: 'Email',
      key: 'email',
      component: 'TextColumn',
    },
    {
      label: 'Message',
      key: 'message',
      component: 'TextColumn',
    },
    {
      label: 'Posted',
      key: 'posted',
      component : 'TextColumn'
    },
    {
      label: 'Action',
      key: 'edit',
      component: 'EditFeedbackColumn',
    }
  ];

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFeedbacks = async () => {
    const res = await axios.get('/api/v1/admin/feedbacks', {
      withCredentials: true,
    });
    setData(res.data);
  };

  useEffect(() => {
    (async () => {
    setIsLoading(true);
    await fetchFeedbacks();
    setIsLoading(false);
    })();
  }, []);

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
      <h3 className='mt-8 text-2xl font-bold'>All Feedbacks</h3>
      {data?.feedbacks.length === 0 && (
        <p className='text-center text-gray-500'>No Feedbacks Found</p>
      )}
      <Table
        rows={
          data?.feedbacks.map((feedback, index) => {
            return {
              id: index,
              posted: timeSince(new Date(feedback.createdAt))  + ' ago',
              edit : {
                createdAt : feedback.createdAt,
                handleClick : async () => {
                  await axios.delete(
                    '/api/v1/admin/feedback?id=' + feedback._id,
                    {
                      withCredentials: true,
                    }
                  );
                  fetchFeedbacks();
                },
              },
              ...feedback,
            };
          }) || []
        }
        columns={columns}
      />
    </div>
  );
};

export default Feedbacks;
