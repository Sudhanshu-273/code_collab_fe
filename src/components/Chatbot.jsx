import React, { useState } from 'react';
import axios from '../api/axios';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleMessageSend = async () => {
    // Add user message to chat
    const userMessage = { message: inputText, role: 'user' };
    setMessages([...messages, userMessage]);
    setInputText('');

    try {
      // Make API request
      const response = await axios.post(
        '/api/v1/openai',
        {
          message: inputText,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      // Add bot response to chat
      const botResponse = response.data.data;
      const botMessage = { message: botResponse, role: 'system' };
      setMessages([...messages, botMessage]);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      // Handle error accordingly, such as setting error state or displaying an error message
    }
  };

  return (
    <div>
      <div
        style={{
          height: '400px',
          overflowY: 'scroll',
          border: '1px solid #ccc',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              padding: '5px',
              textAlign: msg.role === 'user' ? 'right' : 'left',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>
              {msg.role === 'user' ? 'You: ' : 'Bot: '}
            </span>
            {msg.message}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          type='text'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ flex: '1', marginRight: '10px', padding: '5px' }}
          placeholder='Type your message here...'
        />
        <button onClick={handleMessageSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;


// import React,{ useState } from 'react';
// import '../styles/Chatbot.css';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
//   TypingIndicator,
// } from '@chatscope/chat-ui-kit-react';
// import axios from 'axios';

// const API_KEY = ""

// const systemMessage = {
//   //  Explain things like you're talking to a software professional with 5 years of experience.
//   role: 'system',
//   content:
//     "Explain things like you're talking to a software professional with 2 years of experience.",
// };

// function Chatbot() {
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, I'm ChatGPT! Ask me anything!",
//       sentTime: 'just now',
//       sender: 'ChatGPT',
//     },
//   ]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: 'outgoing',
//       sender: 'user',
//     };

//     const newMessages = [...messages, newMessage];

//     setMessages(newMessages);

//     setIsTyping(true);
//     await processMessageToChatGPT(newMessages);
//   };

//   async function processMessageToChatGPT(chatMessages) {
//     // messages is an array of messages
//     // Format messages for chatGPT API
//     // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
//     // So we need to reformat

//     let apiMessages = chatMessages.map((messageObject) => {
//       let role = '';
//       if (messageObject.sender === 'ChatGPT') {
//         role = 'assistant';
//       } else {
//         role = 'user';
//       }
//       return { role: role, message: messageObject.message };
//     });

//     // Get the request body set up with the model we plan to use
//     // and the messages which we formatted above. We add a system message in the front to'
//     // determine how we want chatGPT to act.
//     const apiRequestBody = {
//       message: [
//         systemMessage, // The system message DEFINES the logic of our chatGPT
//         ...apiMessages, // The messages from our chat with ChatGPT
//       ],
//     };
//     console.log(apiRequestBody);

//     // await fetch('/api/v1/openai', {
//     //   method: 'POST',
//     //   body: JSON.stringify("add two numbers in cpp"),
//     // })
//     //   .then((data) => {
//     //     return data.json();
//     //   })
//     //   .then((data) => {
//     //     console.log(data);
//     //     setMessages([
//     //       ...chatMessages,
//     //       {
//     //         message: data.choices[0].message.content,
//     //         sender: 'ChatGPT',
//     //       },
//     //     ]);
//     //     setIsTyping(false);
//     //   });

//     async function fetchData() {
//       console.log("hii")
//       try {
//         const response = await axios.post('/api/v1/openai', {
//           message: "add two numbers in cpp"
//         });

//         const data = response.data;
//         console.log(data);

//         setMessages([
//           ...chatMessages,
//           {
//             message: data.choices[0].message.content,
//             sender: 'ChatGPT',
//           },
//         ]);

//         setIsTyping(false);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//         // Handle error accordingly, such as setting error state or displaying an error message
//       }
//     }

//     fetchData();
//   }

//   return (
//     <div className='Chatbot'>
//       <div style={{borderRadius: '50px', position: 'relative', height: '400px', width: '400px' }}>
//         <MainContainer>
//           <ChatContainer >
//             <MessageList
//               scrollBehavior='smooth'
//               typingIndicator={
//                 isTyping ? (
//                   <TypingIndicator content='ChatGPT is typing' />
//                 ) : null
//               }
//             >
//               {messages.map((message, i) => {
//                 console.log(message);
//                 return <Message key={i} model={message} />;
//               })}
//             </MessageList>
//             <MessageInput placeholder='Type message here' onSend={handleSend} />
//           </ChatContainer>
//         </MainContainer>
//       </div>
//      </div>
//   );
// }

// export default Chatbot;

// import React, { useState } from 'react';
// import axios from '../api/axios';

// function ChatBot() {
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');

//   const handleMessageSend = async () => {
//     // Add user message to chat
//     const userMessage = { message: inputText, role: 'user' };
//     setMessages([...messages, userMessage]);
//     setInputText('');

//     try {
//       // Make API request
//       const response = await axios.post(
//         '/api/v1/openai',
//         {
//           message: inputText,
//         },
//         { withCredentials: true }
//       );
//       console.log(response.data);
//       // Add bot response to chat
//       const botResponse = response.data.data;
//       const botMessage = { message: botResponse, role: 'system' };
//       setMessages([...messages, botMessage]);
//     } catch (error) {
//       console.error('Error fetching data:', error.message);
//       // Handle error accordingly, such as setting error state or displaying an error message
//     }
//   };

//   return (
//     <div>
//       <div
//         style={{
//           height: '400px',
//           overflowY: 'scroll',
//           border: '1px solid #ccc',
//         }}
//       >
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             style={{
//               padding: '5px',
//               textAlign: msg.role === 'user' ? 'right' : 'left',
//             }}
//           >
//             <span style={{ fontWeight: 'bold' }}>
//               {msg.role === 'user' ? 'You: ' : 'Bot: '}
//             </span>
//             {msg.message}
//           </div>
//         ))}
//       </div>
//       <div style={{ display: 'flex', marginTop: '10px' }}>
//         <input
//           type='text'
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           style={{ flex: '1', marginRight: '10px', padding: '5px' }}
//           placeholder='Type your message here...'
//         />
//         <button onClick={handleMessageSend}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default ChatBot;


