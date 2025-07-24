// app/page.tsx
'use client';

import { useState, useRef, useEffect, FormEvent, KeyboardEvent, CSSProperties, ReactNode } from 'react';

// Tipe data yang cocok dengan API OpenAI
type Message = {
  role: 'user' | 'assistant';
  content: string; 
};

export default function KaliaChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isBotTyping]);

  // Logika utama untuk mengirim pesan
  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isBotTyping) return;

    // Buat riwayat pesan baru dengan pesan pengguna yang baru
    const newUserMessage: Message = { role: 'user', content: trimmedInput };
    const newMessages = [...messages, newUserMessage];
    
    // Tampilkan pesan pengguna di UI
    setMessages(newMessages);
    setInputValue('');
    setIsBotTyping(true);

    try {
      // === PANGGILAN API KE BACKEND ANDA ===
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }), // Kirim semua riwayat pesan
      });

      if (!response.ok) {
        throw new Error('Failed to get response from the server.');
      }

      const botResponse: Message = await response.json();

      // Tambahkan respons dari bot ke dalam state
      setMessages(prevMessages => [...prevMessages, botResponse]);

    } catch (error) {
      console.error('Error fetching chat response:', error);
      // Opsi: Tampilkan pesan error di UI
      const errorMessage: Message = { role: 'assistant', content: 'Maaf, terjadi kesalahan. Silakan coba lagi.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
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
  
  // Tampilan Awal
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