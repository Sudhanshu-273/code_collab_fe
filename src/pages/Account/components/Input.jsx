import React, { useEffect, useState } from 'react';
import AlertImg from '../../../assets/alert.svg';
const fixedInputClass =
  'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass,
  autoComplete,
  isError = false,
  errorMessage = '',
  readOnly,
  bgColor = 'white',
  my = 0,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [delayHandler, setDelayHandler] = useState(null);

  useEffect(() => {
    console.log('Hovered');
  }, [isHovering]);

  const handleMouseOver = () => {
    setDelayHandler(
      setTimeout(() => {
        setIsHovering(true);
      }, 500)
    );
  };

  const handleMouseOut = () => {
    clearTimeout(delayHandler);
    setIsHovering(false);
  };

  return (
    <div className={`relative flex items-center my-${my}`}
    >
      <label htmlFor={labelFor} className='sr-only'>
        {labelText}
      </label>
      <input
      style={{
        backgroundColor: bgColor,
        color: bgColor !== 'white' && 'white',
      }}
        onChange={(e) => handleChange(e.target.value)}
        value={value}
        id={id}
        name={name}
        type={type}
        required={isRequired}
        className={`${fixedInputClass} ${customClass} ${bgColor !== 'white'? 'border-black' : ''} `}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...readOnly}
      />
      {isError && (
        <>
          <div
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className={`absolute right-0 p-1 ${isError ? 'block' : 'hidden'}`}
          >
            <img src={AlertImg} alt='alert' />
          </div>
          {isHovering && (
            <div className='absolute px-1 text-white bg-red-500 rounded right-8'>
              {errorMessage}
            </div>
          )}
        </>
      )}
    </div>
  );
}
