import React from 'react';
import { useNavigate } from 'react-router';
import heart from '../../assets/heart.svg';
import code from '../../assets/code.svg';
import x from '../../assets/x.svg';
import github from '../../assets/github.svg';
import linkedin from '../../assets/linkedin.svg';
import twitter from '../../assets/twitter.svg';
import mail from '../../assets/mail.svg';

export default function Footer() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(
    localStorage?.getItem('codebuddy_cookieClose') === 'false'
      ? false
      : true || true
  );
  React.useEffect(() => {
    console.log(localStorage?.getItem('codebuddy_cookieClose'));
    setIsOpen(
      localStorage?.getItem('codebuddy_cookieClose') === 'false'
        ? false
        : true || true
    );
  }, []);
  return (
    <footer>
      {isOpen && (
        <div className='sticky flex justify-between w-full px-6 py-4 text-gray-600 top-20 bg-black/10 text-xs md:text-sm'>
          <div>
            To give you the best experience, Code Buddy uses cookies and other
            similar technologies.{' '}
          </div>
          <div
            className='cursor-pointer'
            onClick={() => {
              setIsOpen(false);
              localStorage?.setItem('codebuddy_cookieClose', false);
            }}
          >
            {' '}
            <img src={x} alt='close' />
          </div>
        </div>
      )}
      <div className='flex flex-col items-center justify-between gap-4 px-8 pb-6 text-white/60 bg-dark md:px-14 pt-14 text-sm md:text-md'>
        <div className='flex gap-3 md:gap-4'>
          <button className='link-slide' onClick={() => navigate('/ide')}>
            IDE
          </button>
          <button
            className='link-slide'
            onClick={() => navigate('/contest-watcher')}
          >
            Contest Watcher
          </button>
          <button className='link-slide' onClick={() => navigate('/snippets')}>
            All Snippets
          </button>

          <button className='link-slide' onClick={() => navigate('/auth')}>
            Account
          </button>
        </div>
        <div className='h-px text-center w-72 bg-white/20' />
        <div className='flex gap-4 text-center'>
          {/* <a href='mailto:sudhanshuchaubey273+codebuddy@gmail.com'>
            <img src={mail} alt='' />
          </a>
          <a href='https://github.com/abhaygupta08/codebuddy/' target='_blank'>
            <img src={github} alt='' />
          </a>
          <a href='https://www.linkedin.com/in/abhaygupta08/' target='_blank'>
            <img src={linkedin} alt='' />
          </a> */}
          {/* <a href='https://twitter.com/abhay_gupta08/' target='_blank'>
            <img src={twitter} alt='' />
          </a> */}
        </div>
        <div className='flex flex-col'>
          <div className='flex justify-center gap-1'>
            Made with <img src={heart} alt='heart' /> and{' '}
            <img src={code} alt='code' /> by{' '}
            <a
              //   href='https://abhaygupta.me/'
              href='#'
              rel='nofollow'
              target={'_blank'}
              className='text-white link-slide opacity-70'
            >
              Sudhanshu & Nishant
            </a>
          </div>
          <div className='flex flex-wrap gap-1 justify-center'>
            <div>Copyright © 2023 Code Collab.</div>{' '}
            <div>All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
