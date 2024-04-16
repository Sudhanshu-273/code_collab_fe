import ParticipateBtn from '../pages/ContestWatcher/components/ParticipateBtn';
import React from 'react';
import { Helmet } from 'react-helmet';

const OfflineLayout = ({ children }) => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);

  if (!isOnline)
    return (
      <>
        <Helmet>
          Your internet connection is offline. Please check your connection.
        </Helmet>

        <div className='flex items-center justify-center h-screen px-4 py-8 sm:px-6 lg:px-8'>
          <div className='w-full max-w-xl text-center'>
            <h2 className='mt-10 text-xl md:text-3xl whitespace-nowrap'>
              Oops!
            </h2>
            <p className='text-xs md:text-sm opacity-60'>
              Your internet connection is offline. Please check your connection.
            </p>
            <div className='flex justify-center mt-4'>
              <ParticipateBtn link={'/'} text='Go to Home' />
            </div>
          </div>
        </div>
      </>
    );
  return <>{children}</>;
};

export default OfflineLayout;
