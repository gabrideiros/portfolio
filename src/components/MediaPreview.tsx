import React from 'react';
import { Play, Image as ImageIcon } from 'lucide-react';

interface MediaPreviewProps {
  url: string;
  type: 'image' | 'video';
  className?: string;
}

export function MediaPreview({ url, type, className = "" }: MediaPreviewProps) {
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  if (type === 'video') {
    const embedUrl = getYouTubeEmbedUrl(url);
    if (embedUrl) {
      return (
        <div className={`relative aspect-video rounded-lg overflow-hidden ${className}`}>
          <iframe
            src={embedUrl}
            title="YouTube video"
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      );
    } else {
      return (
        <div className={`flex items-center justify-center aspect-video bg-muted rounded-lg ${className}`}>
          <div className="text-center">
            <Play className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Video preview not available</p>
          </div>
        </div>
      );
    }
  }

  if (type === 'image') {
    return (
      <div className={`relative aspect-video rounded-lg overflow-hidden ${className}`}>
        <img
          src={url}
          alt="Preview"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="flex items-center justify-center h-full bg-muted">
                  <div class="text-center">
                    <svg class="h-8 w-8 mx-auto mb-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p class="text-sm text-muted-foreground">Image not available</p>
                  </div>
                </div>
              `;
            }
          }}
        />
      </div>
    );
  }

  return null;
}