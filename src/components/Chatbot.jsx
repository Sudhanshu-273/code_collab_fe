import React, { useState } from 'react';
import axios from '../api/axios';
import '../styles/ChatBot.css';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading status

  const handleMessageSend = async () => {
    if (!inputText.trim()) return; // Don't send empty messages
    const userMessage = { message: inputText, role: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setLoading(true); // Show loader
    // Temporary message indicating that the bot is typing
    const typingMessage = { message: 'Bot is typing...', role: 'system' };
    setMessages(prevMessages => [...prevMessages, typingMessage]);

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
      setMessages(prevMessages => [...prevMessages.slice(0, -1), botMessage]); // Replace the "Bot is typing" message with the bot's response
    } catch (error) {
      console.error('Error fetching data:', error.message);
      // Handle error accordingly, such as setting error state or displaying an error message
    } finally {
      setLoading(false); // Hide loader after response is received
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
            {/* Display user or bot label based on role */}
            <pre>{msg.role === 'user' ? <strong>You: </strong> : <strong>Bot: </strong>} {msg.message}</pre>
          </div>
        ))}
        {/* Show loader if loading is true */}
        {loading && <div className="loader"></div>}
      </div>
      <div className="input-container">
        <input
          type='text'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress} // Handle Enter key press
          className="input-field"
          placeholder='Message Bot here...'
        />
        <button onClick={handleMessageSend} className="send-button">Send</button>
      </div>
    </div>
  );
}

export default ChatBot;








