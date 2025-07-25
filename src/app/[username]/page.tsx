"use client";

import Image from 'next/image';
import Link from 'next/link';
import Post from '@/components/Post';
import UserSuggestion from '@/components/Profileholder1';
import { useState } from 'react';
import type { PageProps } from 'next/types'; // Import PageProps from next/types

interface ProfilePageProps extends PageProps {
  params: {
    username: string;
  };
}

// Star tier types
type StarTier = "shining" | "platinum" | "gold" | "trusted";

// Mock user data
type UserPost = {
  id: number;
  avatar: string;
  username: string;
  handle: string;
  timestamp: string;
  content: string;
  image?: string;
  replies: number;
  retweets: number;
  upvotes: number;
  downvotes: number;
  views: number;
  isVerified: boolean;
};

const mockUserData: {
  [key: string]: {
    avatar: string;
    username: string;
    handle: string;
    bio: string;
    location: string;
    website: string;
    joinDate: string;
    following: number;
    followers: number;
    verified: boolean;
    starTier: StarTier;
    posts: UserPost[];
  }
} = {
  hamizghani: {
    avatar: "/images/image2.png",
    username: "Hamiz Ghani",
    handle: "hamizghani",
    bio: "Coffee enthusiast | Culture blogger | Study Together contributor",
    location: "Aceh, Indonesia",
    website: "https://demorghan.dev",
    joinDate: "March 2020",
    following: 428,
    followers: 1240,
    verified: false,
    starTier: "shining" as StarTier,
    posts: [
      {
        id: 2,
        avatar: "/images/image2.png",
        username: "Hamiz Ghani",
        handle: "hamizghani",
        timestamp: "Jul 24",
        content:
    `I&apos;m Hamiz, an Acehnese from Banda Aceh. Last week I joined a Saman dance workshop to celebrate Maulid Nabi. In a dim village hall, twenty of us sat cross‑legged on the floor, our palms raised in prayer. When the ustadz finished reciting, the leader signaled the beat—and suddenly, synchronized claps echoed like rolling thunder. I&apos;d practiced alone at home, but this was on another level: the dancers responded to each other without a single misstep.
    
    That afternoon, sweat dripped down my face as I matched each clap, each stomp, each turn, trying to keep pace. Our voices rose in chorus when the rhythm built, echoing off wooden walls and banana‑leaf ceilings. Watching the older men&apos;s expressions of devotion, I realized Saman is more than a performance—it&apos;s a communal prayer, a reminder that our faith binds us tighter than blood.
    
    Afterwards, we broke bread together: sweet pulut with serikaya, steaming coffee, and laughter. I left with callused palms and a full heart, determined to teach Saman to my younger cousins. In a world where traditions fade, I carry this dance in my skin, so that Acehnese youth remember the power of unity through rhythm.`,
        image: "/images/image31.png",
        replies: 8,
        retweets: 2,
        upvotes: 210,
        downvotes: 1,
        views: 2700,
        isVerified: false,
      },
    ]
  },
  gung: {
    avatar: "/images/image1.png",
    username: "Hamiz Ghani",
    handle: "hamiz ghani",
    bio: "Your friendly suroboyo guy",
    location: "Jakarta, Indonesia",
    website: "morcayne.tech",
    joinDate: "March 2020",
    following: 680,
    followers: 8904,
    verified: false,
    starTier: "trusted" as StarTier,
    posts: [
      {
        id: 1,
        avatar: "/images/image1.png",
        username: "Hamiz Ghani",
        handle: "hamizghaniiii",
        timestamp: "Jul 25",
        content:
    `I&apos;m Hamiz, a Surabayan now living in Jakarta. Every Idul Fitri, the city may be quieter, but my heart echoes with the sounds of kampung Surabaya—calls to prayer at dawn, the rustle of sarung, and the laughter of cousins preparing ketupat in the kitchen.

As a child, I remember helping my mother pound spices for opor ayam while my father arranged the sajadahs for family prayer. The scent of clove and lemongrass would drift through the house, mixing with the early morning breeze. Even now in Jakarta, I recreate those moments in my small apartment—boiling lontong, blending sambal, and video-calling my parents to make sure everything tastes just like home.

After sholat Ied, I visit friends from East Java scattered across the city. We share stories in logat Suroboyoan, swap childhood memories, and laugh over bowls of rawon and tahu tek. For a brief moment, Jakarta feels like Surabaya—familiar, warm, loud in all the right ways.

Each Lebaran, I&apos;m reminded that tradition isn&apos;t tied to place—it lives in us, in the way we speak, the dishes we cook, the prayers we recite. One day, I hope to pass on these pieces of Surabaya to my future children, so even far from kampung halaman, they&apos;ll always carry its spirit within them.`,
        replies: 14,
        retweets: 5,
        upvotes: 320,
        downvotes: 4,
        views: 4800,
        isVerified: true,
      },
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

  // For You carousel logic
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const forYouItems = [
    {
      id: 1,
      title: "Ethnicity",
      description: "Explore Indonesia's rich tapestry of over 1,300 ethnic groups and their unique customs.",
      image: "/images/image21.png"
    },
    {
      id: 2,
      title: "Food",
      description: "Savor the diverse flavors of Indonesian cuisine, from fiery rendang to sweet klepon.",
      image: "/images/image22.png"
    },
    {
      id: 3,
      title: "Language",
      description: "Discover the 700+ regional languages that shape Indonesia's cultural identity.",
      image: "/images/image23.png"
    },
    {
      id: 4,
      title: "Clothing",
      description: "Admire traditional attire like Batik, Kebaya, and Ulos that reflect local artistry.",
      image: "/images/image24.png"
    },
    {
      id: 5,
      title: "Festival",
      description: "Join vibrant celebrations such as Nyepi, Galungan, and Tabuik that unite communities.",
      image: "/images/image25.png"
    },
    {
      id: 6,
      title: "Religion",
      description: "Navigate Indonesia's islands and provinces, each boasting distinct landscapes and traditions.",
      image: "/images/image26.png"
    },
  ];
  const getCurrentCarouselItems = () => {
    const startIndex = currentCarouselIndex * 2;
    return forYouItems.slice(startIndex, startIndex + 2);
  };
  const totalSlides = Math.ceil(forYouItems.length / 2);
  const nextCarouselSlide = () => {
    setCurrentCarouselIndex((prev) =>
      prev >= totalSlides - 1 ? 0 : prev + 1
    );
  };
  const prevCarouselSlide = () => {
    setCurrentCarouselIndex((prev) =>
      prev <= 0 ? totalSlides - 1 : prev - 1
    );
  };
  
  // If user not found, show 404-like content
  if (!userData) {
    return (
      <div className="ml-20 flex">
        <div className="flex-3 bg-white h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">User not found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-20 flex">
      {/* Main Profile Content */}
      <div className="flex-3 bg-white min-h-screen">
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
              {/* Star Tier Label and View Culture Card Button */}
              {userData.starTier && (
                <div className="mt-2 flex justify-center items-center gap-3">
                  {renderStarBadge(userData.starTier)}
                  <Link href="/card" className="inline-block px-4 py-1.5 rounded-full bg-red-600 text-white font-semibold text-sm shadow hover:bg-red-700 transition ml-2">
                    View Culture Card
                  </Link>
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
          <div className="flex flex-col">
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
                image={post.image}
              />
            ))}
          </div>
        </div>
      </div>

      
      {/* Right Section */}
      <div className="flex-2 flex h-screen flex-col bg-red-200">
        {/* For You section with carousel */}
        <div className="flex-1 border-b border-gray-300 bg-gray-100 flex flex-col">
          <h2 className="p-4 pb-2 text-xl font-bold text-gray-800">For You</h2>
          <div className="relative flex-1">
            <div className="h-full overflow-hidden">
              <div className="flex h-full gap-2 p-2">
                {getCurrentCarouselItems().map((item) => (
                  <div key={item.id} className="flex-1 rounded-lg overflow-hidden relative group cursor-pointer aspect-[4/3]">
                    {/* Black background behind the image */}
                    <div className="absolute inset-0 bg-black z-0"></div>
                    {/* Background Image with reduced opacity */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-110 z-10 opacity-60"
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
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-40 hover:bg-opacity-60 text-red-600 rounded-full w-10 h-10 flex items-center justify-center shadow transition-all duration-200 z-30"
              aria-label="Previous"
            >
              {/* Left Arrow Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextCarouselSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-40 hover:bg-opacity-60 text-red-600 rounded-full w-10 h-10 flex items-center justify-center shadow transition-all duration-200 z-30"
              aria-label="Next"
            >
              {/* Right Arrow Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 bg-white p-4">
          <h2 className="mb-4 text-xl font-bold text-gray-800">People to Connect</h2>
          <div className="space-y-2">
            <UserSuggestion
              avatar="/images/image27.png"
              username="Sarah Chen"
              handle="sarahdesigns"
              verified={true}
            />
            <UserSuggestion
              avatar="/images/image1.png"
              username="Gung"
              handle="gung"
              verified={true}
            />
            <UserSuggestion
              avatar="/images/image5.png"
              username="Asep Haryadi"
              handle="asepharyadi"
            />
            <UserSuggestion
              avatar="/images/image3.png"
              username="Siti Rahma"
              handle="sitirahma"
              verified={true}
            />
            <UserSuggestion
              avatar="/images/image2.png"
              username="Hamiz Ghani"
              handle="hamizghani"
            />
          </div>
        </div>
      </div>
    </div>
  );
}