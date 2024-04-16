import Navbar from '../components/Navbar';
import React, { Suspense, useEffect } from 'react';
import Home from '../pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Account from '../pages/Account';
import IDE from '../pages/IDE';
import Loader from '../components/Loader';
import RequireAuth from './RequireAuth';
import Unathorized from '../pages/Unathorized';
import { ROLES } from '../constants';
import Logout from '../pages/Logout';
import ContestWatcher from '../pages/ContestWatcher';
import Profile from '../pages/Profile';
import AllSnippet from '../pages/Snippets/AllSnippet';
import SnippetPage from '../pages/Snippets/SnippetPage';
import NotFound from '../pages/NotFound';
import CodeRoom from '../pages/CodeRoom';
import Problem from '../pages/Problem';
import Admin from '../pages/Admin';
import axios from '../api/axios';
import Settings from '../pages/Settings';

export default function RouteController() {
  useEffect(() => {
    (async () => {
      await axios.get('/visitor-count', {
        withCredentials: true,
      });
    })();
  }, []);
  return (
    <Suspense fallback={<Loader fullScreen width={20} height={20} />}>
      <main style={{ minHeight: '100vh' }}>
        {' '}
        <BrowserRouter>
          <Navbar />

          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/auth/*' element={<Account />} />
            <Route path='/unauthorized' element={<Unathorized />} />
            <Route path='/ide' element={<IDE />} />

            <Route path='/contest-watcher/*' element={<ContestWatcher />} />
            <Route path='/code-room/*' element={<CodeRoom />} />

            <Route path='/logout' element={<Logout />} />
            <Route path='/user/*' element={<Profile />} />

            {/* Private Routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path='/problem/*' element={<Problem />} />
              <Route path='/settings' element={<Settings />} />
              <Route
                path='/snippets'
                element={<Navigate to={'./all'} replace />}
              />
              <Route path='/snippets/all' element={<AllSnippet />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path='/admin/*' element={<Admin />} />
            </Route>

            <Route path='/snippets/:snippetId' element={<SnippetPage />} />

            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />} >
            <Route path='/editor' element={<div> You're Editor !</div>} />
            </Route>

            {/* Catch All */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </main>
    </Suspense>
  );
}
