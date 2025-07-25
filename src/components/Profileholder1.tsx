
import Image from 'next/image';

interface UserSuggestionProps {
  avatar: string;
  username: string;
  handle: string;
  verified?: boolean;
}

export default function UserSuggestion({ 
  avatar, 
  username, 
  handle, 
  verified = false 
}: UserSuggestionProps) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors duration-200 rounded-lg">
      {/* Left side - Avatar and user info */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
          <Image
            src={avatar}
            alt={`${username}'s avatar`}
            width={40}
            height={40}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-black text-sm">
              {username}
            </span>
            {verified && (
              <span className="text-blue-500 text-xs">✓</span>
            )}
          </div>
          <span className="text-gray-500 text-sm">
            @{handle}
          </span>
        </div>
      </div>
      
      {/* Right side - Follow button */}
      <button className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
        Connect
      </button>
    </div>
  );
}