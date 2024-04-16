import UpdateProblemModal from '../pages/Admin/ProblemModal/updateProblem';
import React, { useState } from 'react';

function TextColumn({ row, columnKey }) {
  if (
    row[columnKey] === '' ||
    row[columnKey] === null ||
    row[columnKey] === undefined
  ) {
    return <td className='px-4 py-2.5 text-xs text-dark text-center'>-</td>;
  }

  return (
    <td className={'px-3 py-2.5 text-xs text-dark text-center'}>
      {row[columnKey]}
    </td>
  );
}
function EditProblemColumn({ row, columnKey }) {
  const [ModalOpen, setModalOpen] = useState(false);
  return (
    <td className={'px-3 py-2.5 text-xs text-dark'}>
      <button
        onClick={() => {
          setModalOpen(true);
        }}
        className='relative flex justify-center px-4 py-1 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
      >
        Edit
      </button>
      <UpdateProblemModal
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        handleClick={row[columnKey]?.handleClick}
        problemData={row[columnKey]?.problemData}
      />
    </td>
  );
}

function EditFeedbackColumn({ row, columnKey }) {
  return (
    <td className={'px-3 py-2.5 text-xs text-dark'}>
      <button
        onClick={row[columnKey]?.handleClick}
        className='relative flex justify-center px-4 py-1 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
      >
        Delete
      </button>
    </td>
  );
}
function AmtwTimeStampColumn({ row, columnKey }) {
  // console.log(row[columnKey]);
  return (
    <td className={'px-3 py-2.5 text-xs text-dark'}>
      <div className='inline-flex flex-col text-center'>
        <p className='text-xs'>{row[columnKey].amount}</p>
        <p
          style={{
            fontSize: '8px',
          }}
          className='text-primary-500'
        >
          {row[columnKey].timestamp}
        </p>
      </div>
    </td>
  );
}

export default function Table({ columns, rows }) {
  // console.log({ rows });
  if (rows.length === 0) return null;
  return (
    <div
      className={`mt-4 md:mt-0 border-collapse border border-gray-200 bg-white rounded-lg`}
    >
      <table className='w-full text-base text-left divide-y divide-gray-200 rounded-lg tb font-roboto'>
        <thead className=''>
          <tr className='text-left bg-gray-100 border-b border-gray-300 divide-x rounded-lg'>
            {columns.map((column, index) => (
              <TableHeaderRow
                roundness={
                  index == 0
                    ? 'rounded-tl'
                    : index == columns.length - 1
                    ? 'rounded-tr'
                    : 'rounded-none'
                }
                key={column.key}
                text={column.label}
              />
            ))}
          </tr>
        </thead>
        <tbody className='divide-y'>
          {rows?.map((row, index) => {
            return (
              <tr
                className={`divide-x ${index % 2 == 1 ? 'bg-gray-100' : ''}`}
                key={index}
              >
                {columns.map((column, _key) => {
                  return (
                    <TableRenderRow
                      key={column.key}
                      rowIndex={index}
                      column={column}
                      row={row}
                    />
                  );
                })}{' '}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TableHeaderRow({ text, roundness }) {
  return (
    <>
      <th
        className={`bg-primary-400 block-flex text-center items-center px-2 py-2 ${roundness}`}
      >
        <span className='text-xs font-medium text-gray-850'>{text}</span>
      </th>
    </>
  );
}

function TableRenderRow({ row, column }) {
  // console.log(row);
  if (column.component === 'TextColumn')
    return <TextColumn row={row} columnKey={column.key} />;
  if (column.component === 'AmtwTimeStampColumn')
    return <AmtwTimeStampColumn row={row} columnKey={column.key} />;
  if (column.component === 'EditProblemColumn')
    return <EditProblemColumn row={row} columnKey={column.key} />;
  if (column.component === 'EditFeedbackColumn')
    return <EditFeedbackColumn row={row} columnKey={column.key} />;
}
