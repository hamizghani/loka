'use client';

import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';

export default function MessagingInterface() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null); // Explicitly type selectedChat
  const [newMessage, setNewMessage] = useState('');

  // Indonesian cultural conversation data
  const conversations = [
    {
      id: 1,
      name: 'Wijayanto, Arvin',
      lastMessage: 'Makasih ya udah diajarin bikin rendang!',
      time: '5h',
      avatar: '👨‍💼',
      messages: [
        { id: 1, text: 'Eh, kamu tau gak cara bikin rendang yang enak?', sender: 'you', time: '2 days ago' },
        { id: 2, text: 'Wah tau dong! Kebetulan mama aku orang Padang asli', sender: 'them', time: '2 days ago' },
        { id: 3, text: 'Serius?? Boleh dong ajarin aku', sender: 'you', time: '2 days ago' },
        { id: 4, text: 'Boleh banget! Yang penting santan nya jangan sampai pecah ya', sender: 'them', time: '2 days ago' },
        { id: 5, text: 'Terus apinya kecil aja, sabar nunggu sampai kering', sender: 'them', time: '2 days ago' },
        { id: 6, text: 'Makasih ya udah diajarin bikin rendang!', sender: 'them', time: '5h' }
      ]
    },
    {
      id: 2,
      name: 'Celaa',
      lastMessage: 'Iya nih, Borobudur emang luar biasa',
      time: '10h',
      avatar: '🌊',
      messages: [
        { id: 1, text: 'Kemarin aku ke Borobudur, subhanallah pemandangannya', sender: 'you', time: '1 day ago' },
        { id: 2, text: 'Wah asik banget! Sunrise nya gimana?', sender: 'them', time: '1 day ago' },
        { id: 3, text: 'Bagus banget!! Tapi harus bangun jam 4 pagi hehe', sender: 'you', time: '1 day ago' },
        { id: 4, text: 'Worth it sih ya, candi bersejarah gitu', sender: 'them', time: '1 day ago' },
        { id: 5, text: 'Iya nih, Borobudur emang luar biasa', sender: 'them', time: '10h' }
      ]
    },
    {
      id: 3,
      name: 'Zayyan',
      lastMessage: 'Betul, tradisi kita harus dilestarikan',
      time: '16h',
      avatar: '🌅',
      messages: [
        { id: 1, text: 'Kemarin liat anak muda pada lupa sama batik Indonesia', sender: 'you', time: '1 day ago' },
        { id: 2, text: 'Iya nih, padahal batik kita warisan dunia loh', sender: 'them', time: '1 day ago' },
        { id: 3, text: 'Makanya aku sekarang sering pakai batik ke kampus', sender: 'you', time: '1 day ago' },
        { id: 4, text: 'Keren! Aku juga mau mulai ah', sender: 'them', time: '1 day ago' },
        { id: 5, text: 'Betul, tradisi kita harus dilestarikan', sender: 'them', time: '16h' }
      ]
    },
    {
      id: 4,
      name: 'Ardiandnr',
      lastMessage: 'Gudeg Jogja emang juara sih',
      time: '17h',
      avatar: '👤',
      hasUnread: true,
      messages: [
        { id: 1, text: 'Lagi pengen makan gudeg nih, kangen Jogja', sender: 'you', time: '2 days ago' },
        { id: 2, text: 'Wah sama! Gudeg Yu Djum masih yang terenak menurutku', sender: 'them', time: '2 days ago' },
        { id: 3, text: 'Iya! Yang di Wijilan itu kan? Pernah ngantri 2 jam disana', sender: 'you', time: '2 days ago' },
        { id: 4, text: 'Hahaha worth it kan? Kelapa mudanya juga enak', sender: 'them', time: '2 days ago' },
        { id: 5, text: 'Gudeg Jogja emang juara sih', sender: 'them', time: '17h' }
      ]
    },
    {
      id: 5,
      name: 'Little Vietnam Team',
      lastMessage: 'Wayang kulit Indonesia mirip sama puppet Vietnam',
      time: '21h',
      avatar: '🇻🇳',
      messages: [
        { id: 1, text: 'Guys, tadi aku nonton pertunjukan wayang kulit', sender: 'you', time: '1 day ago' },
        { id: 2, text: 'Oh cool! Di Vietnam juga ada puppet show serupa', sender: 'them', time: '1 day ago' },
        { id: 3, text: 'Serius? Cerita tentang apa biasanya?', sender: 'you', time: '1 day ago' },
        { id: 4, text: 'Biasanya legenda dan sejarah Vietnam', sender: 'them', time: '1 day ago' },
        { id: 5, text: 'Wayang kulit Indonesia mirip sama puppet Vietnam', sender: 'them', time: '21h' }
      ]
    },
    {
      id: 6,
      name: 'Faishal Falih',
      lastMessage: 'Tarian Saman emang keren banget gerakannya',
      time: '1d',
      avatar: '👨‍🎓',
      messages: [
        { id: 1, text: 'Kemarin nonton tarian Saman dari Aceh, keren banget!', sender: 'you', time: '2 days ago' },
        { id: 2, text: 'Wah iya, gerakannya kompak banget ya', sender: 'them', time: '2 days ago' },
        { id: 3, text: 'Iya, butuh latihan bertahun-tahun tuh', sender: 'you', time: '2 days ago' },
        { id: 4, text: 'UNESCO juga udah akuin sebagai warisan budaya dunia', sender: 'them', time: '2 days ago' },
        { id: 5, text: 'Tarian Saman emang keren banget gerakannya', sender: 'them', time: '1d' }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      // In a real application, you'd update your conversation state here
      // For example:
      // if (selectedConversation) {
      //   const updatedConversations = conversations.map(conv =>
      //     conv.id === selectedChat
      //       ? {
      //           ...conv,
      //           messages: [...conv.messages, { id: Date.now(), text: newMessage, sender: 'you', time: 'Just now' }],
      //           lastMessage: newMessage,
      //           time: 'Just now'
      //         }
      //       : conv
      //   );
      //   // You'd need to lift conversations state up or manage it differently
      //   // if you want to update it from here. For this example, we're just logging.
      // }
      setNewMessage('');
    }
  };

  // Correctly type the event parameter 'e'
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  return (
    <div className="flex ml-20 h-screen bg-white text-black">
      {/* Left Panel - Conversation List */}
      <div className="w-1/2 border-r border-gray-300 flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-200 transition-colors ${
                selectedChat === conversation.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setSelectedChat(conversation.id)}
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl mr-3">
                {conversation.avatar}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-black truncate">
                    {conversation.name}
                  </h3>
                  <span className="text-gray-600 text-sm flex-shrink-0 ml-2">
                    {conversation.time}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <p className="text-gray-600 text-sm truncate flex-1">
                    {conversation.lastMessage}
                  </p>
                  {conversation.hasUnread && (
                    <div className="w-2 h-2 bg-red-500 rounded-full ml-2 flex-shrink-0"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Message Area */}
      <div className="w-1/2 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-300">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg mr-3">
                  {selectedConversation?.avatar}
                </div>
                <h3 className="font-medium text-black">
                  {selectedConversation?.name}
                </h3>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {selectedConversation?.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'you' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-200 text-black'
                    }`}>
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'you' ? 'text-red-100' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-300">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ketik pesan..."
                  className="flex-1 bg-gray-100 text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-20 h-20 border-2 border-gray-400 rounded-full flex items-center justify-center mb-6">
              <MessageCircle size={32} className="text-gray-600" />
            </div>
            <h2 className="text-2xl font-medium text-black mb-2">Loka Messaging</h2>
            <p className="text-gray-600 mb-6">Select conversations to start chatting!</p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
              Send message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}