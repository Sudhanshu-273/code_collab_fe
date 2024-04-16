import React from 'react';
import Loader from '../../components/Loader';
import { useNavigate, useParams } from 'react-router';
import axios from '../../api/axios';
import externalLink from '../../assets/external-link.svg';
import { GET_PROBLEM_SET } from '../../constants';
import { useEffect } from 'react';
import CopyIcon from '../../components/CopyIcon';

const ProblemSection = ({ user, userProblemsSolved }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const params = useParams();
  return (
    <>
      <h1 className='text-xl md:text-3xl font-bold'>Problems Solved</h1>
      <p className='text-sm opacity-60'>
        {params?.username
          ? 'In this page user would be able to view all problems solved by other user.'
          : 'In this page user would be able to view their all solved problems.'}
        <br />
        <b>Pro Tip</b> :{' '}
        <i>
          You can navigate to <span className='font-bold'> Problem </span> by
          clicking on it.
        </i>
      </p>
      <br />
      <hr />
      <br />
      {userProblemsSolved?.length > 0 ? (
        <div className='flex justify-center my-8'>
          <input
            type='text'
            className='relative block w-full px-3 py-2 text-xs text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder='Search Problem'
          />
        </div>
      ) : null}

      {userProblemsSolved?.filter((problem) =>
        problem.problemSlug.includes(
          searchTerm.replace(/ /g, '-').toLowerCase()
        )
      )?.length === 0 && (
        <div className='text-sm md:text-xl text-center'>
          No Problems Solved. Try Solving One ?
        </div>
      )}
      <div className='flex flex-wrap justify-around gap-4'>
        {userProblemsSolved?.filter((problem) =>
          problem.problemSlug.includes(
            searchTerm.replace(/ /g, '-').toLowerCase()
          )
        )?.length
          ? userProblemsSolved
              ?.filter((problem) =>
                problem.problemSlug.includes(
                  searchTerm.replace(/ /g, '-').toLowerCase()
                )
              )
              ?.map((problem, index) => (
                <ProblemCard
                  key={index}
                  problemSlug={problem.problemSlug}
                  solvedDate={problem.solvedDate}
                />
              ))
          : null}
      </div>
    </>
  );
};

const ProblemCard = ({ problemSlug, solvedDate }) => {
  const navigate = useNavigate();
  const [problem, setProblem] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const params = useParams();
  useEffect(() => {
    const temp = async () => {
      const response = await axios.get(GET_PROBLEM_SET + '/' + problemSlug, {
        withCredentials: true,
      });
      setProblem(response?.data?.problem);
      setIsLoading(false);
    };
    temp();
  }, [problemSlug]);
  if (isLoading) return <Loader />;
  return (
    <div className='flex flex-col gap-2 px-6 py-4 overflow-x-hidden text-sm border rounded w-96'>
      <div className='flex items-end justify-between w-full gap-2'>
        <div className='flex flex-col w-full'>
          <button
            onClick={() => {
              navigate(`/problem/${problemSlug}`);
            }}
            title={problem?.title}
            className='text-lg font-semibold text-left whitespace-nowrap'
          >
            {problem?.title?.length > 0
              ? problem?.title.length > 33
                ? problem?.title.substring(0, 30) + '...'
                : problem?.title || '-'
              : '-'}
          </button>
          <div className='flex justify-between gap-2'>
            <span
              title={problem?.difficulty}
              // onClick={() => {
              //   navigate({
              //     pathname : './',
              //     search : createSearchParams({
              //       snippetLanguage : snippetLanguage,
              //     }).toString()
              //   })
              // }}
              className='whitespace-nowrap opacity-60 text-xs'
            >
              {problem?.difficulty || ' '}
            </span>
            <div className='text-xs'>
              <span className='opacity-60 whitespace-nowrap'>Solved on : </span>{' '}
              {new Date(solvedDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className='flex items-center justify-between gap-2'>
        <div className='flex gap-1 opacity-60'>
          {problem?.tags[0].split(',')?.map((tag, index) => (
            <ProblemTag key={index} tag={tag} />
          ))}
        </div>

        <div className='flex gap-2'>
          <div className='-mr-2'>
            <CopyIcon text={`/problem/${problemSlug}`} iconColor={'#666666'} />
          </div>

          <img
            src={externalLink}
            alt={'external link'}
            title={'Open Problem'}
            className='cursor-pointer'
            onClick={() => {
              navigate(`/problem/${problemSlug}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ProblemTag = ({ tag }) => {
  return <div className='px-2 py-1 bg-gray-200 rounded text-xs'>{tag}</div>;
};

export default ProblemSection;