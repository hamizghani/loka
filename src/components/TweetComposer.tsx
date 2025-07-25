'use client';

import Image from 'next/image';
import { FiImage, FiSmile } from 'react-icons/fi';
import { FaMicrophone } from 'react-icons/fa';
import { useState } from 'react';

// Define the type for the props this component will receive
interface TweetComposerProps {
  onPostSubmit: (content: string) => void;
}

const TweetComposer = ({ onPostSubmit }: TweetComposerProps) => {
  const [tweet, setTweet] = useState('');

  const handlePostClick = () => {
    // Prevent posting empty tweets
    if (!tweet.trim()) return;

    // Call the function passed from the parent component
    onPostSubmit(tweet);

    // Clear the input box after posting
    setTweet('');
  };

  return (
    <div
      className="rounded-lg border border-gray-200 p-4 transition-all duration-300 ease-in-out hover:border-gray-300 hover:shadow-lg focus-within:border-blue-400 focus-within:shadow-xl"
    >
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <Image
            src="https://pbs.twimg.com/profile_images/1668563583205257216/V65fj04d_400x400.jpg" // Replace with your actual user profile pic
            alt="Profile Picture"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <textarea
            className="w-full resize-none bg-transparent text-xl text-gray-800 placeholder-gray-500 focus:outline-none"
            placeholder="What's happening?"
            rows={2}
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          ></textarea>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-2 text-red-400 sm:space-x-4">
              <button className="transform p-2 text-xl transition-transform duration-200 ease-out hover:scale-125 hover:text-red-600">
                <FiImage />
              </button>
              <button className="transform p-2 text-xl transition-transform duration-200 ease-out hover:scale-125 hover:text-red-600">
                <FaMicrophone />
              </button>
              <button className="transform p-2 text-xl transition-transform duration-200 ease-out hover:scale-125 hover:text-red-600">
                <FiSmile />
              </button>
            </div>
            <button
              onClick={handlePostClick} // <-- Add the onClick handler here
              className="transform rounded-full bg-red-500 px-6 py-2 font-bold text-white transition-transform duration-200 hover:scale-105 hover:bg-red-600 disabled:scale-100 disabled:opacity-50"
              disabled={!tweet.trim()}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetComposer;