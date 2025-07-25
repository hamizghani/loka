"use client";

import GlassmorphSearchBar from "@/components/GlassmorphSearchBar";
import PopularComponent from "@/components/PopularComponent";
import UserSuggestion from "@/components/Profileholder1";
import Post from "@/components/Post";
import React, { useState, useEffect, useRef } from "react"; // Import useRef

const featuredStories = [
  {
    id: 1,
    title: "The Spirit of Saman",
    author: "Hamiz Ghani",
    image: "/images/image31.png",
    tag: "Ethnicity",
    description:
      "Experience the unity and devotion of Aceh's Saman dance, where rhythm and faith bind a community together.",
  },
  {
    id: 2,
    title: "Galungan: Bali's Living Tradition",
    author: "Gung",
    image: "/images/image33.png",
    tag: "Festivals",
    description:
      "Discover how the Balinese celebrate Galungan, honoring ancestors and keeping traditions alive through generations.",
  },
  {
    id: 3,
    title: "The Taste of Sundanese Food",
    author: "Dewi Kusuma",
    image: "/images/image35.png",
    tag: "Food",
    description:
      "Dive deep into traditional Sunda Food and see how dishes bridges generations and backgrounds in Bandung.",
  },
  {
    id: 4,
    title: "The Tenggerese Peace Offerings",
    author: "Asep Haryadi",
    image: "/images/image34.png",
    tag: "Religion",
    description:
      "Explore how the Tenggerese people prepare offerings to the gods, a tradition that has been passed down for centuries.",
  },
];

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

const mockUsers = [
  {
    avatar: "/images/image27.png",
    username: "Sarah Chen",
    handle: "sarahdesigns",
    verified: true,
  },
  {
    avatar: "/images/image1.png",
    username: "Gung",
    handle: "gung",
    verified: true,
  },
  {
    avatar: "/images/image5.png",
    username: "Asep Haryadi",
    handle: "asepharyadi",
    verified: false,
  },
  {
    avatar: "/images/image3.png",
    username: "Siti Rahma",
    handle: "sitirahma",
    verified: true,
  },
  {
    avatar: "/images/image2.png",
    username: "Hamiz Ghani",
    handle: "hamizghani",
    verified: false,
  },
];

const generateMockPosts = (query: string) => {
  const keywords = query.split(" ");
  const contextTag = keywords[0] || "Culture";

  return mockUsers.map((user, index) => ({
    ...user,
    timestamp: "Jul 25",
    content: `Talking about ${contextTag.toLowerCase()} really brings back memories. Here's my take on it.`,
    replies: Math.floor(Math.random() * 5),
    retweets: Math.floor(Math.random() * 3),
    upvotes: Math.floor(Math.random() * 10),
    downvotes: 0,
    views: 100 + index * 50,
  }));
};


// Simple GPT API integration function - enhancement happens in API route
const callGPTAPI = async (userQuery: string, mode: string = "explore"): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      userQuery,
      model: 'gpt-4',
      temperature: 0.7,
      mode // <- add this
    }),

    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error('Error calling GPT API:', error);
    throw new Error(`Failed to get response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export default function ExplorePage() {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mockPosts, setMockPosts] = useState<any[]>([]); // state for GPT-powered posts

  // Ref for the TikTok carousel container
  const tiktokCarouselRef = useRef<HTMLDivElement>(null);

  // TikTok embed HTML strings
  const tiktokEmbeds = [
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@majuidn/video/7440841336162503991" data-video-id="7440841336162503991" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@majuidn" href="https://www.tiktok.com/@majuidn?refer=embed">@majuidn</a> Ritual Ma’nene merupakan salah satu tradisi yang dilakukan suku Toraja di Sulawesi Selatan (Sulsel). Tradisi ini berupa membersihkan jenazah yang telah meninggal puluhan bahkan ratusan tahun atau yang telah berbentuk mumi. Ritual Ma’nene masih dijaga oleh masyarakat suku Toraja. Pada tradisi ini, satu rumpun keluarga melakukan pembersihan mumi leluhur sebagai garis keturunannya. Pemangku adat suku Toraja, Marten Paladan mengatakan, ritual Ma’nene adalah salah satu cara masyarakat Toraja untuk menghormati leluhur yang sudah lebih dulu meninggal dunia. Menurutnya, suku Toraja memang sangat menjaga dan menghormati leluhur. ____________ <a title="majuindonesia" target="_blank" href="https://www.tiktok.com/tag/majuindonesia?refer=embed">#MajuIndonesia</a> <a title="majuidn" target="_blank" href="https://www.tiktok.com/tag/majuidn?refer=embed">#MajuIDN</a> <a title="indonesia" target="_blank" href="https://www.tiktok.com/tag/indonesia?refer=embed">#Indonesia</a> <a title="manene" target="_blank" href="https://www.tiktok.com/tag/manene?refer=embed">#Manene</a> <a title="toraja" target="_blank" href="https://www.tiktok.com/tag/toraja?refer=embed">#Toraja</a> <a title="budaya" target="_blank" href="https://www.tiktok.com/tag/budaya?refer=embed">#Budaya</a> <a target="_blank" title="♬ original sound  - Maju Indonesia" href="https://www.tiktok.com/music/original-sound-Maju-Indonesia-7440841423753399096?refer=embed">♬ original sound  - Maju Indonesia</a> </section> </blockquote>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@koteka.1998/video/7466225678384467205" data-video-id="7466225678384467205" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@koteka.1998" href="https://www.tiktok.com/@koteka.1998?refer=embed">@koteka.1998</a> <p>Toraja tribe culture in Indonesia 👍👍✔️</p> <a target="_blank" title="♬ suara asli  - ⚙️⚙️Gantinya⚙️⚙️" href="https://www.tiktok.com/music/suara-asli-⚙️⚙️Gantinya⚙️⚙️-7466225685662272262?refer=embed">♬ suara asli  - ⚙️⚙️Gantinya⚙️⚙️</a> </section> </blockquote>`,
    `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@serliana817/video/7193908102444485914" data-video-id="7193908102444485914" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@serliana817" href="https://www.tiktok.com/@serliana817?refer=embed">@serliana817</a> Ma&#39; Nene&#39; merupakan sebuah ritual adat dalam budaya Suku Toraja. Ritual ini merupakan sebuah ritual di mana mayat yang berusia puluhan bahkan ratusan tahun yang lalu dikeluarkan dari dalam liang kuburan untuk dibersihkan dan diganti baju dan kainnya. Ritual adat ini termasuk dalam upacara adat Rambu Solo&#39; (kematian).<a title="tiktoktoraja" target="_blank" href="https://www.tiktok.com/tag/tiktoktoraja?refer=embed">#tiktoktoraja</a><a title="torajaviral" target="_blank" href="https://www.tiktok.com/tag/torajaviral?refer=embed">#torajaviral</a><a title="anakkampung" target="_blank" href="https://www.tiktok.com/tag/anakkampung?refer=embed">#anakkampung</a><a title="sulawesiselatan" target="_blank" href="https://www.tiktok.com/tag/sulawesiselatan?refer=embed">#sulawesiselatan</a><a title="fypシ゚viral" target="_blank" href="https://www.tiktok.com/tag/fyp%E3%82%B7%E3%82%9Aviral?refer=embed">#fyp%E3%82%B7%E3%82%9Aviral</a> <a target="_blank" title="♬ original sound - Novi - emabel" href="https://www.tiktok.com/music/original-sound-Novi-6932689984105286402?refer=embed">♬ original sound - Novi - emabel</a> </section> </blockquote>`
  ];

  // Function to scroll the TikTok carousel left
  const scrollLeft = () => {
    if (tiktokCarouselRef.current) {
      tiktokCarouselRef.current.scrollBy({
        left: -400, // Scroll amount
        behavior: 'smooth'
      });
    }
  };

  // Function to scroll the TikTok carousel right
  const scrollRight = () => {
    if (tiktokCarouselRef.current) {
      tiktokCarouselRef.current.scrollBy({
        left: 400, // Scroll amount
        behavior: 'smooth'
      });
    }
  };

  // Effect to load the TikTok embed script once
  useEffect(() => {
    const scriptId = 'tiktok-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []); // Run once on component mount


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

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setSearchQuery(query);
    setIsSearchMode(true);
    setIsLoading(true);

    try {
      const mainResponse = await callGPTAPI(query); // main 3-paragraph result
      setSearchResult(mainResponse);

      // Call GPT API 5x to simulate community posts
      const postPromises = mockUsers.map((user) =>
        callGPTAPI(query, "post").then((content) => ({
          ...user,
          content,
          timestamp: "Jul 25",
          replies: Math.floor(Math.random() * 5),
          retweets: Math.floor(Math.random() * 3),
          upvotes: Math.floor(Math.random() * 10),
          downvotes: 0,
          views: 100 + Math.floor(Math.random() * 200),
        }))
      );

      const results = await Promise.all(postPromises);
      setMockPosts(results);

    } catch (error) {
      console.error("Error calling GPT API:", error);
      setSearchResult("Sorry, there was an error processing your search. Please try again.");
      setMockPosts([]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleBackToExplore = () => {
    setIsSearchMode(false);
    setSearchResult("");
    setSearchQuery("");
  };

  return (
    <div className="ml-20 flex">
      {/* Middle Section */}
      <div className="flex-3 h-screen">
        <GlassmorphSearchBar onSearch={handleSearch} />
        
        {/* Content Area */}
        <div className="flex flex-col mt-4 space-y-6 px-4 h-[calc(100vh-120px)] overflow-y-auto">
          {isSearchMode ? (
            // Search Results View
            <div className="space-y-4">
              {/* Back Button */}
              <button
                onClick={handleBackToExplore}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Explore
              </button>

              {/* Search Query Display */}
              <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-red-500">
                <p className="text-sm text-gray-600">Search results for:</p>
                <p className="font-semibold text-gray-900">"{searchQuery}"</p>
              </div>

              {/* Loading State */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                  <span className="ml-3 text-gray-600">Searching...</span>
                </div>
              ) : (
                // Search Results
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div>
                    {/* Kalia Branding Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                      {/* Kalia Logo/Icon */}
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-400 to-pink-400 rounded-lg">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      {/* Kalia Text */}
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                          kalia
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="prose prose-gray max-w-none">
                    {searchResult.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {mockPosts.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Related Community Posts</h3>
                  {mockPosts.map((post, index) => (
                    <Post
                      key={index}
                      avatar={post.avatar}
                      username={post.username}
                      handle={post.handle}
                      isVerified={post.verified}
                      timestamp={post.timestamp}
                      content={post.content}
                      replies={post.replies}
                      retweets={post.retweets}
                      upvotes={post.upvotes}
                      downvotes={post.downvotes}
                      views={post.views}
                    />
                  ))}
                </div>
              )}

              {/* TikTok Embeds Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Videos</h3>
                <div className="relative">
                  <div id="tiktok-carousel" ref={tiktokCarouselRef} className="flex overflow-x-auto scroll-smooth space-x-4 p-2 pb-4">
                    {tiktokEmbeds.map((embedHtml, index) => (
                      <div 
                        key={index} 
                        className="flex-shrink-0 w-[380px] h-auto rounded-lg overflow-hidden" // Set fixed width for proportion
                        dangerouslySetInnerHTML={{ __html: embedHtml }} 
                      />
                    ))}
                  </div>
                  {/* Left Chevron */}
                  <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-200 z-10"
                    aria-label="Scroll left"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  {/* Right Chevron */}
                  <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-200 z-10"
                    aria-label="Scroll right"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Default Featured Stories View
            <>
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
                      {story.tag && (
                        <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded mb-2">
                          {story.tag}
                        </span>
                      )}
                      <h2 className="text-lg font-bold text-gray-900 mb-1">{story.title}</h2>
                      <p className="text-gray-700 text-sm mb-2">{story.description}</p>
                    </div>
                    <div className="text-gray-500 text-xs">By {story.author}</div>
                  </div>
                </div>
              ))}
              <blockquote cite="https://www.tiktok.com/@majuidn/video/7440841336162503991" data-video-id="7440841336162503991" className="w-full" > <section> <a target="_blank" title="@majuidn" href="https://www.tiktok.com/@majuidn?refer=embed">@majuidn</a> Ritual Ma’nene merupakan salah satu tradisi yang dilakukan suku Toraja di Sulawesi Selatan (Sulsel). Tradisi ini berupa membersihkan jenazah yang telah meninggal puluhan bahkan ratusan tahun atau yang telah berbentuk mumi. Ritual Ma’nene masih dijaga oleh masyarakat suku Toraja. Pada tradisi ini, satu rumpun keluarga melakukan pembersihan mumi leluhur sebagai garis keturunannya. Pemangku adat suku Toraja, Marten Paladan mengatakan, ritual Ma’nene adalah salah satu cara masyarakat Toraja untuk menghormati leluhur yang sudah lebih dulu meninggal dunia. Menurutnya, suku Toraja memang sangat menjaga dan menghormati leluhur. ____________ <a title="majuindonesia" target="_blank" href="https://www.tiktok.com/tag/majuindonesia?refer=embed">#MajuIndonesia</a> <a title="majuidn" target="_blank" href="https://www.tiktok.com/tag/majuidn?refer=embed">#MajuIDN</a> <a title="indonesia" target="_blank" href="https://www.tiktok.com/tag/indonesia?refer=embed">#Indonesia</a> <a title="manene" target="_blank" href="https://www.tiktok.com/tag/manene?refer=embed">#Manene</a> <a title="toraja" target="_blank" href="https://www.tiktok.com/tag/toraja?refer=embed">#Toraja</a> <a title="budaya" target="_blank" href="https://www.tiktok.com/tag/budaya?refer=embed">#Budaya</a> <a target="_blank" title="♬ original sound  - Maju Indonesia" href="https://www.tiktok.com/music/original-sound-Maju-Indonesia-7440841423753399096?refer=embed">♬ original sound  - Maju Indonesia</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>

              <blockquote cite="https://www.tiktok.com/@koteka.1998/video/7466225678384467205" data-video-id="7466225678384467205" className="w-full" > <section> <a target="_blank" title="@koteka.1998" href="https://www.tiktok.com/@koteka.1998?refer=embed">@koteka.1998</a> <p>Toraja tribe culture in Indonesia 👍👍✔️</p> <a target="_blank" title="♬ suara asli  - ⚙️⚙️Gantinya⚙️⚙️" href="https://www.tiktok.com/music/suara-asli-⚙️⚙️Gantinya⚙️⚙️-7466225685662272262?refer=embed">♬ suara asli  - ⚙️⚙️Gantinya⚙️⚙️</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>

              <blockquote cite="https://www.tiktok.com/@serliana817/video/7193908102444485914" data-video-id="7193908102444485914" className="w-full"> <section> <a target="_blank" title="@serliana817" href="https://www.tiktok.com/@serliana817?refer=embed">@serliana817</a> Ma&#39; Nene&#39; merupakan sebuah ritual adat dalam budaya Suku Toraja. Ritual ini merupakan sebuah ritual di mana mayat yang berusia puluhan bahkan ratusan tahun yang lalu dikeluarkan dari dalam liang kuburan untuk dibersihkan dan diganti baju dan kainnya. Ritual adat ini termasuk dalam upacara adat Rambu Solo&#39; (kematian).<a title="tiktoktoraja" target="_blank" href="https://www.tiktok.com/tag/tiktoktoraja?refer=embed">#tiktoktoraja</a><a title="torajaviral" target="_blank" href="https://www.tiktok.com/tag/torajaviral?refer=embed">#torajaviral</a><a title="anakkampung" target="_blank" href="https://www.tiktok.com/tag/anakkampung?refer=embed">#anakkampung</a><a title="sulawesiselatan" target="_blank" href="https://www.tiktok.com/tag/sulawesiselatan?refer=embed">#sulawesiselatan</a><a title="fypシ゚viral" target="_blank" href="https://www.tiktok.com/tag/fyp%E3%82%B7%E3%82%9Aviral?refer=embed">#fypシ゚viral</a> <a target="_blank" title="♬ original sound - Novi - emabel" href="https://www.tiktok.com/music/original-sound-Novi-6932689984105286402?refer=embed">♬ original sound - Novi - emabel</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>


            </>
            
          )}
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