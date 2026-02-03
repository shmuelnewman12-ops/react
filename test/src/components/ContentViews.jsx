import React, { useCallback } from 'react';
import TracksGrid from './TracksGrid';

/**
 * Tracks View Component
 * @param {Object} props - Component props
 * @param {string} props.theme - Current theme
 * @param {Object} props.selectedAlbum - Selected album
 * @param {Object} props.selectedArtist - Selected artist
 * @param {Array} props.tracks - Array of tracks
 * @param {Object} props.currentTrack - Currently playing track
 * @param {Function} props.onTrackSelect - Track selection callback
 * @param {Function} props.onBack - Back button callback
 * @returns {JSX.Element}
 */
const TracksView = ({
  theme,
  selectedAlbum,
  selectedArtist,
  tracks,
  currentTrack,
  onTrackSelect,
  onBack,
}) => {
  return (
    <div>
      <BackButton theme={theme} onBack={onBack} label={selectedArtist.name} />
      <SectionTitle theme={theme} title={selectedAlbum.name} />
      <TracksGrid
        theme={theme}
        tracks={tracks}
        currentTrack={currentTrack}
        onTrackSelect={onTrackSelect}
      />
    </div>
  );
};

/**
 * Albums View Component
 * @param {Object} props - Component props
 * @param {string} props.theme - Current theme
 * @param {Object} props.selectedArtist - Selected artist
 * @param {Array} props.albums - Array of albums
 * @param {Function} props.onAlbumSelect - Album selection callback
 * @param {Function} props.onBack - Back button callback
 * @returns {JSX.Element}
 */
const AlbumsView = ({
  theme,
  selectedArtist,
  albums,
  onAlbumSelect,
  onBack,
}) => {
  const AlbumsGrid = React.lazy(() => import('./AlbumsGrid'));

  return (
    <div>
      <BackButton theme={theme} onBack={onBack} label="Artists" />
      <SectionTitle theme={theme} title={selectedArtist.name} />
      <React.Suspense fallback={<div>Loading...</div>}>
        <AlbumsGrid
          theme={theme}
          albums={albums}
          onAlbumSelect={onAlbumSelect}
        />
      </React.Suspense>
    </div>
  );
};

/**
 * Artists View Component
 * @param {Object} props - Component props
 * @param {string} props.theme - Current theme
 * @param {Array} props.artists - Array of artists
 * @param {Function} props.onArtistSelect - Artist selection callback
 * @returns {JSX.Element}
 */
const ArtistsView = ({ theme, artists, onArtistSelect }) => {
  const ArtistsGrid = React.lazy(() => import('./ArtistsGrid'));

  return (
    <div>
      <SectionTitle theme={theme} title="Artists" />
      <React.Suspense fallback={<div>Loading...</div>}>
        <ArtistsGrid
          theme={theme}
          artists={artists}
          onArtistSelect={onArtistSelect}
        />
      </React.Suspense>
    </div>
  );
};

/**
 * Back Button Component
 * @param {Object} props - Component props
 * @param {string} props.theme - Current theme
 * @param {Function} props.onBack - Click callback
 * @param {string} props.label - Button label
 * @returns {JSX.Element}
 */
const BackButton = ({ theme, onBack, label }) => (
  <button
    onClick={onBack}
    className="text-xl font-semibold mb-6 hover:text-violet-500 transition-colors flex items-center gap-2 group"
  >
    <span className="group-hover:-translate-x-1 transition-transform">←</span>
    Back to {label}
  </button>
);

/**
 * Section Title Component
 * @param {Object} props - Component props
 * @param {string} props.theme - Current theme
 * @param {string} props.title - Section title
 * @returns {JSX.Element}
 */
const SectionTitle = ({ theme, title }) => (
  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
    {title}
  </h2>
);

export { TracksView, AlbumsView, ArtistsView };
