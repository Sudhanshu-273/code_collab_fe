import React, { useState } from 'react';
import axios from '../api/axios';
import '../styles/ChatBot.css';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleMessageSend = async () => {
    if (!inputText.trim()) return; // Don't send empty messages
    const userMessage = { message: inputText, role: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');

    try {
      const response = await axios.post(
        '/api/v1/openai',
        {
          message: inputText,
        },
        { withCredentials: true }
      );
      
      const botResponse = response.data.data;
      const botMessage = { message: botResponse, role: 'system' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      // Handle error accordingly, such as setting error state or displaying an error message
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleMessageSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role}`}
          >
            <pre>{msg.message}</pre>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type='text'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress} // Handle Enter key press
          className="input-field"
          placeholder='Type your message here...'
        />
        <button onClick={handleMessageSend} className="send-button">Send</button>
      </div>
    </div>
  );
}

export default ChatBot;







