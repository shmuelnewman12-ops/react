import React from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
} from 'lucide-react';
import type { Theme, Track, Album, Artist } from '../types';
import { formatTime } from '../utils/helpers';
import { PLAYER_STYLES } from '../utils/constants';

interface PlayerBarProps {
  theme: Theme;
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  selectedArtist: Artist | null;
  selectedAlbum: Album | null;
  onTogglePlayPause: () => void;
  onSkipTrack: (direction: 'prev' | 'next') => void;
  onSetCurrentTime: (time: number) => void;
  onSetVolume: (volume: number) => void;
}

export const PlayerBar: React.FC<PlayerBarProps> = ({
  theme,
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  volume,
  selectedArtist,
  selectedAlbum,
  onTogglePlayPause,
  onSkipTrack,
  onSetCurrentTime,
  onSetVolume,
}) => {
  if (!currentTrack) return null;

  const styles = PLAYER_STYLES[theme];

  return (
    <div className={`backdrop-blur-xl border-t ${styles.bg} ${styles.border}`}>
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0 mr-6">
            <div className="font-bold text-lg truncate">
              {currentTrack.name.replace(/\.(mp3|wav|ogg|m4a|flac)$/i, '')}
            </div>
            <div className="text-sm text-gray-500 truncate">
              {selectedArtist?.name} • {selectedAlbum?.name}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSkipTrack('prev')}
              className={`p-3 rounded-full transition-all hover:scale-110 ${
                theme === 'light'
                  ? 'hover:bg-gray-100'
                  : theme === 'dark'
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-900'
              }`}
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={onTogglePlayPause}
              className="p-4 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 transition-all hover:scale-110 shadow-lg shadow-violet-500/50"
            >
              {isPlaying ? (
                <Pause size={24} className="text-white" />
              ) : (
                <Play size={24} className="text-white ml-1" />
              )}
            </button>
            <button
              onClick={() => onSkipTrack('next')}
              className={`p-3 rounded-full transition-all hover:scale-110 ${
                theme === 'light'
                  ? 'hover:bg-gray-100'
                  : theme === 'dark'
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-900'
              }`}
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="flex items-center gap-3 ml-6">
            <Volume2 size={20} className="text-violet-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onSetVolume(parseFloat(e.target.value))}
              className="w-24 accent-violet-500"
            />
          </div>
        </div>

        <div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => onSetCurrentTime(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full accent-violet-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
