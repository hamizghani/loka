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
      // @ts-expect-error
      if (window?.tiktokEmbedLoad) {
        // Do nothing – TikTok automatically detects new embeds
      }
    }
  }, []);

  return (
    <blockquote
      className="tiktok-embed"
      cite={`https://www.tiktok.com/@tiktok/video/${videoId}`}
      data-video-id={videoId}
      style={{ maxWidth: '605px', minWidth: '325px' }}
    >
      <section>
        <a target="_blank" title="" href={`https://www.tiktok.com/@tiktok/video/${videoId}`}>
          @tiktok
        </a>
        <p></p>
        <a target="_blank" title="♬ original sound" href={`https://www.tiktok.com/music/original-sound-`}>
          ♬ original sound
        </a>
      </section>
    </blockquote>
  );
}