import AuthContext from '../../../context/AuthProvider';
import React, { useContext } from 'react';
import UserSVG from './UserSVG';
import { NavLink } from 'react-router-dom';
const UserPopup = () => {
  const { auth } = useContext(AuthContext);
  const [ModalOpen, setModalOpen] = React.useState(false);

  const UserOptions = [
    {
      navDisplay: (
        <div className='flex gap-2 items-center'>
          <img
            referrerPolicy='no-referrer'
            src={auth?.picture}
            alt='user'
            className='w-4 h-4 rounded-full'
          />
          <p>{auth?.name}</p>
        </div>
      ),
      path: '/user',
    },
    {
      navDisplay: 'Settings',
      path: '/settings',
    },
    {
      navDisplay: 'Logout',
      path: '/logout',
    },
  ];
  return (
    <div className='relative flex items-center justify-center w-8 h-8 shadow rounded-full'>
      <div
      role={'button'}
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <UserSVG />
      </div>
      {ModalOpen && (
        <>
          <div
            onClick={() => {
              setModalOpen(false);
            }}
            className='fixed top-0 left-0 w-full h-screen  overflow-none cursor-default'
          ></div>
          <div className='absolute top-8 -left-36 md:-left-20 bg-white border shadow rounded py-2 '>
            <ul className='flex flex-col text-sm text-dark'>
              {UserOptions?.map((option, index) => (
                <NavLink
                  onClick={() => {
                    setModalOpen(false);
                  }}
                  key={index}
                  className={
                    'hover:bg-gray-100 px-8 py-2 cursor-pointer whitespace-nowrap text-xs sm:text-sm transition-colors duration-200 ease-in-out'
                  }
                  to={option?.path}
                >
                  {option?.navDisplay}
                </NavLink>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPopup;
