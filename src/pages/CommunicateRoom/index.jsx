import React from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage = () => {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appId = 2080386242;
    const serverSecret = '747133ee607e01156a9b6734daac9001';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      Date.now().toString(), //userId
      'Nishant Mishra'
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    await zc.joinRoom({ 
        container: element,
        sharedLinks: [{
            name: 'Copy Link',
            url: `http://localhost:3000/communicate/${roomId}`,
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
