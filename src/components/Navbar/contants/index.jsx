import React from 'react';
import UserPopup from '../components/UserPopup';
import UserSVG from '../components/UserSVG';


const DefaultRoutes = [
  {
    navDisplay: 'IDE',
    path: '/ide',
    customClass: 'link-hover',
  },
  {
    navDisplay: 'Contest Watcher',
    path: '/contest-watcher',
    customClass: 'link-hover',
  },
  {
    navDisplay: 'Code Room',
    path: '/code-room',
    customClass: 'link-hover',
  },
  {
    navDisplay: (
      <div className='relative flex items-center justify-center w-8 h-8 shadow rounded-full'>
        <UserSVG />
      </div>
    ),
    path: '/auth',
    customClass: 'hidden md:block',
    customMobileClass: 'hidden md:block',
  },
];

const UserRoutes = [
  {
    navDisplay: 'Problems',
    path: '/problem',
    customClass: 'link-hover',
  },
  {
    navDisplay: 'All Snippets',
    path: '/snippets',
    customClass: 'link-hover',
  },
  {
    navDisplay: 'IDE',
    path: '/ide',
    customClass: 'link-hover',
  },
  {
    navDisplay: 'Contest Watcher',
    path: '/contest-watcher',
    customClass: 'link-hover',
  },
  {
    navDisplay: 'Code Room',
    path: '/code-room',
    customClass: 'link-hover',
  },
  {
    navDisplay: <UserPopup />,
    handleClick: () => {},
  },
];

const AdminRoutes = [
  {
    navDisplay: 'Admin Panel',
    path: '/admin',
    customClass: 'link-hover',
  },
  {
    navDisplay: 'IDE',
    path: '/ide',
    customClass: 'link-hover',
  },
  {
    navDisplay: 'Contest Watcher',
    path: '/contest-watcher',
    customClass: 'link-hover',
  },
  {
    navDisplay: <UserPopup />,
    handleClick: () => {},
  },
];

export default { DefaultRoutes, UserRoutes, AdminRoutes };