"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
}

/**
 * VideoPlayer Component
 * Responsibility: Display and control video playback
 */
export function VideoPlayer({ 
  videoUrl = "https://www.youtube.com/embed/pjM5WaU7_GU",
  thumbnailUrl,
  title = "Video giới thiệu VISC"
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="relative w-full h-[280px] rounded-xl overflow-hidden bg-gray-100 shadow-lg">
      {!isPlaying ? (
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer text-center"
            onClick={() => setIsPlaying(true)}
          >
            <div className="relative w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center shadow-lg transition-colors mx-auto mb-3">
              <Play className="w-7 h-7 text-white ml-1" fill="white" />
            </div>
            <p className="text-sm text-gray-600 font-medium">{title}</p>
          </motion.div>
        </div>
      ) : (
        <iframe
          className="w-full h-full"
          src={`${videoUrl}?autoplay=1&mute=1&loop=1&playlist=pjM5WaU7_GU`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
