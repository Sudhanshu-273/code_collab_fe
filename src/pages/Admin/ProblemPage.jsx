import Loader from '../../components/Loader';
import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LeftArrow from '../../assets/leftArrow.svg';
import Table from '../../components/Table';
import CreateProblemModal from './ProblemModal/CreateProblem';

const ProblemPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ModalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    (async () => {
      const res = await axios.get('/api/v1/admin/problems', {
        withCredentials: true,
      });
      setData(res.data);
    })();
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      key: 'id',
      label: '#',
      component: 'TextColumn',
    },
    {
      label: 'Title',
      key: 'title',
      component: 'TextColumn',
    },
    {
      label: 'Difficulty',
      key: 'difficulty',
      component: 'TextColumn',
    },
    {
      label: 'Tags',
      key: 'tags',
      component: 'TextColumn',
    },
    {
      label: 'Is Published',
      key: 'isPublished',
      component: 'TextColumn',
    },
    {
      label: 'Edit',
      key: 'edit',
      component: 'EditProblemColumn',
    },
  ];

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

      <div className='flex items-center justify-between gap-2 mt-8'>
        <h3 className='text-2xl font-bold'>All Problems</h3>
        <button
          onClick={() => {
            setModalOpen(true);
          }}
          className='relative flex justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
        >
          Add Problem
        </button>
      </div>

      {data?.problems?.length === 0 && (
        <p className='mt-6 text-center text-gray-500'>No Problems Found</p>
      )}
      <Table rows={data?.problems?.map((problem,index) => {
        problem.id = index;
        problem.isPublished = problem.isPublished ? 'Yes' : 'No';
        problem.edit = {
          problemData :problem,
          handleClick : fetchData
        }
        return problem}) || []} columns={columns} />
      <CreateProblemModal
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        handleClick={fetchData}
      />
    </div>
  );
};

export default ProblemPage;
