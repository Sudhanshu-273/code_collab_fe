import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminPage = () => {
  const Panels = [
    {
      name: 'Problems',
      path: '/admin/problems',
    },
    {
      name: 'All Users + Visitors',
      path: '/admin/users',
    },
    {
      name: 'Feedbacks',
      path: '/admin/feedbacks',
    }
  ];


  return (
    <div className='flex flex-wrap justify-center md:justify-start min-h-screen gap-4 p-6 bg-gray-100'>
      {Panels.map((panel, index) => (
        <NavLink
          to={panel.path}
          key={index}
          className='flex flex-col items-center justify-center w-64 h-64 bg-white rounded-lg shadow-lg'
        >
          <h1 className='text-md md:text-2xl font-bold text-gray-800'>{panel.name}</h1>
        </NavLink>
      ))}
    </div>
  );
};

export default AdminPage;
