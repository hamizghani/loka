"use client";

import React, { useState } from 'react';
import { MessageCircle, Repeat2, Heart, BarChart3, Bookmark, Share, MoreHorizontal } from 'lucide-react';

interface PostProps {
  avatar?: string;
  username?: string;
  handle?: string;
  timestamp?: string;
  content?: string;
  replies?: number;
  retweets?: number;
  likes?: number;
  views?: number;
  isVerified?: boolean;
}

const Post: React.FC<PostProps> = ({
  avatar = "https://pbs.twimg.com/profile_images/1234567890/avatar.jpg",
  username = "demorghan",
  handle = "podiapo",
  timestamp = "Jul 17",
  content = "best birthday ever",
  replies = 4,
  retweets = 0,
  likes = 3,
  views = 477,
  isVerified = true
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [retweetCount, setRetweetCount] = useState(retweets);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleRetweet = () => {
    setIsRetweeted(!isRetweeted);
    setRetweetCount(isRetweeted ? retweetCount - 1 : retweetCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="bg-black text-white border-b border-gray-800 p-4 hover:bg-gray-950 transition-colors cursor-pointer">
      <div className="flex space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
            {avatar ? (
              <img src={avatar} alt={username} className="w-full h-full object-cover" />
            ) : (
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black text-sm font-bold">{username?.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-bold text-white hover:underline">{username}</span>
            {isVerified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <span className="text-gray-500">@{handle}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 hover:underline">{timestamp}</span>
            <div className="ml-auto">
              <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-gray-300" />
            </div>
          </div>

          {/* Tweet content */}
          <div className="mb-3">
            <p className="text-white whitespace-pre-wrap">{content}</p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between max-w-md">
            {/* Reply */}
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-400 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-900/20">
                <MessageCircle className="w-5 h-5" />
              </div>
              {replies > 0 && <span className="text-sm">{replies}</span>}
            </button>

            {/* Retweet */}
            <button 
              onClick={handleRetweet}
              className={`flex items-center space-x-2 transition-colors group ${
                isRetweeted ? 'text-green-400' : 'text-gray-500 hover:text-green-400'
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-green-900/20">
                <Repeat2 className="w-5 h-5" />
              </div>
              {retweetCount > 0 && <span className="text-sm">{retweetCount}</span>}
            </button>

            {/* Like */}
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors group ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-400'
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-red-900/20">
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </div>
              {likeCount > 0 && <span className="text-sm">{likeCount}</span>}
            </button>

            {/* Views */}
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-400 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-900/20">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-sm">{views}</span>
            </button>

            {/* Bookmark & Share */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleBookmark}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked ? 'text-blue-400' : 'text-gray-500 hover:text-blue-400'
                } hover:bg-blue-900/20`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full text-gray-500 hover:text-blue-400 hover:bg-blue-900/20 transition-colors">
                <Share className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;