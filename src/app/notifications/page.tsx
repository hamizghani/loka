"use client";

import { useState } from "react";
import UserSuggestion from "@/components/Profileholder1";
import { Bell, CheckCircle, AtSign, Settings } from "lucide-react";

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

const notifications = [
  {
    id: 1,
    avatar: "/images/loka-logo.png",
    message: "You have been upgraded to Trusted Tier Membership!",
    time: "Just now",
    highlight: true,
    type: "system",
  },
  {
    id: 2,
    avatar: "/images/image1.png",
    message: "Gung liked your post.",
    time: "2m ago",
    type: "like",
  },
  {
    id: 3,
    avatar: "/images/image2.png",
    message: "Hamiz Ghani started following you.",
    time: "10m ago",
    type: "follow",
  },
  {
    id: 4,
    avatar: "/images/image3.png",
    message: "Siti Rahma mentioned you in a comment.",
    time: "1h ago",
    type: "mention",
  },
  {
    id: 5,
    avatar: "/images/image5.png",
    message: "Asep Haryadi replied to your story.",
    time: "3h ago",
    type: "reply",
  },
  // --- 20 more random notifications below ---
  {
    id: 6,
    avatar: "/images/image6.png",
    message: "Intan Nur sent you a friend request.",
    time: "5h ago",
    type: "friend_request",
  },
  {
    id: 7,
    avatar: "/images/image7.png",
    message: "Rizky Fahmi shared your post.",
    time: "6h ago",
    type: "share",
  },
  {
    id: 8,
    avatar: "/images/image8.png",
    message: "Sari Dewi liked your comment.",
    time: "7h ago",
    type: "like",
  },
  {
    id: 9,
    avatar: "/images/image9.png",
    message: "Eka Widya tagged you in a photo.",
    time: "8h ago",
    type: "tag",
  },
  {
    id: 10,
    avatar: "/images/image10.png",
    message: "Citra Lestari invited you to an event.",
    time: "9h ago",
    type: "invite",
  },
  {
    id: 11,
    avatar: "/images/image11.png",
    message: "Andi Rachman sent you a message.",
    time: "10h ago",
    type: "message",
  },
  {
    id: 12,
    avatar: "/images/image12.png",
    message: "Lia Maharani mentioned you in a story.",
    time: "11h ago",
    type: "mention",
  },
  {
    id: 13,
    avatar: "/images/image13.png",
    message: "Fajar Nugraha liked your photo.",
    time: "12h ago",
    type: "like",
  },
  {
    id: 14,
    avatar: "/images/image14.png",
    message: "Nia Ramadhani started following you.",
    time: "13h ago",
    type: "follow",
  },
  {
    id: 15,
    avatar: "/images/image15.png",
    message: "Hendra Gunawan replied to your comment.",
    time: "14h ago",
    type: "reply",
  },
  {
    id: 16,
    avatar: "/images/image16.png",
    message: "Putri Melati shared your story.",
    time: "15h ago",
    type: "share",
  },
  {
    id: 17,
    avatar: "/images/image17.png",
    message: "Arif Santika sent you a friend request.",
    time: "16h ago",
    type: "friend_request",
  },
  {
    id: 18,
    avatar: "/images/image18.png",
    message: "Dian Paramita mentioned you in a post.",
    time: "17h ago",
    type: "mention",
  },
  {
    id: 19,
    avatar: "/images/image19.png",
    message: "Bayu Wicaksono liked your reply.",
    time: "18h ago",
    type: "like",
  },
  {
    id: 20,
    avatar: "/images/image20.png",
    message: "Fitri Kurnia started following you.",
    time: "19h ago",
    type: "follow",
  },
  {
    id: 21,
    avatar: "/images/image21.png",
    message: "Sarah Chen sent you a message.",
    time: "20h ago",
    type: "message",
  },
  {
    id: 22,
    avatar: "/images/image22.png",
    message: "Mike Johnson liked your post.",
    time: "21h ago",
    type: "like",
  },
  {
    id: 23,
    avatar: "/images/image23.png",
    message: "Siti Kholifah replied to your comment.",
    time: "22h ago",
    type: "reply",
  },
  {
    id: 24,
    avatar: "/images/image24.png",
    message: "Linda Tambunan mentioned you in a story.",
    time: "23h ago",
    type: "mention",
  },
  {
    id: 25,
    avatar: "/images/image25.png",
    message: "Arman Syah shared your post.",
    time: "1d ago",
    type: "share",
  },
];

const tabs = [
  { name: "All", icon: Bell },
];

export default function NotificationsPage() {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("All");
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
      {/* Middle Section: Notifications Feed */}
      <div className="flex-3 h-screen bg-white border-r border-gray-200">
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`relative flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors
                ${activeTab === tab.name ? "text-black" : "text-gray-500 hover:text-black"}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
              {activeTab === tab.name && (
                <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
        {/* Notifications List */}
        <div className="flex flex-col divide-y divide-gray-100">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-start gap-4 px-6 py-5 group transition-colors ${notif.highlight ? "bg-yellow-50" : "hover:bg-gray-50"}`}
            >
              <img
                src={notif.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover border border-gray-200 mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className={`text-sm leading-snug ${notif.highlight ? "font-bold text-yellow-800" : "text-gray-900"}`}>{notif.message}</div>
                <div className="text-xs text-gray-400 mt-1">{notif.time}</div>
              </div>
              {/* Optional: menu button for more actions */}
              <button className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-400">
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Right Section: For You Carousel */}
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
