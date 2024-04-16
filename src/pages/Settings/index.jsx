import React from 'react';
import Tabs from '../CodeRoom/components/Tabs';
import Account from './Account';
import Security from './Security';

const Settings = () => {
  const TabList = [
    {
      name: 'Account',
      component: <Account />,
    },
    {
      name: 'Security',
      component: <Security />,
    },
  ];
  return <Tabs tabList={TabList} />;
};

export default Settings;
