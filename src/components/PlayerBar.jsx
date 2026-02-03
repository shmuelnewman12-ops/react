import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { THEME_CLASSES } from '../utils/constants';
import { formatTime, removeFileExtension } from '../utils/helpers';

/**
 * Player Bar Component - Controls and displays current track
 * @param {Object} props - Component props
 * @param {string} props.theme - Current theme
 * @param {Object} props.currentTrack - Currently playing track
 * @param {Object} props.selectedArtist - Selected artist
 * @param {Object} props.selectedAlbum - Selected album
 * @param {boolean} props.isPlaying - Whether audio is playing
 * @param {number} props.currentTime - Current playback time
 * @param {number} props.duration - Track duration
 * @param {number} props.volume - Volume level
 * @param {Function} props.onPlayPause - Play/pause callback
 * @param {Function} props.onSkip - Skip track callback (direction: 'next' | 'prev')
 * @param {Function} props.onSeek - Seek callback (time value)
 * @param {Function} props.onVolumeChange - Volume change callback
 * @returns {JSX.Element | null}
 */
const PlayerBar = ({
  theme,
  currentTrack,
  selectedArtist,
  selectedAlbum,
  isPlaying,
  currentTime,
  duration,
  volume,
  onPlayPause,
  onSkip,
  onSeek,
  onVolumeChange,
}) => {
  if (!currentTrack) return null;

  const themeClass = THEME_CLASSES[theme];

  return (
    <div
      className={`backdrop-blur-xl border-t ${
        theme === 'light'
          ? 'bg-white/80 border-gray-200'
          : theme === 'dark'
            ? 'bg-gray-800/80 border-gray-700'
            : 'bg-black/90 border-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto p-4">
        {/* Track Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0 mr-6">
            <div className="font-bold text-lg truncate">
              {removeFileExtension(currentTrack.name)}
            </div>
            <div className="text-sm text-gray-500 truncate">
              {selectedArtist?.name} • {selectedAlbum?.name}
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSkip('prev')}
              className={`p-3 rounded-full transition-all hover:scale-110 ${themeClass.hoverBg}`}
              title="Previous track"
              aria-label="Previous track"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={onPlayPause}
              className="p-4 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 transition-all hover:scale-110 shadow-lg shadow-violet-500/50"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={24} className="text-white" />
              ) : (
                <Play size={24} className="text-white ml-1" />
              )}
            </button>
            <button
              onClick={() => onSkip('next')}
              className={`p-3 rounded-full transition-all hover:scale-110 ${themeClass.hoverBg}`}
              title="Next track"
              aria-label="Next track"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 ml-6">
            <Volume2 size={20} className="text-violet-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-24 accent-violet-500"
              title="Volume"
              aria-label="Volume"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full accent-violet-500 cursor-pointer"
            title="Seek"
            aria-label="Seek track"
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

export default PlayerBar;
