import React, { useEffect } from 'react';
import Card from './components/Card';
import { ALL_CONTEST_URL } from '../../constants';
import axios from '../../api/axios';
import Loader from '../../components/Loader';
import { Helmet } from 'react-helmet';

export default function AllContests() {
  const [AllContests, setAllContests] = React.useState([]);
  const [Contests, setContests] = React.useState([]);
  const [AllContestsToggle, setAllContestsToggle] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      const res = await axios.get(ALL_CONTEST_URL);
      const arr= res.data;
      arr.reverse();
      setAllContests(arr);
      console.log(arr);
    };
    fetchContests();
  }, []);

  useEffect(() => {
    setContests(AllContests.filter((contest) => contest.in_24_hours === true));
    setIsLoading(false);
  }, [AllContests]);

  useEffect(() => {
    setIsLoading(true);
    if (AllContestsToggle) {
      setContests(AllContests);
    } else {
      setContests(Contests.filter((contest) => contest.in_24_hours === true));
    }
    setIsLoading(false);
  }, [AllContestsToggle]);

  return (
    <>
            <Helmet>
      <title>Contest Watcher </title>
      </Helmet>
      <main className='px-8 md:px-12 py-14'>
        <h1 className='text-xl md:text-3xl font-bold'>Contest Watcher</h1>
        <p className='text-xs md:text-sm opacity-60'>
          This is a simple tool to help you keep track of upcoming contests so
          that you never miss any of them.
          <br />
          <b>Pro Tip</b> :{' '}
          <i>
            Contest currently running will be displayed with
            <span className='text-purple-600'> purple</span> color.
          </i>
        </p>
        <br />
        <hr />
        <br />

        <div className='text-sm flex justify-center w-full gap-4 md:gap-2 my-8'>
          <label>
            {' '}
            <input type='checkbox' disabled checked /> Starts in 24 hours{' '}
          </label>
          <label>
            {' '}
            <input
              type='checkbox'
              onChange={() => setAllContestsToggle(!AllContestsToggle)}
            />{' '}
            All Contests{' '}
          </label>
        </div>
        {isLoading && <Loader />}
        {Contests?.length === 0 && !isLoading && (
          <div className='text-xl text-center'>No contests found</div>
        )}
        <div className='flex flex-wrap justify-around gap-4'>
          {Contests &&
            Contests?.map((contest, index) => {
              return <Card key={index} {...contest} />;
            })}
        </div>
      </main>
    </>
  );
}
