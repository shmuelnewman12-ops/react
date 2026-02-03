import React from 'react';
import { Music } from 'lucide-react';
import Card from './Card';

/**
 * Artists Grid Component
 * @param {Object} props - Component props
 * @param {string} props.theme - Current theme
 * @param {Array} props.artists - Array of artist objects
 * @param {Function} props.onArtistSelect - Artist selection callback
 * @returns {JSX.Element}
 */
const ArtistsGrid = ({ theme, artists, onArtistSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {artists.map((artist, idx) => (
        <Card
          key={idx}
          theme={theme}
          onClick={() => onArtistSelect(artist)}
        >
          <div className="relative aspect-square rounded-full bg-gradient-to-br from-violet-500 to-purple-600 p-1 mb-4">
            <div
              className={`w-full h-full rounded-full flex items-center justify-center ${
                theme === 'light'
                  ? 'bg-white'
                  : theme === 'dark'
                    ? 'bg-gray-800'
                    : 'bg-black'
              }`}
            >
              <Music
                size={40}
                className="text-violet-500 group-hover:scale-110 transition-transform"
              />
            </div>
          </div>
          <p className="font-semibold text-sm text-center truncate">
            {artist.name}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default ArtistsGrid;
