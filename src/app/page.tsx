// app/page.tsx

import Image from 'next/image';
import Post from '@/components/Post';
import GlassmorphSearchBar from '@/components/GlassmorphSearchBar';

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
        <div className="flex-2 bg-blue-200 h-screen">Right</div>
    </div>
  );
}