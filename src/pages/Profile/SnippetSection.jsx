import React from 'react';
import Loader from '../../components/Loader';
import SnippetCard from '../Snippets/SnippetCard';
import axios from '../../api/axios';
import { ALL_PUBLIC_SNIPPETS } from '../../constants';
import { useEffect } from 'react';
import { useParams } from 'react-router';
const SnippetSection = ({ user }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [AllSnippets, setAllSnippets] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const params = useParams();
  useEffect(() => {
    const temp = async () => {
      const response = await axios.get(ALL_PUBLIC_SNIPPETS, {
        withCredentials: true,
      });
      setAllSnippets(response.data);
      setIsLoading(false);
    };
    temp();
  }, []);

  return (
    <>
      {' '}
      <h1 className='mt-16 text-xl md:text-3xl font-bold'>
        {user?.username + "'s"} Snippets
      </h1>
      <p className='text-sm opacity-60'>
        {params?.username
          ? 'In this page user would be able to view all public snippets of other user.'
          : 'In this page user would be able to view their all public/private snippets.'}
        <br />
        <b>Pro Tip</b> :{' '}
        <i>
          You can filter the snippets based on{' '}
          <span className='font-bold'> Snippet Language </span> by clicking on
          it.
        </i>
      </p>
      <br />
      <hr />
      <br />
      <div className='flex justify-center my-8'>
        {AllSnippets?.filter(
          (snippet) => snippet.author === user.username
        )?.filter((snippet) =>
          snippet.snippetTitle
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase())
        ).length > 0 ? (
          <input
            type='text'
            className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 text-xs sm:text-sm'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder='Search Snippet'
          />
        ) : null}
      </div>
      {isLoading && <Loader width='20' height='20' />}
      {AllSnippets?.filter(
        (snippet) => snippet.author === user.username
      )?.filter((snippet) =>
        snippet.snippetTitle
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      )?.length === 0 &&
        !isLoading && (
          <div className='text-sm md:text-xl text-center'>No Snippets found</div>
        )}
      <div className='flex flex-wrap justify-around gap-4'>
        {AllSnippets?.filter((snippet) => snippet.author === user.username)
          ?.filter((snippet) =>
            snippet.snippetTitle
              .toLocaleLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
          )
          ?.map((snippet, index) => (
            <SnippetCard key={index} {...snippet} />
          ))}
      </div>
    </>
  );
};


export default SnippetSection;