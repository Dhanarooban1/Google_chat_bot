'use client';
import React, { useState, FunctionComponent } from 'react';
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

interface MessageListProps {
  onSelect: (message: string) => void;
}

const MessageList: FunctionComponent<MessageListProps> = ({ onSelect }) => {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const handleItemClick = (message: string) => {
    setSelectedMessage(message);
    onSelect(message);
  };

  return (
    <div className="grid grid-cols-2 gap-4 my-4">
      {exampleMessages.map((message, index) => (
        <div
          key={index}
          className={`cursor-pointer rounded-lg border p-4 transition-colors duration-200 ${
            selectedMessage === message.message
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
          }`}
          onClick={() => handleItemClick(message.message)}
        >
          <div className="text-sm font-semibold">{message.heading}</div>
          <div className="text-sm text-gray-400">{message.subheading}</div>
        </div>
      ))}
    </div>
  );
};

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  

  const handleSelectMessage = (message: string) => {
    handleInputChange({ target: { value: message } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleStartNewSession = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex-grow w-full max-w-2xl mx-auto px-4 py-8">
        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-3/4 p-3 rounded-lg ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-200'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {m.role === 'user' ? (
                      <FaUserCircle className="mr-2" />
                    ) : (
                      <FaRobot className="mr-2" />
                    )}
                    <span className="font-semibold">
                      {m.role === 'user' ? 'You' : 'AI'}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap" dangerouslySetInnerHTML = {{ __html: m.content }}></p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <EmptyScreen />
            <MessageList onSelect={handleSelectMessage} />
          </>
        )}
      </div>
      <div className="border-t border-gray-700 bg-gray-800 p-4">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex items-center">
          <button
            type="button"
            onClick={handleStartNewSession}
            className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <GoPlusCircle size={24} />
          </button>
          <input
            className="flex-grow mx-2 p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            placeholder="Type your message..."
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <FaArrowTurnUp size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}