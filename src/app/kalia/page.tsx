// app/page.tsx
'use client';

import { useState, useRef, useEffect, FormEvent, KeyboardEvent} from 'react';
import Image from 'next/image';

// Tipe data yang cocok dengan API OpenAI
type Message = {
  role: 'user' | 'assistant';
  content: string; 
};

// Define mockUsers directly in KaliaChatbotPage for now,
// or consider moving it to a shared utility if used elsewhere.
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

// Helper function to simulate random post stats (similar to ExplorePage's logic)
const generateRandomPostStats = () => ({
  timestamp: "Jul 25",
  replies: Math.floor(Math.random() * 5),
  retweets: Math.floor(Math.random() * 3),
  upvotes: Math.floor(Math.random() * 10),
  downvotes: 0,
  views: 100 + Math.floor(Math.random() * 200),
});

// A simplified "Post" component structure for inline styling
interface PostProps {
    avatar: string;
    username: string;
    handle: string;
    isVerified?: boolean;
    timestamp: string;
    content: string;
    replies: number;
    retweets: number;
    upvotes: number;
    downvotes: number;
    views: number;
}

const SimpleInlinePost: React.FC<PostProps> = ({
    avatar, username, handle, isVerified, timestamp, content,
    replies, retweets, upvotes, views
}) => {
    return (
        <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0', // gray-200
            borderRadius: '16px', // rounded-2xl
            padding: '16px', // p-4
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // shadow-sm
            display: 'flex',
            flexDirection: 'column',
            gap: '12px', // gap-3
            marginBottom: '10px' // Add some spacing between posts
        }}>
            {/* User Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Image
                    src={avatar}
                    alt={username}
                    style={{ width: '40px', height: '40px', borderRadius: '9999px', objectFit: 'cover' }} // rounded-full
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontWeight: '600', color: '#1a202c' }}>{username}</span> {/* font-semibold text-gray-900 */}
                        {isVerified && (
                            <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', color: '#3b82f6' }} fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                        )}
                        <span style={{ color: '#64748b' }}>@{handle}</span> {/* text-gray-500 */}
                    </div>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{timestamp}</span> {/* text-xs text-gray-500 */}
                </div>
            </div>

            {/* Content */}
            <p style={{ color: '#4a5568', lineHeight: '1.5' }}>{content}</p> {/* text-gray-700 */}

            {/* Stats (simplified) */}
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '14px', color: '#64748b' }}>
                <span>Replies: {replies}</span>
                <span>Retweets: {retweets}</span>
                <span>Upvotes: {upvotes}</span>
                <span>Views: {views}</span>
            </div>
        </div>
    );
};


export default function KaliaChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [generatedPosts, setGeneratedPosts] = useState<PostProps[]>([]); // New state for generated posts
  
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isBotTyping, generatedPosts]); // Add generatedPosts to dependency array

  // Logika utama untuk mengirim pesan
  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isBotTyping) return;

    const newUserMessage: Message = { role: 'user', content: trimmedInput };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsBotTyping(true);
    setGeneratedPosts([]); // Clear previous generated posts

    try {
      // 1. Get main Kalia AI response
      const kaliaResponse = await fetch('/api/kalia-chat', { // Use the new dedicated route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userQuery: trimmedInput,
            model: 'gpt-4',
            temperature: 0.7,
            mode: 'explore' // Ensure structured response
        }),
      });

      if (!kaliaResponse.ok) {
        throw new Error('Failed to get response from Kalia AI.');
      }

      const kaliaData = await kaliaResponse.json();
      const kaliaMessageContent = kaliaData.choices?.[0]?.message?.content || 'Maaf, saya tidak bisa memproses permintaan Anda saat ini.';
      const kaliaBotMessage: Message = { role: 'assistant', content: kaliaMessageContent };
      setMessages(prevMessages => [...prevMessages, kaliaBotMessage]);

      // 2. Generate 5 mock posts from other users using "post" mode
      const postPromises = mockUsers.map(async (user) => {
        try {
          const postResponse = await fetch('/api/kalia-chat', { // Use the new dedicated route
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userQuery: trimmedInput, // Use the same user query for posts
              model: 'gpt-4',
              temperature: 0.7,
              mode: 'post' // Request post-style content
            }),
          });

          if (!postResponse.ok) {
            console.error(`Failed to get post response for ${user.username}`);
            return null; // Return null if fetching fails for a specific post
          }

          const postData = await postResponse.json();
          const postContent = postData.choices?.[0]?.message?.content || 'Error generating post content.';
          
          return {
            ...user,
            content: postContent,
            ...generateRandomPostStats() // Add random stats
          };
        } catch (postError) {
          console.error(`Error generating post for ${user.username}:`, postError);
          return null;
        }
      });

      const results = await Promise.all(postPromises);
      // Filter out any null results from failed post generations
      setGeneratedPosts(results.filter(post => post !== null) as PostProps[]);

    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorMessage: Message = { role: 'assistant', content: 'Maaf, terjadi kesalahan. Silakan coba lagi.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      setGeneratedPosts([]); // Clear generated posts on main error
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Tampilan Awal (tetap sama)
  if (messages.length === 0) {
    return (
      <main style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        height: '100vh', backgroundColor: '#fbfbfa', fontFamily: 'serif', padding: '20px'
      }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 400, color: '#D9534F', margin: '0 0 25px 0' }}>
            <span style={{color: '#E57373', fontSize: '4.5rem', verticalAlign: 'middle', marginRight: '5px'}}>*</span> 
            kalia
        </h1>
        <div style={{width: '100%', maxWidth: '700px'}}>
          <form onSubmit={handleSubmit}>
              <textarea
                  value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown}
                  placeholder="Tanya apa saja pada Kalia..." rows={1}
                  style={{
                      width: '100%', minHeight: '50px', padding: '15px 20px', borderRadius: '15px',
                      border: '1px solid #ddd', fontSize: '1rem', fontFamily: 'sans-serif',
                      resize: 'none', outline: 'none', boxSizing: 'border-box'
                  }}
              />
          </form>
        </div>
      </main>
    );
  }

  // Tampilan Obrolan
  return (
    <main style={{
        display: 'flex', justifyContent: 'center', height: '100vh',
        backgroundColor: '#fbfbfa', fontFamily: 'sans-serif',
    }}>
      <div style={{
          display: 'flex', flexDirection: 'column', width: '100%',
          maxWidth: '768px', height: '100%',
      }}>
        <div ref={chatHistoryRef} style={{
          flexGrow: 1, overflowY: 'auto', padding: '20px 10px',
          display: 'flex', flexDirection: 'column', gap: '25px',
        }}>
          {messages.map((msg, index) => (
            <div key={index} style={{
                maxWidth: '90%',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}>
                <div style={{
                  padding: '12px 18px', borderRadius: '18px',
                  backgroundColor: msg.role === 'user' ? '#007bff' : '#f0f0f0',
                  color: msg.role === 'user' ? 'white' : '#333',
                  borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '18px',
                  borderBottomRightRadius: msg.role === 'user' ? '4px' : '18px',
                }}>
                  {msg.content}
                </div>
            </div>
          ))}
          {isBotTyping && <div style={{alignSelf: 'flex-start', color: '#888', paddingLeft: '10px'}}>kalia is typing...</div>}

          {/* Render Generated Posts here */}
          {generatedPosts.length > 0 && (
            <div style={{ 
                marginTop: '30px', 
                paddingTop: '20px', 
                borderTop: '1px solid #eee', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '15px' 
            }}>
              <h3 style={{ 
                  fontSize: '1.25rem', // text-lg
                  fontWeight: '600', // font-semibold
                  color: '#1a202c', // text-gray-900
                  marginBottom: '10px' 
              }}>
                Related Community Posts
              </h3>
              {generatedPosts.map((post, index) => (
                <SimpleInlinePost key={index} {...post} />
              ))}
            </div>
          )}
        </div>
        
        <div style={{ padding: '20px 10px', borderTop: '1px solid #eee' }}>
          <form onSubmit={handleSubmit}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <textarea
                      value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown}
                      placeholder="Reply to kalia..." rows={1}
                      style={{
                          width: '100%', minHeight: '52px', maxHeight: '200px',
                          padding: '15px 60px 15px 20px', borderRadius: '15px', border: '1px solid #ddd',
                          fontSize: '1rem', fontFamily: 'inherit', resize: 'none',
                          outline: 'none', boxSizing: 'border-box'
                      }}
                  />
                  <button type="submit" disabled={!inputValue.trim() || isBotTyping} style={{
                      position: 'absolute', right: '10px', width: '32px', height: '32px',
                      borderRadius: '8px', border: 'none',
                      backgroundColor: !inputValue.trim() || isBotTyping ? '#ccc' : '#D9534F',
                      color: 'white', cursor: !inputValue.trim() || isBotTyping ? 'not-allowed' : 'pointer',
                      fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background-color 0.2s',
                  }}>
                      ↑
                  </button>
              </div>
          </form>
        </div>
      </div>
    </main>
  );
}