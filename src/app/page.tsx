'use client';

import { useState } from 'react';
import Post from '@/components/Post';
import GlassmorphSearchBar from '@/components/GlassmorphSearchBar';
import UserSuggestion from '@/components/Profileholder1';
import PopularContent from '@/components/PopularComponent';
import TweetComposer from '@/components/TweetComposer';
import { PostType } from '@/types/index'; // Import the updated PostType

// Sample data for the "For You" carousel
const forYouItems = [
    { id: 1, title: "Trending Topic 1", description: "Description for trending topic 1", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=100&fit=crop" },
    { id: 2, title: "Trending Topic 2", description: "Description for trending topic 2", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=100&fit=crop" },
    { id: 3, title: "Trending Topic 3", description: "Description for trending topic 3", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=150&h=100&fit=crop" },
    { id: 4, title: "Trending Topic 4", description: "Description for trending topic 4", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=100&fit=crop" },
    { id: 5, title: "Trending Topic 5", description: "Description for trending topic 5", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=100&fit=crop" },
    { id: 6, title: "Trending Topic 6", description: "Description for trending topic 6", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=150&h=100&fit=crop" },
    { id: 7, title: "Trending Topic 7", description: "Description for trending topic 7", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=150&h=100&fit=crop" },
    { id: 8, title: "Trending Topic 8", description: "Description for trending topic 8", image: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=150&h=100&fit=crop" },
    { id: 9, title: "Trending Topic 9", description: "Description for trending topic 9", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&h=100&fit=crop" },
    { id: 10, title: "Trending Topic 10", description: "Description for trending topic 10", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=150&h=100&fit=crop" },
];

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
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

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

  // Function to get current carousel items (2 items at a time)
  const getCurrentCarouselItems = () => {
    const startIndex = currentCarouselIndex * 2;
    return forYouItems.slice(startIndex, startIndex + 2);
  };

  // Function to navigate carousel
  const nextCarouselSlide = () => {
    setCurrentCarouselIndex((prev) => 
      prev >= Math.ceil(forYouItems.length / 2) - 1 ? 0 : prev + 1
    );
  };

  const prevCarouselSlide = () => {
    setCurrentCarouselIndex((prev) => 
      prev <= 0 ? Math.ceil(forYouItems.length / 2) - 1 : prev - 1
    );
  };

  const totalSlides = Math.ceil(forYouItems.length / 2);

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
        <div className="flex-2 flex h-screen flex-col bg-red-200">
            {/* For You section with carousel */}
            <div className="flex-1 border-b border-gray-300 bg-gray-100 flex flex-col">
                <h2 className="p-4 pb-2 text-xl font-bold text-gray-800">For You</h2>
                
                {/* Carousel Container - Full Height */}
                <div className="relative flex-1">
                    {/* Carousel Items Container - Full Height */}
                    <div className="h-full overflow-hidden">
                        <div className="flex h-full gap-2 p-2">
                            {getCurrentCarouselItems().map((item) => (
                                <div key={item.id} className="flex-1 rounded-lg overflow-hidden relative group cursor-pointer">
                                    {/* Background Image with Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    
                                    {/* Text Overlay */}
                                    <div className="absolute inset-0 z-20 p-4 flex flex-col justify-end">
                                        <h3 className="font-bold text-lg text-white mb-2 drop-shadow-lg">{item.title}</h3>
                                        <p className="text-sm text-white text-opacity-90 drop-shadow-md">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Modern Navigation Buttons */}
                    <button 
                        onClick={prevCarouselSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white rounded-lg w-10 h-10 flex items-center justify-center transition-all duration-200 z-30"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button 
                        onClick={nextCarouselSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white rounded-lg w-10 h-10 flex items-center justify-center transition-all duration-200 z-30"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        
                    </button>
                </div>
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