import React from 'react';
import { Play, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface MediaPreviewProps {
  url: string;
  type: 'image' | 'video';
  className?: string;
}

export function MediaPreview({ url, type, className = "" }: MediaPreviewProps) {
  // Don't render anything if URL is empty
  if (!url.trim()) {
    return (
      <div className={`flex items-center justify-center aspect-video bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25 ${className}`}>
        <div className="text-center">
          <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-muted-foreground/10 flex items-center justify-center">
            {type === 'video' ? (
              <Play className="h-6 w-6 text-muted-foreground/50" />
            ) : (
              <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {type === 'video' ? 'Video preview will appear here' : 'Image preview will appear here'}
          </p>
        </div>
      </div>
    );
  }

  const getYouTubeEmbedUrl = (url: string) => {
    // More comprehensive YouTube URL patterns
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^#&?]*)/,
      /youtube\.com\/v\/([^#&?]*)/,
      /youtube\.com\/user\/[^\/]*#[^\/]*\/[^\/]*\/[^\/]*\/([^#&?]*)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1] && match[1].length === 11) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }
    return null;
  };

  const isDirectVideoUrl = (url: string) => {
    return /\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i.test(url);
  };

  const isImageUrl = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?$/i.test(url);
  };

  if (type === 'video') {
    const embedUrl = getYouTubeEmbedUrl(url);
    
    if (embedUrl) {
      return (
        <div className={`relative aspect-video rounded-lg overflow-hidden border ${className}`}>
          <iframe
            src={embedUrl}
            title="YouTube video preview"
            className="w-full h-full"
            allowFullScreen
            loading="lazy"
          />
        </div>
      );
    } else if (isDirectVideoUrl(url)) {
      return (
        <div className={`relative aspect-video rounded-lg overflow-hidden border ${className}`}>
          <video
            src={url}
            controls
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="flex items-center justify-center h-full bg-muted">
                    <div class="text-center">
                      <div class="h-12 w-12 mx-auto mb-3 rounded-full bg-destructive/10 flex items-center justify-center">
                        <svg class="h-6 w-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                      </div>
                      <p class="text-sm text-destructive">Video failed to load</p>
                      <p class="text-xs text-muted-foreground mt-1">Check if the URL is valid</p>
                    </div>
                  </div>
                `;
              }
            }}
          />
        </div>
      );
    } else {
      return (
        <div className={`flex items-center justify-center aspect-video bg-muted rounded-lg border ${className}`}>
          <div className="text-center">
            <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-amber-500/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-amber-500" />
            </div>
            <p className="text-sm font-medium text-foreground">Invalid video URL</p>
            <p className="text-xs text-muted-foreground mt-1">
              Supported: YouTube links or direct video files (.mp4, .webm, etc.)
            </p>
          </div>
        </div>
      );
    }
  }

  if (type === 'image') {
    return (
      <div className={`relative aspect-video rounded-lg overflow-hidden border ${className}`}>
        <img
          src={url}
          alt="Image preview"
          className="w-full h-full object-cover"
          onLoad={(e) => {
            // Image loaded successfully
            const target = e.target as HTMLImageElement;
            target.style.opacity = '1';
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="flex items-center justify-center h-full bg-muted">
                  <div class="text-center">
                    <div class="h-12 w-12 mx-auto mb-3 rounded-full bg-destructive/10 flex items-center justify-center">
                      <svg class="h-6 w-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                      </svg>
                    </div>
                    <p class="text-sm text-destructive">Image failed to load</p>
                    <p class="text-xs text-muted-foreground mt-1">Check if the URL is valid and accessible</p>
                  </div>
                </div>
              `;
            }
          }}
          style={{ opacity: '0', transition: 'opacity 0.3s ease' }}
        />
      </div>
    );
  }

  return null;
}
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