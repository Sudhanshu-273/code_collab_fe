import React, { useState, useCallback } from 'react';
import Communicate from '../../components/Communicate';
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
import '../../styles/CommunicatePage.css'

export default function CommunicatePage() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(() => {
    const newPageUrl = `/communicate/${value}`;
    window.open(newPageUrl, '_blank');
  }, [value]);
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleJoinRoom();
    }
  };

  return (
    <div className="com-container"> 
      <input
        type='text'
        placeholder='Create Room Code'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress} // Handle Enter key press
        className="com-input-field"
      />
      <button className='com-button' onClick={handleJoinRoom}>Join</button>
    </div>
  );
}
