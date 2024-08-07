'use client'
import React, { useState } from 'react';
import { FaUserCircle, FaRobot } from 'react-icons/fa';
import { FaArrowTurnUp } from 'react-icons/fa6';
import { GoPlusCircle } from 'react-icons/go';
import { useChat } from 'ai/react';
import { EmptyScreen } from './compound/empty-screen';
const exampleMessages = [
  {
    heading: 'What are the',
    subheading: 'trending memecoins today?',
    message: 'What are the trending memecoins today?'
  },
  {
    heading: 'What is the price of',
    subheading: '$DOGE right now?',
    message: 'What is the price of $DOGE right now?'
  },
  {
    heading: 'I would like to buy',
    subheading: '42 $DOGE',
    message: 'I would like to buy 42 $DOGE'
  },
  {
    heading: 'What are some',
    subheading: 'recent events about $DOGE?',
    message: 'What are some recent events about $DOGE?'
  }
];

function MessageList({ onSelect }) {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleItemClick = (message) => {
    setSelectedMessage(message);
    onSelect(message.message); 
  };

  return (
    <div className="grid grid-cols-2 gap-4 my-4">
      {exampleMessages.map((message, index) => (
        <div
          key={index}
          className={`cursor-pointer rounded-lg border bg-black p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 ${
            selectedMessage === message ? 'text-white' : 'text-red'
          }`}
          onClick={() => handleItemClick(message)}
        >
          <div className="text-sm font-semibold">{message.heading}</div>
          <div className="text-sm text-zinc-600">{message.subheading}</div>
        </div>
      ))}
    </div>
  );
}



export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const handleSelectMessage = (message) => {
    handleInputChange({ target: { value: message } });
  };

  const handleStartNewSession = (event) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <div className="flex flex-col w-1/2 py-24 mx-auto stretch">
      {messages.length > 0 ? (
        <>
          {messages.map((m, index) => (
            <React.Fragment key={m.id}>
              <div
                className={`whitespace-pre-wrap p-2 my-2 border rounded ${
                  m.role === 'user' ? 'self-start text-right' : 'self-start text-left text-white'
                } text-medium font-small font-sans`}
              >
                {m.role === 'user' ? <FaUserCircle className="inline mr-2" /> : <FaRobot className="inline mr-2" />}
                {m.content}
              </div>
              {index < messages.length - 1 && <hr className="border-t border-gray-300 my-2" />} {/* Line separator outside the text */}
            </React.Fragment>
          ))}
        </>
      ) : (
        <>
          <EmptyScreen />
          <MessageList onSelect={handleSelectMessage} />
        </>
      )}
      <form onSubmit={handleSubmit} className="fixed bottom-0 w-1/2 p-2 mb-8 flex items-center">
        <div className="flex flex-1 border border-gray-300 rounded shadow-xl">
          <button
            type="button"
            onClick={handleStartNewSession}
            className="p-2 bg-gray-600 rounded-r-md hover:text-green-600 focus:text-blue-700 focus:outline-none"
          >
            <GoPlusCircle />
          </button>
          <input
            className="flex-1 p-2 bg-black text-white rounded-l-md focus:outline-none"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="p-2 bg-gray-600 rounded-r-md hover:text-green-600 focus:text-blue-700 focus:outline-none"
          >
            <FaArrowTurnUp />
          </button>
        </div>
      </form>
    </div>
  );
}
