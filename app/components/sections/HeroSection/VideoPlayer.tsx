"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
}

/**
 * VideoPlayer Component
 * Responsibility: Display and control video playback.
 * Note: The "Unchecked runtime.lastError" message is typically caused by browser extensions
 * interacting with the iframe. Loading the iframe only when needed (on click) and 
 * ensuring a correct URL structure helps minimize these occurrences.
 */
export function VideoPlayer({
  videoUrl = "https://www.youtube.com/embed/Swpi6hfyR4A?si=BhveuYKhXSZHI54s",
  thumbnailUrl = "https://img.youtube.com/vi/Swpi6hfyR4A/maxresdefault.jpg",
  title = "Video giới thiệu VITC"
}: VideoPlayerProps) {
  // Set to true by default to allow autoplay when entering the site
  const [isPlaying, setIsPlaying] = useState(true);

  const finalVideoSrc = useMemo(() => {
    // Determine the separator (? or &) based on whether the URL already has parameters
    const separator = videoUrl.includes('?') ? '&' : '?';
    
    // Extract video ID for the loop/playlist parameter if needed
    const videoIdMatch = videoUrl.match(/\/embed\/([^/?]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';
    
    // mute=1 is REQUIRED for autoplay to work in modern browsers
    return `${videoUrl}${separator}autoplay=1&mute=1&loop=1${videoId ? `&playlist=${videoId}` : ''}`;
  }, [videoUrl]);

  return (
    <div className="relative w-full h-[280px] rounded-xl overflow-hidden bg-gray-100 shadow-xl border border-gray-100 group">
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div
            key="thumbnail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-pointer overflow-hidden"
            onClick={() => setIsPlaying(true)}
          >
            {/* Thumbnail Image or Gradient */}
            {thumbnailUrl ? (
              <>
                <img 
                  src={thumbnailUrl} 
                  alt={title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-white to-green-600/10" />
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center shadow-xl mb-4 transition-colors z-10"
              >
                <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
              </motion.div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/50 shadow-sm z-10">
                <p className="text-sm font-semibold text-gray-800">{title}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Click to play</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full"
          >
            <iframe
              className="w-full h-full"
              src={finalVideoSrc}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
