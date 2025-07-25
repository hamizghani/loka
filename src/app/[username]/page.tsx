"use client";

import Image from 'next/image';
import Post from '@/components/Post';
import UserSuggestion from '@/components/Profileholder1';

interface ProfilePageProps {
  params: {
    username: string;
  };
}

// Star tier types
type StarTier = "shining" | "platinum" | "gold" | "trusted";

// Mock user data
const mockUserData = {
  demorghan: {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    username: "demorghan",
    handle: "podiapo",
    bio: "Full-stack developer passionate about creating amazing user experiences. Coffee enthusiast ☕ | Tech blogger | Open source contributor",
    location: "San Francisco, CA",
    website: "https://demorghan.dev",
    joinDate: "March 2020",
    following: 428,
    followers: 1240,
    verified: true,
    starTier: "shining" as StarTier,
    posts: [
      {
        id: 1,
        content: "Just shipped a new feature that reduces load time by 40%! The key was optimizing our database queries and implementing proper caching strategies. #webdev #performance",
        timestamp: "2h",
        replies: 23,
        upvotes: 142,
        downvotes: 3,
        views: 2140
      },
      {
        id: 2,
        content: "Hot take: The best code is not the cleverest code, but the code that your teammates can understand and maintain 6 months from now. Readability > Cleverness",
        timestamp: "5h",
        replies: 67,
        upvotes: 234,
        downvotes: 12,
        views: 3580
      },
      {
        id: 3,
        content: "Working on a new React component library. Should I go with TypeScript from the start or migrate later? Looking for experiences from the community 🤔",
        timestamp: "1d",
        replies: 45,
        upvotes: 89,
        downvotes: 2,
        views: 1650
      },
      {
        id: 4,
        content: "Finally published my article on 'Building Scalable APIs with Node.js'. Covers everything from architecture patterns to deployment strategies. Link in bio!",
        timestamp: "2d",
        replies: 34,
        upvotes: 156,
        downvotes: 5,
        views: 2890
      }
    ]
  }
};

  // Star tier badge renderer
  const renderStarBadge = (tier: StarTier) => {
    const tierConfig = {
      shining: {
        label: "Shining Star",
        gradient: "from-yellow-400 via-orange-400 to-red-500",
        textColor: "text-white",
        shadow: "shadow-lg"
      },
      platinum: {
        label: "Platinum Star",
        gradient: "from-gray-300 via-gray-100 to-gray-300",
        textColor: "text-gray-800",
        shadow: "shadow-md"
      },
      gold: {
        label: "Gold Star",
        gradient: "from-yellow-500 via-yellow-400 to-yellow-600",
        textColor: "text-white",
        shadow: "shadow-md"
      },
      trusted: {
        label: "Trusted Star",
        gradient: "from-blue-500 via-blue-400 to-blue-600",
        textColor: "text-white",
        shadow: "shadow-sm"
      }
    };

    const config = tierConfig[tier];
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r ${config.gradient} ${config.textColor} text-sm font-medium rounded-full ${config.shadow}`}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        {config.label}
      </span>
    );
  };

export default function ProfilePage({ params }: ProfilePageProps) {
  const userData = mockUserData[params.username as keyof typeof mockUserData];
  
  // If user not found, show 404-like content
  if (!userData) {
    return (
      <div className="ml-20 flex">
        <div className="flex-3 bg-white h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">User not found</h1>
            <p className="text-gray-600">The user @{params.username} doesn't exist.</p>
          </div>
        </div>
        {/* Keep the right sidebar */}
        <div className="flex-2 bg-blue-200 h-screen flex flex-col">
          <div className="flex-1 bg-gray-100 p-4 border-b border-gray-300">
            <h2 className="text-xl font-bold text-gray-800 mb-4">For You</h2>
          </div>
          <div className="flex-1 bg-white p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">People to Connect</h2>
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

  return (
    <div className="ml-20 flex">
      {/* Main Profile Content */}
      <div className="flex-3 bg-white h-screen overflow-y-auto">
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          {/* Profile Info */}
          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="relative -mt-16 mb-4 flex justify-center">
              <Image
                src={userData.avatar}
                alt={userData.username}
                width={128}
                height={128}
                className="rounded-full border-4 border-white shadow-lg"
              />
              {userData.verified && (
                <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* User Info - Centered */}
            <div className="mb-4 text-center">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                {userData.username}
                {userData.verified && (
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </h1>
              <p className="text-gray-600">@{userData.handle}</p>
              
              {/* Star Tier Label */}
              {userData.starTier && (
                <div className="mt-2 flex justify-center">
                  {renderStarBadge(userData.starTier)}
                </div>
              )}
            </div>

            {/* Bio - Centered */}
            <p className="text-gray-800 mb-4 leading-relaxed text-center max-w-2xl mx-auto">{userData.bio}</p>

            {/* Meta Info - Centered */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-4">
              {userData.location && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {userData.location}
                </div>
              )}
              {userData.website && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656L13.828 15.828a4 4 0 00.172-5.656" />
                  </svg>
                  <a href={userData.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                    {userData.website.replace('https://', '')}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Joined {userData.joinDate}
              </div>
            </div>

            {/* Follow Stats - Centered */}
            <div className="flex justify-center gap-6 text-sm">
              <div>
                <span className="font-bold text-gray-900">{userData.following.toLocaleString()}</span>
                <span className="text-gray-600 ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">{userData.followers.toLocaleString()}</span>
                <span className="text-gray-600 ml-1">Followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="border-t border-gray-200">
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Posts</h2>
          </div>
          
          {/* User Posts */}
          {userData.posts.map((post) => (
            <Post
              key={post.id}
              avatar={userData.avatar}
              username={userData.username}
              handle={userData.handle}
              timestamp={post.timestamp}
              content={post.content}
              replies={post.replies}
              upvotes={post.upvotes}
              downvotes={post.downvotes}
              views={post.views}
            />
          ))}
        </div>
      </div>

      {/* Right Sidebar - Same as homepage */}
      <div className="flex-2 bg-blue-200 h-screen flex flex-col">
        {/* Top half - For You section */}
        <div className="flex-1 bg-gray-100 p-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-gray-800 mb-4">For You</h2>
        </div>
        
        {/* Bottom half - People to Connect section */}
        <div className="flex-1 bg-white p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">People to Connect</h2>
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
            <UserSuggestion 
              avatar="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face"
              username="Alex Rivera"
              handle="alexcodes"
              verified={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}