import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { initSocket } from '../../hooks/initSocket';
import { ACTIONS } from '../../constants';
import Editor from './Editor';
import Config from './Config';

export default function RoomPage() {
      const socketRef = useRef(null);

      const navigate = useNavigate();
      const location = useLocation();
      const [selectedTheme, setSelectedTheme] = React.useState('monokai');
      const [selectedLanguage, setSelectedLanguage] = React.useState('C++');
      const { roomId } = useParams();
      const [code, setCode] = React.useState(`#include<bits/stdc++.h>
using namespace std;
  
int main() {
  ios_base::sync_with_stdio(0);
  cin.tie(0); cout.tie(0);  
  cout<<"Welcome to Code Collab :)";
  return 0;
}`);
      const [output, setOutput] = React.useState('');
      const [input, setInput] = React.useState('');
      // const [isFullScreen, setIsFullScreen] = React.useState(false);
      const [Clients, setClients] = React.useState([]);
      // useEffect(() => {
      //   socketRef.current.emit('editorConfigChange', {
      //     roomId: params.roomId,
      //     config: {
      //       selectedTheme,
      //       selectedLanguage,
      //       code,
      //       isFullScreen,
      //       input,
      //       output,
      //       isRunCodeLoading,
      //     },
      //   });
      // }, [
      //   isRunCodeLoading,
      //   isFullScreen,
      //   input,
      //   output,
      //   code,
      //   selectedLanguage,
      //   selectedTheme,
      // ]);
      // useEffect(() => {
      //   socketRef.current.on('editorConfigChange', (data) => {
      //     // console.log(data);
      //     setSelectedTheme(data?.selectedTheme);
      //     setSelectedLanguage(data?.selectedLanguage);
      //     setCode(data?.code);
      //     setIsFullScreen(data?.isFullScreen);
      //     setInput(data?.input);
      //     setOutput(data?.output);
      //     setIsRunCodeLoading(data?.isRunCodeLoading);
      //   });
      // }, [socketRef.current, roomId]);

      // useEffect(() => {
      //   return () => {
      //     socketRef.current.emit('removeUser');
      //   };
      // }, []);

      // useEffect(() => {
      //   const temp = async () => {
      //     try {
      //       const { data } = await axios.post(GET_ROOM_USERS, {
      //         roomId: params.roomId,
      //       });

      //       // if (data?.length === 0) {
      //       // toast.error('Room does not exist');
      //       // navigate('/code-room');
      //       // } else {
      //       // toast.error('Join room with room id ' + params.roomId);
      //       // navigate('/code-room');
      //       // console.log(data);
      //       socketRef.current.emit('joinRoom', {
      //         roomId: params.roomId,
      //         username: auth?.username || 'Anonymous',
      //       });
      //       // }
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   };
      //   temp();
      // }, [auth]);

      useEffect(() => {
            const init = async () => {
                  socketRef.current = await initSocket();

                  socketRef.current.on('connect_error', (err) => handleErrors(err));
                  socketRef.current.on('connect_failed', (err) => handleErrors(err));

                  function handleErrors(e) {
                        console.log('Socket Error', e);
                        toast.error('Socket connection failed, try again later.');
                        navigate('/');
                  }

                  socketRef.current.emit(ACTIONS.JOIN, {
                        RoomId: roomId,
                        UserName: location.state?.UserName,
                  });

                  //listening for join event

                  socketRef.current.on(
                        ACTIONS.JOINED,
                        ({ clients, UserName, socketID }) => {
                              if (UserName !== location.state?.UserName) {
                                    toast.success(UserName + ' joined the Room');
                                    console.log(UserName, ' joined');
                              }
                              setClients(clients);
                              // console.log(clients);
                              socketRef.current.emit(ACTIONS.SYNC_CODE, {
                                    code,
                                    socketID,
                              });
                        }
                  );

                  socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, UserName }) => {
                        toast.success(UserName + ' left the room.');
                        setClients((prev) => {
                              return prev.filter((client) => client.socketID !== socketId);
                        });
                  });
            };
            init();

            return () => {
                  socketRef?.current.disconnect();
                  socketRef?.current.off(ACTIONS.JOINED);
                  socketRef?.current.off(ACTIONS.DISCONNECTED);
            };
      }, []);

      const copyRoomId = async () => {
            try {
                  await navigator.clipboard.writeText(roomId);
                  toast.success('Room Id copied');
            } catch (err) {
                  toast.error('Could not copy Room Id');
            }
      };



      async function leaveRoom() {
            navigate('/');
      }

      if (!location.state) {
            toast.error('Join room with room id ' + roomId);
            return <Navigate to='/code-room' replace />;
      }

      useEffect(() => {
            document.querySelector(
                  '.CodeMirror'
            ).classList = `CodeMirror cm-s-${selectedTheme}`;
      }, [selectedTheme]);

      return (
            <>
                  <Helmet>
                        <title>{`${roomId} - Code Room`}</title>
                  </Helmet>
                  <div
                        style={{
                              height: 'calc(100vh - 84px)',
                              background: '#272822',
                        }}
                        className='w-full flex justify-center items-center text-white '
                  >
                        <div
                              style={{
                                    borderRight: '3px solid #9333EA',
                              }}
                              className='h-full w-2/12 flex flex-col justify-between gap-4 p-4'
                        >
                              <div className='flex flex-col gap-8'>
                                    <h2 className='text-2xl'>CONNECTED</h2>

                                    <div className='flex flex-wrap gap-2'>
                                          {Clients.map((client) => (
                                                <Client key={client.socketID} username={client.UserName} />
                                          ))}
                                    </div>
                              </div>
                              <div className='flex flex-col gap-2'>
                                    <button
                                          style={{
                                                backgroundColor: '#9333EA',
                                          }}
                                          className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                                          onClick={copyRoomId}
                                    >
                                          {' '}
                                          Copy Room ID
                                    </button>
                                    <button
                                          style={{
                                                backgroundColor: '#9333EA',
                                          }}
                                          className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                                          onClick={leaveRoom}
                                    >
                                          {' '}
                                          Leave
                                    </button>
                              </div>
                        </div>
                        <div className='h-full w-10/12 flex justify-between'>
                              <Editor
                                    socketRef={socketRef}
                                    RoomId={roomId}
                                    onCodeChange={(code) => {
                                          setCode(code);
                                    }}
                                    selectedTheme={selectedTheme}
                              />

                              {/* <div 
          style={{
            borderLeft : "3px solid #9333EA",
          }}
          className='flex flex-col p-4 w-4/12'>
            <h4>Input:</h4>
            <div className='flex flex-col'>
              <textarea
                id='code-inp'
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
              <button
                className='btn std-input-btn'
                // onClick={() => compile()}
              >
                Run
              </button>
            </div>
            <h4>Output:</h4>
            {loading ? (
              <pre>
                <h4>LOADING...</h4>
              </pre>
            ) : (
              <div className='output-box'>
                <pre>{output}</pre>
                <button
                  onClick={() => {
                    clearOutput();
                  }}
                  className='btn clear-btn'
                >
                  Clear
                </button>
              </div>
            )}
          </div> */}

                              <Config
                                    input={input}
                                    setInput={setInput}
                                    output={output}
                                    setOutput={setOutput}
                                    setSelectedTheme={setSelectedTheme}
                                    selectedTheme={selectedTheme}
                                    selectedLanguage={selectedLanguage}
                                    setSelectedLanguage={setSelectedLanguage}
                                    code={code}
                              />
                        </div>
                  </div>
            </>
      );
}

const Client = ({ username }) => {
      const location = useLocation();
      return (
            <div
                  style={{
                        color: 'powderblue',
                        width: '50px'
                  }}
                  className='flex flex-col gap-1 items-center justify-start '
            >
                  <div
                        className='rounded-lg text-lg font-semibold'
                        style={{
                              width: '34px',
                              height: '34px',
                              backgroundColor: '#9333EA',
                              color: '#282A36',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                        }}
                  >{
                              username.substring(0, 1)
                        }</div>
                  <span title={username} className='text-xs text-ellipsis'>{username.length < 10 ? username : `${username.substring(0, 6)}...`}</span>
                  <span className='text-xxs'>{username === location.state?.UserName ? '(You)' : ''}</span>
            </div>
      );
};
