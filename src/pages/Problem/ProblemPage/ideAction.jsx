import React, { useContext } from 'react';
import Loader from '../../../components/Loader';
import Constants from './Constants';
import axios from '../../../api/axios';
import { RUNCODE_URL } from '../../../constants';
import AuthContext from '../../../context/AuthProvider';

export default function IdeAction({
  code,
  input,
  selectedLanguage,
  setOutput,
  problem,
}) {
  const {auth, setAuth} = useContext(AuthContext);
  const [isRunLoading, setIsRunLoading] = React.useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null);
  const handleRunCode = async (e) => {
    e.preventDefault();
    setIsRunLoading(true);
    const RunPayload = {
      stdin: input,
      files: [
        {
          name:
            'codebuddy.' +
            (Constants.languages[selectedLanguage] || selectedLanguage),
          content: code,
        },
      ],
    };
    try {
      const response = await axios.post(RUNCODE_URL, RunPayload, {
        withCredentials: true,
      });
      // console.log(response.data)
      setOutput(
        response.data.stdout || response.data.stderr || response.data.error
      );
    } catch (error) {
      setOutput(error);
    } finally {
      setIsRunLoading(false);
    }
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    setIsSubmitLoading(true);
    const SubmitPayload = {
      files: [
        {
          name:
            'codebuddy.' +
            (Constants.languages[selectedLanguage] || selectedLanguage),
          content: code,
        },
      ],
    };
    try {
      const response = await axios.post(
        '/api/v1/problem/' + problem?.problem_slug,
        SubmitPayload,
        {
          withCredentials: true,
        }
      );
      if (response.data.message === 'Correct Answer') {
        setSubmitStatus(response.data.message);
        setAuth((auth) => ({
          ...auth,
          problemSolved: [
            ...auth.problemSolved,
            { problemSlug: problem?.problem_slug, solvedDate: new Date() },
          ],
        }));
      } else setOutput(response.data.message);
      // setOutput(
      //   response.data.stdout || response.data.stderr || response.data.error
      // );
      // handle submit success or failure here
    } catch (error) {
      if (error.response.data.error === 'Wrong Answer')
        setSubmitStatus(error.response.data.error);
      else setOutput(error.response.data.error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-end px-12 pb-1.5 pt-2 -my-0.5 bg-dark'>
      <div className='mr-auto text-white cursor-pointer'>
        {selectedLanguage}
      </div>

      {submitStatus && (
        <p className='text-white'>
          Status :{' '}
          <span
            className={
              submitStatus === 'Correct Answer'
                ? 'text-green-600'
                : 'text-red-600'
            }
          >
            {submitStatus}
          </span>
        </p>
      )}
      <button
        className='ml-4 relative flex justify-center px-4 py-2 my-1 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
        onClick={handleRunCode}
      >
        {isRunLoading ? (
          <>
            <Loader width='5' small={true} height='5' /> &nbsp; &nbsp;Executing
          </>
        ) : (
          'Run Code'
        )}
      </button>

      <button
        className='ml-4 relative flex justify-center px-4 py-2 my-1 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
        onClick={handleSubmitCode}
      >
        {isSubmitLoading ? (
          <>
            <Loader width='5' small={true} height='5' /> &nbsp; &nbsp;Executing
          </>
        ) : (
          'Submit Code'
        )}
      </button>
    </div>
  );
}
