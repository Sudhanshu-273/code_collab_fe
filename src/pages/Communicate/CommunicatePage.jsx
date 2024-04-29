import React, { useState, useCallback } from 'react';
import Communicate from '../../components/Communicate';
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';

export default function CommunicatePage() {
  const [value, setValue] = useState();

  const handleJoinRoom = useCallback(()=>{
    navigate(`/room/${value}`)
  },[navigate,value]);
  return (
    <div>
      <input
        type='text'
        placeholder='Enter Room Code'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join</button>
    </div>
  );
}
