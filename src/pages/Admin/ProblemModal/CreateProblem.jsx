import React, { useState } from 'react';
import Modal from '../../../components/Modal';
import Input from '../../Account/components/Input';
import MDEditor from '@uiw/react-md-editor';
import SelectList from '../../../components/SelectList';
import axios from '../../../api/axios';

const CreateProblemModal = ({ ModalOpen, setModalOpen, handleClick }) => {
  const [problemTitle, setProblemTitle] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [sampleInput, setSampleInput] = useState('');
  const [sampleOutput, setSampleOutput] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [tags, setTags] = useState('');
  // handle seperately for isPublished
  const [isPublished, setIsPublished] = useState('No');
  const [testCasesInput, setTestCasesInput] = useState('');
  const [testCasesOutput, setTestCasesOutput] = useState('');
  return (
    <Modal
      size='lg'
      heading='Add Problem'
      showModal={ModalOpen}
      setShowModal={setModalOpen}
      btnText='Add Problem'
      HandleClick={() => {
        (async () => {
          const res = await axios.post('/api/v1/admin/problem', {
            title: problemTitle,
            description: problemDescription,
            sampleInput: sampleInput,
            sampleOutput: sampleOutput,
            difficulty: difficulty,
            tags: tags,
            isPublished: isPublished === 'Yes' ? true : false,
            testCasesInput: testCasesInput,
            testCasesOutput: testCasesOutput,
          },
          {
            withCredentials: true,
          }
          );
          // console.log(res.data);
          handleClick();
        })();
      }}
    >
      <div className='flex flex-col gap-4'>
        <label>
          Problem Title
          <Input
            bgColor='rgb(13,17,23)'
            placeholder={'Problem Title'}
            value={problemTitle}
            handleChange={setProblemTitle}
            labelText={'Problem Title'}
            name={'problemTitle'}
            labelFor={'problemTitle'}
            isRequired
            readOnly
            my={0}
          />
        </label>
        <label>
          Problem Description
          <MDEditor
            preview='live'
            value={problemDescription}
            onChange={setProblemDescription}
          />
        </label>
        <label>
          Sample Input
          <MDEditor
            preview='edit'
            value={sampleInput}
            onChange={setSampleInput}
            hideToolbar={true}
          />
        </label>
        <label>
          Sample Output
          <MDEditor
            preview='edit'
            value={sampleOutput}
            onChange={setSampleOutput}
            hideToolbar={true}
          />
        </label>
        <label>
          Test Cases Input
          <MDEditor
            preview='edit'
            value={testCasesInput}
            onChange={setTestCasesInput}
            hideToolbar={true}
          />
        </label>
        <label>
          Test Cases Output
          <MDEditor
            preview='edit'
            value={testCasesOutput}
            onChange={setTestCasesOutput}
            hideToolbar={true}
          />
        </label>

        <label>
          Difficulty
          <SelectList
            bgColor='rgb(13,17,23)'
            selectedValue={difficulty}
            setSelectedValue={setDifficulty}
            listData={['Easy', 'Medium', 'Hard']}
            placeholder={'Select Difficulty'}
          />
        </label>
        <label>
        Tags <span className='text-gray-600'>Seperated by Comma ( , )</span>
          <Input
            bgColor='rgb(13,17,23)'
            placeholder={'Tags'}
            value={tags}
            handleChange={setTags}
            labelText={'tags'}
            name={'tags'}
            labelFor={'tags'}
            isRequired
            readOnly
            my={0}
          />
        </label>
        <label>
          Is Published
          <SelectList
            bgColor='rgb(13,17,23)'
            selectedValue={isPublished}
            setSelectedValue={setIsPublished}
            listData={['Yes', 'No']}
            placeholder={'Select Difficulty'}
          />
        </label>
      </div>
    </Modal>
  );
};

export default CreateProblemModal;
