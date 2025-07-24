// app/page.tsx

import Image from 'next/image';
import Post from '@/components/Post';
import GlassmorphSearchBar from '@/components/GlassmorphSearchBar';
import UserSuggestion from '@/components/Profileholder1';
import PopularContent from '@/components/PopularComponent';

export default function HomePage() {
  return (
    <div className="ml-20 flex">
        <div className="flex-3 bg-white h-screen">
            <GlassmorphSearchBar />
            
                <Post 
                    avatar="https://pbs.twimg.com/profile_images/1234567890/avatar.jpg"
                    username="demorghan"
                    handle="podiapo"
                    timestamp="Jul 17"
                    content="This is a sample post content."
                    replies={10}
                    upvotes={5}
                    downvotes={2}
                    views={100}
                />
                <Post 
                    avatar="https://pbs.twimg.com/profile_images/1234567890/avatar.jpg"
                    username="demorghan"
                    handle="podiapo"
                    timestamp="Jul 17"
                    content="This is a sample post content."
                    replies={10}
                    upvotes={5}
                    downvotes={2}
                    views={100}
                />
                <Post 
                    avatar="https://pbs.twimg.com/profile_images/1234567890/avatar.jpg"
                    username="demorghan"
                    handle="podiapo"
                    timestamp="Jul 17"
                    content="This is a sample post content."
                    replies={10}
                    upvotes={5}
                    downvotes={2}
                    views={100}
                />
                <Post 
                    avatar="https://pbs.twimg.com/profile_images/1234567890/avatar.jpg"
                    username="demorghan"
                    handle="podiapo"
                    timestamp="Jul 17"
                    content="This is a sample post content."
                    replies={10}
                    upvotes={5}
                    downvotes={2}
                    views={100}
                />
        </div>
        <div className="flex-2 bg-blue-200 h-screen flex flex-col">
            {/* Top half - For You section */}
            <div className="flex-1 bg-gray-100 p-4 border-b border-gray-300">
                <h2 className="text-xl font-bold text-gray-800 mb-4">For You</h2>
                <PopularContent />
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