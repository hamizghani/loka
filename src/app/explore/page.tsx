"use client";

import GlassmorphSearchBar from "@/components/GlassmorphSearchBar";
import PopularComponent from "@/components/PopularComponent";
import UserSuggestion from "@/components/Profileholder1";
import { useState } from "react";

const featuredStories = [
  {
    id: 1,
    title: "The Spirit of Saman",
    author: "Hamiz Ghani",
    image: "/images/image31.png",
    description:
      "Experience the unity and devotion of Aceh's Saman dance, where rhythm and faith bind a community together.",
  },
  {
    id: 2,
    title: "Galungan: Bali's Living Tradition",
    author: "Gung",
    image: "/images/image33.png",
    description:
      "Discover how the Balinese celebrate Galungan, honoring ancestors and keeping traditions alive through generations.",
  },
  {
    id: 3,
    title: "The Taste of Sundanese Harmony",
    author: "Asep Haryadi",
    image: "/images/image32.png",
    description:
      "Join a Sundanese angklung workshop and see how music bridges generations and backgrounds in Bandung.",
  },
];

const forYouItems = [
  {
    id: 1,
    title: "Ethnicity",
    description: "Explore Indonesia’s rich tapestry of over 1,300 ethnic groups and their unique customs.",
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
    description: "Discover the 700+ regional languages that shape Indonesia’s cultural identity.",
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
    description: "Navigate Indonesia’s islands and provinces, each boasting distinct landscapes and traditions.",
    image: "/images/image26.png"
  },
];

export default function ExplorePage() {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
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

  return (
    <div className="ml-20 flex">
      {/* Middle Section */}
      <div className="flex-3 h-screen bg-white">
        <GlassmorphSearchBar />
        <div className="flex flex-col mt-4 space-y-6 px-4">
          {featuredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4"
            >
              <div className="flex-shrink-0 w-full md:w-48 h-40 rounded-2xl overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded mb-2">
                    Featured
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">{story.title}</h2>
                  <p className="text-gray-700 text-sm mb-2">{story.description}</p>
                </div>
                <div className="text-gray-500 text-xs">By {story.author}</div>
              </div>
            </div>
          ))}
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
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 z-10 opacity-60"
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
