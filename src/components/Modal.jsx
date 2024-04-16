import React from 'react';
import x from '../assets/x.svg';
export default function Modal({
  heading = '',
  children,
  description = '',
  showModal,
  setShowModal,
  btnText = '',
  HandleClick,
  size = 'md',
}) {
  if (showModal)
    return (
      <div className={`fixed inset-0 z-10 flex items-center justify-center h-screen min-h-full bg-gray-900/20 ${size === 'lg' ? '' : 'sm:px-6 lg:px-8'}`}>
        <div
          onClick={() => {
            setShowModal(false);
          }}
          className='absolute top-0 left-0 w-screen h-screen bg-black/5'
        ></div>
        <div
          className={`relative rounded bg-dark ${
            size === 'lg'
              ? 'overflow-y-auto overflow-x-hidden h-screen w-screen'
              : 'max-w-md  w-max '
          }`}
        >
          {' '}
          <div className='px-6 py-8 text-left text-white '>
            <div> {heading}</div>
            <hr className='mt-1 mb-8' />
            <div> {description || children} </div>
            <br />
            <div className='flex items-center gap-4'>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className='px-2 py-1 border border-white rounded'
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  HandleClick();
                  setShowModal(false);
                }}
                className='px-2 py-1 bg-red-500 border border-white rounded'
              >
                {btnText}
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              setShowModal(false);
            }}
            className='absolute p-1 transition-colors duration-100 bg-purple-600 rounded-full cursor-pointer z-100 hover:bg-purple-700 -right-3 -top-3'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-x'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          </button>
        </div>
      </div>
    );
  else return null;
}
