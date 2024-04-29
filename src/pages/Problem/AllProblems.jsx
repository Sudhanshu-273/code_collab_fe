import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import axios from '../../api/axios';
import { GET_PROBLEM_SET } from '../../constants';
import Loader from '../../components/Loader';
import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import Example from './AllProblemstw';
import { UnderlineTabs } from './Tabstw';
import Pagination from './Paginationtw';
import { toast } from 'react-toastify';
export default function AllProblems() {
      const [AllProblems, setAllProblems] = React.useState([]);
      const [isLoading, setIsLoading] = React.useState(true);
      useEffect(() => {
            try {
                  toast.promise(async () => {
                        const promise = await axios.get(GET_PROBLEM_SET, {
                              withCredentials: true,
                        })
                              .then((res) => {
                                    console.log(res.data.data.result.problems)
                                    setAllProblems(res.data.data.result.problems);
                              });
                  }, {
                        pending: 'Loading problems',
                        success: 'Problems loaded 👌',
                        error: 'Could not load problems 🤯. Refresh again'
                  })
            } catch (err) {
                  console.log(err);
            } finally {
                  setIsLoading(false);
            }
      }, []);

      useEffect(() => {

      }, [AllProblems])

      if (isLoading) return <Loader width='20' height='20' />;

      return (
            <>
                  <Helmet>
                        <title>All Problems </title>
                  </Helmet>

                  <main className='px-8 md:px-12 py-6'>
                        <h1 className='text-xl md:text-3xl font-bold'>All Problems</h1>
                        <p className='text-xs md:text-sm opacity-60'>
                              Here you can find the problems from the latest Codeforces Contests.
                              Solve them to improve your coding skills.
                              <br />

                        </p>

                        {/* <div className='flex flex-col gap-4'>

                              {AllProblems?.slice(0, 20).map((problem, index) => (
                                    <ProblemCard key={index} problem={problem} />
                              ))}
                        </div> */}
                  </main>
                  <Example data={AllProblems} />
                  {/* <Pagination /> */}
                  {/* <UnderlineTabs /> */}
            </>
      );
}

const ProblemCard = ({ problem }) => {
      const { auth } = useContext(AuthContext);
      const navigate = useNavigate();
      return (
            <>
            </>
            // <Example />

            // <div className="problem-title my-2">

            //       <a target='_blank' href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}>{problem.name}</a><br />
            //       <strong>Rating : {problem.rating || 'Unrated'}</strong>

            // </div>

      );
};

const ProblemTag = ({ tag }) => {
      return <div className='px-2 py-1 bg-gray-200 rounded text-xs'>{tag}</div>;
};
