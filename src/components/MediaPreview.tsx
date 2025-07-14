import React from 'react';
import { ImageIcon, VideoIcon, AlertCircle } from 'lucide-react';

interface MediaPreviewProps {
  url: string;
  type: 'image' | 'video';
  className?: string;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ url, type, className = '' }) => {
  if (!url.trim()) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 ${className}`}>
        {type === 'image' ? (
          <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
        ) : (
          <VideoIcon className="w-12 h-12 text-gray-400 mb-2" />
        )}
        <p className="text-sm text-gray-500">
          {type === 'image' ? 'Image preview will appear here' : 'Video preview will appear here'}
        </p>
      </div>
    );
  }

  if (type === 'image') {
    const isValidImageUrl = /^(\.\/|\.\.\/|\/|https?:\/\/).*\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i.test(url);
    
    if (!isValidImageUrl) {
      return (
        <div className={`flex flex-col items-center justify-center p-6 border border-red-200 rounded-lg bg-red-50 ${className}`}>
          <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
          <p className="text-sm text-red-600 text-center">
            Invalid image URL. Please use a direct link to an image file or a local path.
          </p>
        </div>
      );
    }

    return (
      <div className={`relative overflow-hidden rounded-lg border ${className}`}>
        <img
          src={url}
          alt="Preview"
          className="w-full h-48 object-cover transition-opacity duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const errorDiv = target.nextElementSibling as HTMLElement;
            if (errorDiv) {
              errorDiv.style.display = 'flex';
              if (url.startsWith('./') || url.startsWith('../') || url.startsWith('/')) {
                const errorText = errorDiv.querySelector('p');
                if (errorText) {
                  errorText.textContent = 'Failed to load local image. Please check the file path.';
                }
              }
            }
          }}
          onLoad={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.opacity = '1';
          }}
          style={{ opacity: 0 }}
        />
        <div className="hidden flex-col items-center justify-center p-6 border border-red-200 rounded-lg bg-red-50">
          <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
          <p className="text-sm text-red-600 text-center">
            Failed to load image. Please check the URL.
          </p>
        </div>
      </div>
    );
  }

  if (type === 'video') {
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);

    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return (
        <div className={`relative overflow-hidden rounded-lg border ${className}`}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video preview"
            className="w-full h-48"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    const isValidVideoUrl = /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)(\?.*)?$/i.test(url);
    
    if (isValidVideoUrl) {
      return (
        <div className={`relative overflow-hidden rounded-lg border ${className}`}>
          <video
            src={url}
            controls
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              target.style.display = 'none';
              const errorDiv = target.nextElementSibling as HTMLElement;
              if (errorDiv) errorDiv.style.display = 'flex';
            }}
          />
          <div className="hidden flex-col items-center justify-center p-6 border border-red-200 rounded-lg bg-red-50">
            <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
            <p className="text-sm text-red-600 text-center">
              Failed to load video. Please check the URL.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className={`flex flex-col items-center justify-center p-6 border border-red-200 rounded-lg bg-red-50 ${className}`}>
        <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
        <p className="text-sm text-red-600 text-center">
          Invalid video URL. Please use a YouTube link or direct video file URL.
        </p>
        <p className="text-xs text-red-500 mt-1">
          Supported: YouTube, .mp4, .webm, .ogg, .mov, .avi
        </p>
      </div>
    );
  }

  return null;
};

export default MediaPreview;