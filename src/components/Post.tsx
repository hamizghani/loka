/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { MessageCircle, Repeat2, ChevronUp, ChevronDown, BarChart3, Bookmark, Share, MoreHorizontal } from 'lucide-react';

interface PostProps {
  avatar?: string;
  username?: string;
  handle?: string;
  timestamp?: string;
  content?: string;
  replies?: number;
  retweets?: number;
  upvotes?: number;
  downvotes?: number;
  views?: number;
  isVerified?: boolean;
  image?: string; // Add image prop
}

const MAX_CONTENT_LENGTH = 200;

const Post: React.FC<PostProps> = ({
  avatar = "https://pbs.twimg.com/profile_images/1234567890/avatar.jpg",
  username = "demorghan",
  handle = "podiapo",
  timestamp = "Jul 17",
  content = "best birthday ever",
  replies = 4,
  retweets = 0,
  upvotes = 3,
  downvotes = 0,
  views = 477,
  isVerified = true,
  image
}) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(upvotes);
  const [downvoteCount, setDownvoteCount] = useState(downvotes);
  const [retweetCount, setRetweetCount] = useState(retweets);

  // For Read More
  const [showFullContent, setShowFullContent] = useState(false);

  const handleUpvote = () => {
    if (isDownvoted) {
      setIsDownvoted(false);
      setDownvoteCount(downvoteCount - 1);
    }
    setIsUpvoted(!isUpvoted);
    setUpvoteCount(isUpvoted ? upvoteCount - 1 : upvoteCount + 1);
  };

  const handleDownvote = () => {
    if (isUpvoted) {
      setIsUpvoted(false);
      setUpvoteCount(upvoteCount - 1);
    }
    setIsDownvoted(!isDownvoted);
    setDownvoteCount(isDownvoted ? downvoteCount - 1 : downvoteCount + 1);
  };

  const handleRetweet = () => {
    setIsRetweeted(!isRetweeted);
    setRetweetCount(isRetweeted ? retweetCount - 1 : retweetCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Content logic for "Read more"
  const isLongContent = content && content.length > MAX_CONTENT_LENGTH;
  const displayedContent = !isLongContent || showFullContent
    ? content
    : content?.slice(0, MAX_CONTENT_LENGTH);

  return (
    <div className="bg-white text-gray-900 border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            {avatar ? (
              <img src={avatar} alt={username} className="w-full h-full object-cover" />
            ) : (
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{username?.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-bold text-gray-900 hover:underline">{username}</span>
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
              <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </div>
          </div>

          {/* Tweet content */}
          <div className="mb-3">
            <p className="text-gray-900 whitespace-pre-wrap">
              {displayedContent}
              {isLongContent && !showFullContent && (
                <>
                  ...{" "}
                  <button
                    className="text-red-600 font-semibold hover:underline focus:outline-none"
                    onClick={e => {
                      e.stopPropagation();
                      setShowFullContent(true);
                    }}
                  >
                    Read more
                  </button>
                </>
              )}
            </p>
            {/* Only show image if not a long post or if expanded */}
            {image && (isLongContent || showFullContent) && (
              <img
                src={image}
                alt="Attached"
                className="mt-3 w-full rounded-2xl object-cover"
              />
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between max-w-md">
            {/* Reply */}
            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-red-100">
                <MessageCircle className="w-5 h-5" />
              </div>
              {replies > 0 && <span className="text-sm">{replies}</span>}
            </button>

            {/* Retweet */}
            <button 
              onClick={handleRetweet}
              className={`flex items-center space-x-2 transition-colors group ${
                isRetweeted ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-red-100">
                <Repeat2 className="w-5 h-5" />
              </div>
              {retweetCount > 0 && <span className="text-sm">{retweetCount}</span>}
            </button>

            {/* Upvote */}
            <button 
              onClick={handleUpvote}
              className={`flex items-center space-x-2 transition-colors group ${
                isUpvoted ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-red-100">
                <ChevronUp className={`w-5 h-5 ${isUpvoted ? 'fill-current' : ''}`} />
              </div>
              {upvoteCount > 0 && <span className="text-sm">{upvoteCount}</span>}
            </button>

            {/* Downvote */}
            <button 
              onClick={handleDownvote}
              className={`flex items-center space-x-2 transition-colors group ${
                isDownvoted ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-red-100">
                <ChevronDown className={`w-5 h-5 ${isDownvoted ? 'fill-current' : ''}`} />
              </div>
              {downvoteCount > 0 && <span className="text-sm">{downvoteCount}</span>}
            </button>

            {/* Views */}
            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-red-100">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-sm">{views}</span>
            </button>

            {/* Bookmark & Share */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleBookmark}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                } hover:bg-red-100`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-100 transition-colors">
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