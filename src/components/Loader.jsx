import React from 'react';
import { useEffect } from 'react';

export default function Loader({
  width = '14',
  height = '14',
  color = 'black',
  small = false,
  fullScreen,
}) {
  if (fullScreen) {
useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'unset';
      };
      }, []
      )    
    return (
      <div className={`z-10 w-full h-screen flex justify-center items-center `}>
        <div
          style={{
            width: 4 * width + 'px',
            height: 4 * height + 'px',
          }}
          className={`animate-spin rounded-full border-b-2 border-${color}`}
        ></div>
        {/* {text ? <div className="mt-2 font-bold text-center">{text}</div> : null} */}
      </div>
    );
  }

  return (
    <div
      className={`${
        small ? '' : 'w-full h-96'
      } flex justify-center items-center `}
    >
      <div
        style={{
          width: 4 * width + 'px',
          height: 4 * height + 'px',
        }}
        className={`animate-spin rounded-full border-b-2 border-${color}`}
      ></div>
      {/* {text ? <div className="mt-2 font-bold text-center">{text}</div> : null} */}
    </div>
  );
}
