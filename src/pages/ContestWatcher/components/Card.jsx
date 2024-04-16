import React from 'react';
import { useNavigate } from 'react-router';
import constants from '../constants.js';
import useTimeString from '../../../hooks/useTimeString';
import calendar from '../../../assets/calendar.svg';

export default function Card({
  contest_name,
  site_name,
  duration,
  url,
  start_time,
  end_time,
  site_logo,
  currently_running,
  hideSite = false,
}) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-col gap-2 px-2 md:px-6 py-2 md:py-4 overflow-x-hidden text-sm border rounded w-96 ${
        currently_running && 'bg-purple-300'
      }`}
    >
      <div className='flex items-center justify-start gap-4'>
        <div
          onClick={() => {
            if(hideSite) return;
            navigate(`./${constants[site_name]}`)}
          }
          className='w-[34px] md:w-[68px] md:p-2 border rounded'
        >
          <img
            className='cursor-pointer w-[30px] md:w-[60px]'
            // width='60px'
            src={site_logo}
            alt='Logo'
          />
        </div>
        <div className='flex items-end justify-between gap-2  w-full'>
          <div className='flex flex-col w-full'>
            <span
              title={contest_name}
              className='text-sm md:text-lg font-semibold whitespace-nowrap w-full text-ellipsis'
            >
              {contest_name?.length > 0
                ? contest_name.length > 33
                  ? contest_name.substring(0, 30) + '...'
                  : contest_name || '-'
                : '-'}
            </span>
            <div className='flex justify-between gap-2'>
              {!hideSite && (
                <span
                  title={site_name}
                  onClick={() => {
                    if(hideSite) return;
                    navigate(`./${constants[site_name]}`)}
                  }
                                    className='whitespace-nowrap opacity-60 link-hover text-xs md:text-sm'
                >
                  {site_name}
                </span>
              )}
              <div>
                <span className='opacity-60 whitespace-nowrap text-xs md:text-sm'>Lasts for</span>{' '}
                <span className='whitespace-nowrap text-xs md:text-sm'>{duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className='flex items-center justify-between md:gap-2 text-xxs'>
        <span>
          <span className='opacity-60'>Starts on:</span>{' '}
          {useTimeString(start_time)}
        </span>
        <span>
          <span className='opacity-60'>Ends on:</span> {useTimeString(end_time)}
        </span>
      </div>
      <div className='flex items-center justify-between gap-2 mt-2'>
        <a
          className='text-xs flex gap-2 items-center w-max px-2 md:px-4 py-1 md:py-1.5 md:text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md participateBtn group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
          href={`http://www.google.com/calendar/event?action=TEMPLATE&dates=${start_time.replace(
            /-|:|\.\d\d\d/g,
            ''
          )}%2F${end_time.replace(
            /-|:|\.\d\d\d/g,
            ''
          )}&text=${encodeURIComponent(
            contest_name
          )}%20%20%7C%20Code%20Buddy&location=${encodeURIComponent(
            site_name
          )}&details=Link%20to%20contest%20-%20${url}%0A%0AThis%20event%20was%20generated%20by%20Code%20Buddy`}
          target='_blank'
          rel='nofollow'
        >
          <img
            src={calendar}
            alt='Add to Google Calendar'
            title='Add to Google Calendar'
          />
          Add to Calendar
        </a>
        <button
          onClick={() => window.open(url, '_blank')}
          className='px-2 md:px-4 py-2 text-xs md:text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md w-max participateBtn group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
        >
          <span className='whitespace-nowrap'> {'More Details'} </span>
          <div />
        </button>
      </div>
    </div>
  );
}
