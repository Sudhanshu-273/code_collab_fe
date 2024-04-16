import Loader from '../../components/Loader';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import ProblemSection from './ProblemSection';
import SnippetSection from './SnippetSection';
import CopyIcon from './CopyIcon';
export default function MyProfile() {
  const params = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [userProblemsSolved, setUserProblemsSolved] = React.useState([]);
  useEffect(() => {
    if (auth?.isLoading) {
      return;
    }

    const temp = async () => {
      if (!params?.username && !(auth && !auth.isLoading && auth?.username)) {
        navigate('/auth/login', { replace: true });
        toast.error('Please login to view this page');
        return;
      }
      const response = await axios.get(
        '/api/v1/user/' + (params.username || auth.username),
        {
          withCredentials: true,
        }
      );
      setUserProblemsSolved(response?.data?.problemsSolved);
      setUser({
        username: response?.data?.username,
        name: response?.data?.name,
        picture: response?.data?.picture,
      });

      setIsLoading(false);
    };
    temp();
  }, [auth]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>{params?.username || auth?.username || ''}</title>
      </Helmet>
      <main className='px-8 md:px-12 py-14'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <img
            referrerPolicy='no-referrer'
            src={user.picture}
            className='flex items-center justify-center overflow-hidden font-bold text-white bg-gray-800 rounded-full text-9xl w-36 h-36'
          />
          <span className='text-3xl font-semibold'>{user?.username}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                window.location.origin + '/user/' + user.username
              );
              toast.success('Copied to clipboard');
            }}
            className='text-sm flex gap-1 items-center bg-gray-50 border border-gray-200 rounded py-1 px-2 shadow hover:shadow-lg transition-shadow duration-200 ease-in-out'
          >
            <span className='opacity-60'>Share Profile</span>
            <CopyIcon />
          </button>
        </div>
        <br />
        <br />
        <ProblemSection user={user} userProblemsSolved={userProblemsSolved} />

        <SnippetSection user={user} />
      </main>
    </>
  );
}


