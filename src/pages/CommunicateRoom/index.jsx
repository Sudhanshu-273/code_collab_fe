import React from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage = () => {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appId = 918103093;
    const serverSecret = '39febf6cd2a52fa8acd7b863f14a45be';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      Date.now().toString(), //userId
      'User1'
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    await zc.joinRoom({ 
        container: element,
        sharedLinks: [{
            name: 'Copy Link',
            url: `http://localhost:5173/communicate/${roomId}`,
        }],
        scenario:{
            mode: ZegoUIKitPrebuilt.GroupCall,
        },
        showScreenSharingButton: true,
     });

  };
  return <div>
    <div ref={myMeeting}/>
  </div>;
};

export default RoomPage;
