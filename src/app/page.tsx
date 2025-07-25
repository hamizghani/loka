'use client';

import { useState } from 'react';
import Post from '@/components/Post';
import GlassmorphSearchBar from '@/components/GlassmorphSearchBar';
import UserSuggestion from '@/components/Profileholder1';
import PopularContent from '@/components/PopularComponent';
import TweetComposer from '@/components/TweetComposer';
import { PostType } from '@/types/index'; // Import the updated PostType

// Updated initial posts data to match the PostType interface
const initialPosts: PostType[] = [
    {
        id: 1,
        avatar: "https://pbs.twimg.com/profile_images/1867880506429513728/UhisJr___400x400.jpg",
        username: "demorghan",
        handle: "podiapo",
        timestamp: "Jul 17",
        content: "This is a sample post content.",
        replies: 10,
        retweets: 5,
        upvotes: 25,
        downvotes: 2,
        views: 100,
        isVerified: true,
    },
    {
        id: 2,
        avatar: "https://pbs.twimg.com/profile_images/1867880506429513728/UhisJr___400x400.jpg",
        username: "demorghan",
        handle: "podiapo",
        timestamp: "Jul 16",
        content: "Here is another example post, showing how the list works.",
        replies: 15,
        retweets: 8,
        upvotes: 80,
        downvotes: 1,
        views: 150,
        isVerified: true,
    },
];

export default function HomePage() {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);

  // This function creates a new post object with all the required fields
  const handleAddPost = (content: string) => {
    const newPost: PostType = {
      id: Date.now(), // Use a timestamp for a simple unique ID
      // This data should come from the currently logged-in user
      // Using placeholders for now:
      avatar: "https://pbs.twimg.com/profile_images/1668563583205257216/V65fj04d_400x400.jpg", 
      username: "vdel",
      handle: "yourhandle",
      isVerified: false, // Or true if the current user is verified
      //---------------------------------------------------------
      timestamp: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date()),
      content: content,
      // New posts always start with 0 stats
      replies: 0,
      retweets: 0,
      upvotes: 0,
      downvotes: 0,
      views: 0
    };

    // Add the new post to the beginning of the posts array
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="ml-20 flex">
        <div className="flex-3 h-screen bg-white">
            <GlassmorphSearchBar />
            <TweetComposer onPostSubmit={handleAddPost} />

            {/* Now we map over the posts and pass all the correct props */}
            <div className="flex flex-col">
              {posts.map((post) => (
                <Post
                  key={post.id}
                  avatar={post.avatar}
                  username={post.username}
                  handle={post.handle}
                  timestamp={post.timestamp}
                  content={post.content}
                  replies={post.replies}
                  retweets={post.retweets} // Pass retweets
                  upvotes={post.upvotes}
                  downvotes={post.downvotes}
                  views={post.views}
                  isVerified={post.isVerified} // Pass isVerified
                />
              ))}
            </div>
        </div>
        <div className="flex-2 flex h-screen flex-col bg-blue-200">
            {/* ... rest of your JSX remains the same ... */}
            <div className="flex-1 border-b border-gray-300 bg-gray-100 p-4">
                <h2 className="mb-4 text-xl font-bold text-gray-800">For You</h2>
                {/* <PopularContent /> */}
            </div>
            
            <div className="flex-1 bg-white p-4">
                <h2 className="mb-4 text-xl font-bold text-gray-800">People to Connect</h2>
                <div className="space-y-2">
                    <UserSuggestion 
                        avatar="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face"
                        username="Sarah Chen"
                        handle="sarahdesigns"
                        verified={true}
                    />
                    <UserSuggestion 
                        avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                        username="Mike Johnson"
                        handle="mikejdev"
                    />
                </div>
            </div>
        </div>
    </div>
  );
}