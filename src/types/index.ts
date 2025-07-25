// types/index.ts
export interface PostType {
    id: number;
    avatar: string;
    username: string;
    handle: string;
    timestamp: string;
    content: string;
    replies: number;
    retweets: number; // Added to match Post component
    upvotes: number;
    downvotes: number;
    views: number;
    isVerified: boolean; // Added to match Post component
    image?: string; // Optional image property
  }