import React, { useEffect, useState } from 'react';
import Constants from '../Constants';
import SelectList from '../../../components/SelectList';
import Loader from '../../../components/Loader';
import axios from '../../../api/axios';
import { RUNCODE_URL } from '../../../constants';

export default function Config({
  selectedTheme,
  setSelectedTheme,
  selectedLanguage,
  setSelectedLanguage,
  input,
  setInput,
  output,
  setOutput,
  code,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const SelectOptions = [
    {
      heading: 'Select Theme',
      selectedValue: selectedTheme,
      setSelectedValue: setSelectedTheme,
      listData: Constants.CodeMirrorTheme,
    },
    {
      heading: 'Select Language',
      selectedValue: selectedLanguage,
      setSelectedValue: setSelectedLanguage,
      listData: Object.keys(Constants.languages),
    },
  ];
  const InputOptions = [
    {
      heading: 'Input',
      selectedValue: input,
      setSelectedValue: setInput,
    },
    {
      heading: 'Output',
      selectedValue: output,
      setSelectedValue: setOutput,
    },
  ];

  const handleRunCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      const response = await axios.post(RUNCODE_URL, RunPayload);
      // console.log(response.data)
      setOutput(
        response.data.stdout || response.data.stderr || response.data.error
      );
    } catch (error) {
      setOutput(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        borderLeft: '3px solid #9333EA',
      }}
      className='relative w-4/12  flex flex-col justify-between'
    >
      <div className='flex flex-col gap-2 justify-between'>
        <div className='w-full flex items-center gap-4'>
          <div className='mt-2 flex items-center justify-between gap-2 w-full mx-4'>
            {SelectOptions.map(
              ({ heading, selectedValue, setSelectedValue, listData }) => (
                <SelectOption
                  key={heading}
                  heading={heading}
                  selectedValue={selectedValue}
                  setSelectedValue={setSelectedValue}
                  listData={listData}
                />
              )
            )}
          </div>
        </div>
        <div className=''>
          <div></div>
          {InputOptions.map(({ heading, selectedValue, setSelectedValue }) => (
            <InputOption
              key={heading}
              heading={heading}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          ))}
        </div>
      </div>
      <button
        className='relative mb-4 mx-4 flex justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
        onClick={handleRunCode}
      >
        {isLoading ? (
          <>
            <Loader small={true} width='5' height='5' /> &nbsp; &nbsp;Executing
          </>
        ) : (
          'Run Code'
        )}
      </button>
    </div>
  );
}

const SelectOption = ({
  heading,
  selectedValue,
  setSelectedValue,
  listData,
}) => (
  <SelectList
    selectedValue={selectedValue}
    setSelectedValue={setSelectedValue}
    listData={listData}
    placeholder={heading || ''}
  />
);

const InputOption = ({ heading, selectedValue, setSelectedValue }) => {
  const [rows, setRows] = useState(heading === 'Input' ? '6' : '8');

  return (
    <div className='pt-4 mx-4'>
      <div className='flex items-center gap-2 my-1'>
        <hr className='text-gray-200' width='20px' />
        <div className='text-gray-200 whitespace-nowrap '>{heading || ''}</div>
        <hr className='text-gray-200' width='100%' />
      </div>
      <textarea
        rows={rows}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        readOnly={heading === 'Output'}
        className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none no-scrollbar focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm'
        placeholder={
          heading === 'Output'
            ? 'Output will be displayed here.'
            : 'Input (if any)'
        }
      />
    </div>
  );
};
