'use client';

import { useEffect } from 'react';

interface TikTokEmbedProps {
  videoId: string;
}

export default function TikTokEmbed({ videoId }: TikTokEmbedProps) {
  useEffect(() => {
    const existingScript = document.querySelector(`script[src="https://www.tiktok.com/embed.js"]`);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Re-initialize embed if script already present
      // @ts-ignore
      if (window?.tiktokEmbedLoad) {
        // Do nothing – TikTok automatically detects new embeds
      }
    }
  }, []);

  return (
    <blockquote
      className="tiktok-embed w-full"
      cite={`https://www.tiktok.com/@username/video/${videoId}`}
      data-video-id={videoId}
    >
      <section>Loading TikTok...</section>
    </blockquote>
  );
}
