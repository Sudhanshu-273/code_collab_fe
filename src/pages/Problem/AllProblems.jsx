import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';
import axios from '../../api/axios';
import { GET_PROBLEM_SET } from '../../constants';
import Loader from '../../components/Loader';
import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
export default function AllProblems() {
      const [AllProblems, setAllProblems] = React.useState([]);
      const [isLoading, setIsLoading] = React.useState(true);
      useEffect(() => {
            try {
                  console.log('Problems Page')
                  axios
                        .get(GET_PROBLEM_SET, {
                              withCredentials: true,
                        })
                        .then((res) => {
                              console.log(res.data.data.result.problems)
                              setAllProblems(res.data.data.result.problems);
                        });
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

                  <main className='px-8 md:px-12 py-14'>
                        <h1 className='text-xl md:text-3xl font-bold'>All Problems</h1>
                        <p className='text-xs md:text-sm opacity-60'>
                              Here you can find the problems from the latest Codeforces Contests.
                              Solve them to improve your coding skills.
                              <br />
                              {/* <b>Pro Tip</b> :{' '}
        <i>
          You can filter the problems based on{' '}
          <span className='font-bold'> Difficulty </span> by clicking on it.
        </i> */}
                        </p>
                        <br />
                        <hr />
                        <br />
                        {/* <h1>Hello</h1> */}

                        <div className='flex flex-col gap-4'>
                              {/* {AllProblems?.length === 0 && (
                                    <div className='flex flex-col items-center justify-center gap-4'>
                                          <h1 className='text-2xl font-bold'>No Problems Found</h1>
                                          <p className='text-sm opacity-60'>
                                                We are working on adding more problems. Please check back later.
                                          </p>
                                    </div>
                              )} */}
                              {AllProblems?.slice(0, 20).map((problem, index) => (
                                    <ProblemCard key={index} problem={problem} />
                                    // <h1>{problem.title}</h1>
                              ))}
                        </div>
                  </main>
            </>
      );
}

const ProblemCard = ({ problem }) => {
      const { auth } = useContext(AuthContext);
      const navigate = useNavigate();
      return (
            // <div className='px-4 md:px-8 py-2 md:py-6 border rounded'>
            //       <div className='flex gap-2 justify-between items-start'>
            //             <div>
            //                   <h5
            //                         className='text-lg font-bold text-gray-700 cursor-pointer'
            //                         onClick={() => {
            //                               navigate(`/problem/${problem.problem_slug}`);
            //                         }}
            //                   >
            //                         {problem.name}
            //                   </h5>
            //                   <span
            //                         title='Difficulty'
            //                         className={`opacity-60 text-xs ${problem?.difficulty === 'Easy'
            //                               ? 'text-green-700'
            //                               : 'text-orange-700'
            //                               }`}
            //                   >
            //                         {problem.rating}
            //                   </span>
            //             </div>
            //             {auth?.problemSolved?.find(problem => problem.problemSlug)?.problemSlug === problem.problem_slug && (
            //                   <div className='mt-2 flex gap-1 opacity-60'>
            //                         <div className='px-2 py-1 bg-green-200 rounded text-xs'>Solved</div>
            //                   </div>
            //             )}
            //       </div>

            //       <div className='mt-2 flex gap-1 opacity-60'>
            //             {problem?.tags[0].split(',')?.map((tag, index) => (
            //                   <ProblemTag key={index} tag={tag} />
            //             ))}
            //       </div>
            // </div>
            <div className="problem-title my-2">

                  <a target='_blank' href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}>{problem.name}</a><br />
                  <strong>Rating : {problem.rating}</strong>

            </div>
      );
};

const ProblemTag = ({ tag }) => {
      return <div className='px-2 py-1 bg-gray-200 rounded text-xs'>{tag}</div>;
};
