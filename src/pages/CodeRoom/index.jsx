import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import CodeRoomDashboard from './Dashboard';
import RoomPage from './RoomPage';

export default function CodeRoom() {
  return (
    <Routes>
      <Route path='/' element={<CodeRoomDashboard />} />
      <Route path='/join' element={<Navigate to={'../'} replace />} />

      <Route path='/:roomId' element={<RoomPage />} />
    </Routes>
  );
}
