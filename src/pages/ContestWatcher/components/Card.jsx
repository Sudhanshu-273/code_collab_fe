import React from 'react';
import { useNavigate } from 'react-router';
import constants from '../constants.js';
import useTimeString from '../../../hooks/useTimeString';
import calendar from '../../../assets/calendar.svg';
import 'add-to-calendar-button';

export default function Card({
      event,
      host,
      duration,
      href,
      start,
      end,
      site_logo,
      currently_running,
      logo,
      hideSite = false,
}) {
      const navigate = useNavigate();
      return (
            <div
                  className={`flex flex-col gap-2 px-2 md:px-2 py-2 md:py-4 overflow-x-hidden text-sm border rounded w-96 ${currently_running && 'bg-purple-300'
                        }`}
            >
                  <div className='flex items-center justify-start gap-4'>
                        <div
                              onClick={() => {
                                    if (hideSite) return;
                                    navigate(`./${constants[host]}`)
                              }
                              }
                              className='w-[34px] md:w-[68px] md:p-2 border rounded'
                        >
                              <img
                                    className='cursor-pointer w-[30px] md:w-[60px]'
                                    // width='60px'
                                    src={logo}
                                    alt='Logo'
                              />
                        </div>
                        <div className='flex items-end justify-between gap-2  w-full'>
                              <div className='flex flex-col w-full'>
                                    <span
                                          title={event}
                                          className='text-sm md:text-lg font-semibold whitespace-nowrap w-full text-ellipsis'
                                    >
                                          {event?.length > 0
                                                ? event.length > 33
                                                      ? event.substring(0, 24)
                                                      : event || '-'
                                                : '-'}
                                    </span>
                                    <div className='flex justify-between gap-2'>
                                          {!hideSite && (
                                                <span
                                                      title={host}
                                                      onClick={() => {
                                                            if (hideSite) return;
                                                            navigate(`./${constants[site_name]}`)
                                                      }
                                                      }
                                                      className='whitespace-nowrap opacity-60 link-hover text-xs md:text-sm'
                                                >
                                                      {host.substring(0, 17)}
                                                </span>
                                          )}
                                          <div>
                                                <span className='opacity-60 whitespace-nowrap text-xs md:text-sm'>Lasts for</span>{' '}
                                                <span className='whitespace-nowrap text-xs md:text-sm'>{`${Math.floor(duration / 3600)}hr ${Math.floor((duration % 3600) / 60)}mins `}</span>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <hr />
                  <div className='flex items-center justify-between md:gap-2 text-xxs'>
                        <span>
                              <span className='opacity-60'>Starts on:</span>{' '}
                              {useTimeString(start)}
                        </span>
                        <span>
                              <span className='opacity-60'>Ends on:</span> {useTimeString(end)}
                        </span>
                  </div>
                  <div className='flex items-center justify-between gap-2 mt-2'>
                        <a
                              className='text-xs flex gap-2 items-center w-max px-2 md:px-4 py-1 md:py-1.5 md:text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md participateBtn group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                              href={`http://www.google.com/calendar/event?action=TEMPLATE&dates=${start.replace(
                                    /-|:|\.\d\d\d/g,
                                    ''
                              )}%2F${end.replace(
                                    /-|:|\.\d\d\d/g,
                                    ''
                              )}&text=${encodeURIComponent(
                                    event
                              )}%20%20%7C%20Code%20Collab&location=${encodeURIComponent(
                                    host
                              )}&details=Link%20to%20contest%20-%20${href}%0A%0AThis%20event%20was%20generated%20by%20Code%20Collab`}
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
                              onClick={() => window.open(href, '_blank')}
                              className='px-2 md:px-4 py-2 text-xs md:text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md w-max participateBtn group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                        >
                              <span className='whitespace-nowrap'> {'More Details'} </span>
                              <div />
                        </button>
                  </div>
            </div>
      );
}
