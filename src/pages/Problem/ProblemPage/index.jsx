import React, { useEffect } from 'react';
import Config from './Config';
import EditorComponent from './EditorComponent';
import IdeAction from './ideAction';
import axios from '../../../api/axios';
import { GET_PROBLEM_SET } from '../../../constants';
import remarkGfm from 'remark-gfm';

import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

export default function ProblemPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = React.useState('vs-dark');
  const [selectedLanguage, setSelectedLanguage] = React.useState('C++');
  const [code, setCode] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [input, setInput] = React.useState('');


  const [problem, setProblem] = React.useState({});
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          GET_PROBLEM_SET + '/' + params.problemSlug,
          {
            withCredentials: true,
          }
        );
        setProblem(data?.problem);
        // setCode(data?.template);
        setInput(data?.problem?.sampleInput);
        setSelectedLanguage('C++');
      } catch (err) {
        console.log(err);
        if (err.response.status === 404) {
          toast.error('Problem not found');
          navigate('/problem');
        }
      }
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>{problem?.title || ''} </title>
      </Helmet>

      <div className='relative flex flex-col justify-between w-full overflow-hidden bg-dark'>
        <ProblemStatement problem={problem} />

        <div 
        className='flex border border-gray-300'
        >
          <div style={{ width: '70%' }}>
            <EditorComponent
            selectedTheme={selectedTheme}
              selectedLanguage={selectedLanguage}
              code={code}
              setCode={setCode}
            />
          </div>

          <div style={{ width: '30%' }}>
            <Config
              setCode={setCode}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              output={output}
              setOutput={setOutput}
              input={input}
              setInput={setInput}
            />
          </div>
        </div>
      </div>
      <IdeAction
        code={code}
        input={input}
        selectedLanguage={selectedLanguage}
        setOutput={setOutput}
        problem={problem}
      />
    </>
  );
}

import MDEditor from '@uiw/react-md-editor';
const ProblemStatement = ({ problem }) => {
  return (
    <>
      <div className='text-white container px-6 py-8'>
        <div className='wmde-markdown-var'> </div>

        <MDEditor.Markdown
          source={problem?.description}
          previewOptions={{
            remarkPlugins: [remarkGfm],
            rehypePlugins: [],
          }}
        />
      </div>
    </>
  );
};
