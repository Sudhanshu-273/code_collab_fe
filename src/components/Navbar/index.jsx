import React, { useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import codeBuddyBanner from '../../assets/codeBuddyBanner.svg';
import AuthContext from '../../context/AuthProvider';
import { ROLES } from '../../constants';
import Loader from '../Loader';
import ROUTE_CONSTANTS from './contants';
import UserPopup from './components/UserPopup';
import UserSVG from './components/UserSVG';
import { codeCollabImage } from '../../constants';
export default function Navbar() {
  const { auth } = useContext(AuthContext);

  const [Routes, setRoutes] = React.useState(ROUTE_CONSTANTS.DefaultRoutes);
  const [menuModalOpen, setMenuModalOpen] = React.useState(false);
  useEffect(() => {
    // console.log(auth?.roles);
    if (auth?.roles?.find((role) => [ROLES.Admin]?.includes(role))) {
      // console.log('Admin');
      setRoutes(ROUTE_CONSTANTS.AdminRoutes);
      return;
    } else if (auth?.roles?.find((role) => [ROLES.User]?.includes(role))) {
      // console.log('User');
      setRoutes(ROUTE_CONSTANTS.UserRoutes);
      return;
    } else {
      setRoutes(ROUTE_CONSTANTS.DefaultRoutes);
      // console.log('Visitor');
    }
  }, [auth]);

  if (auth?.isLoading) return <Loader fullScreen width={20} height={20} />;
  return (
    <nav className='sticky top-0 z-20 flex items-center justify-between py-3 bg-white shadow-sm md:px-28'>
      <NavLink to='/'>
        <button className='flex items-center gap-2 -ml-5 sm:ml-0'>
          {/* <img alt=' Code Collab' /> */}
          <strong>
            <h2>Code Collab &lt;/&gt; </h2>
          </strong>
          {/* todo */}
          {/* yaha src me logo aayega */}
          {/* <img className='cursor-pointer' style={{height: "80px", width: "80px"}} width='40px' src="./../../../public/assets/images/codeCollabLogo_No_Bg.png" alt='Logo' /> */}
        </button>
      </NavLink>
      <div className='hidden lg:block'>
        <ul className='flex items-center gap-4 mr-2 -ml-8 text-sm md:gap-8 text-dark md:mr-2 md:ml-0'>
          {Routes.map((route, index) => (
            <li key={index} className={`${route.customClass}`}>
              {route.path ? (
                <NavLink
                  className={
                    'cursor-pointer whitespace-nowrap text-xs sm:text-sm '
                  }
                  to={route.path}
                >
                  {route.navDisplay}
                </NavLink>
              ) : (
                <button
                  className={'whitespace-nowrap text-xs sm:text-sm '}
                  onClick={route.handleClick}
                >
                  {route.navDisplay}{' '}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className='lg:hidden pr-4 flex gap-4 items-center'>
        <button onClick={() => setMenuModalOpen(true)}>
          <img src={'/assets/images/menu.svg'} alt='menu' />
        </button>
        {auth?.roles?.find((role) => [ROLES.Admin]?.includes(role)) ||
        auth?.roles?.find((role) => [ROLES.User]?.includes(role)) ? (
          <button className={'whitespace-nowrap text-xs sm:text-sm '}>
            <UserPopup />
          </button>
        ) : (
          <NavLink
            className={'cursor-pointer whitespace-nowrap text-xs sm:text-sm '}
            to={'/auth'}
          >
            <div className='relative flex items-center justify-center w-8 h-8 shadow rounded-full'>
              <UserSVG />
            </div>
          </NavLink>
        )}
      </div>

      {menuModalOpen ? (
        <>
          <div
            onClick={() => setMenuModalOpen(false)}
            className='fixed top-0 left-0 w-full h-full bg-black/20 bg-opacity-50 z-10'
          ></div>
          <div className='fixed top-0 right-0 px-20  p-4 h-full bg-white z-[100] shadow '>
            <ul className='flex justify-center flex-col gap-4 h-full'>
              {Routes.map((route, index) => {
                if (route.path)
                  return (
                    <li key={index} className={`${route.customMobileClass}`}>
                      <NavLink
                        className={`cursor-pointer whitespace-nowrap text-sm link-hover-remove `}
                        to={route.path}
                        onClick={() => setMenuModalOpen(false)}
                      >
                        {route.navDisplay}
                      </NavLink>
                    </li>
                  );
              })}
            </ul>
          </div>
        </>
      ) : null}
    </nav>
  );
}
