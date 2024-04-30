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

  return (
    <div className="com-container"> {/* Add container */}
      <input
        type='text'
        placeholder='Create Room Code'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="com-input-field"
      />
      <button className='com-button' onClick={handleJoinRoom}>Join</button>
    </div>
  );
}



// import React, { useState, useCallback } from 'react';
// import Communicate from '../../components/Communicate';
// import { Route, Routes } from 'react-router';
// import { useNavigate } from 'react-router-dom';

// export default function CommunicatePage() {
//   const [value, setValue] = useState();
//   const navigate= useNavigate();
// //   const handleJoinRoom = useCallback(()=>{
// //     navigate(`/room/${value}`)
// //   },[navigate,value]);
// const handleJoinRoom = useCallback(()=>{
//     const newPageUrl= `/communicate/${value}`;
//     window.open(newPageUrl, "_blank");
//   },[value]);
//   return (
//     <div>
//       <input
//         type='text'
//         placeholder='Enter Room Code'
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//       />
//       <button onClick={handleJoinRoom}>Join</button>
//     </div>
//   );
// }
