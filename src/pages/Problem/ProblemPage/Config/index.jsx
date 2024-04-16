import React, { useEffect, useState } from 'react';
import Constants from '../Constants';
import SelectList from '../../../../components/SelectList';
import refreshCcw from '../../../../assets/refresh-ccw.svg';
import Modal from '../../../../components/Modal';

export default function Config({
  selectedTheme,
  setSelectedTheme,
  selectedLanguage,
  setSelectedLanguage,
  input,
  setInput,
  output,
  setOutput,
  setCode,
}) {
  const SelectOptions = [
    {
      heading: 'Select Theme',
      selectedValue: selectedTheme,
      setSelectedValue: setSelectedTheme,
      listData: Constants.monacoThemes,
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
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className='relative w-full'>
      <div className='flex items-center justify-end w-full gap-4 '>
          

          <div className='flex items-center gap-4 my-2 mr-4'>
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
            <img
              title='Reset Code.'
              className='cursor-pointer'
              src={refreshCcw}
              alt='refresh-ccw'
              onClick={() => {
                setShowModal(true);
              }}
            />

        </div>
      </div>
        <div
          className={
              'h-auto opacity-100' +
                'transitions-height delay-200 duration-200'
          }
        >
        {InputOptions.map(({ heading, selectedValue, setSelectedValue }) => (
          <InputOption
            key={heading}
            heading={heading}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        ))}
      </div>
    
      <Modal
            heading='Reset the Code'
            description={'Code will be permanently deleted.'}
            btnText={'Reset Code'}
            showModal={showModal}
            setShowModal={setShowModal}
            HandleClick={() => {
              setCode('');
              localStorage.removeItem('codebuddy_code');
            }}
          />
</div>
    
  );
}

const SelectOption = ({
  heading,
  selectedValue,
  setSelectedValue,
  listData,
}) => (
  // <div className='pt-4 mx-4'>
  //   <div className='flex items-center gap-2 my-1'>
  //     <hr className='text-gray-200' width='20px' />
  //     <div className='text-gray-200 whitespace-nowrap '>{heading || ''}</div>
  //     <hr className='text-gray-200' width='100%' />
  //   </div>

    <SelectList
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      listData={listData}
      placeholder={heading || ''}
      />
      // </div>
);

const InputOption = ({
  heading,
  selectedValue,
  setSelectedValue,
}) => {
  const [rows, setRows] = useState(heading === 'Input' ? '4' : '8');

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
