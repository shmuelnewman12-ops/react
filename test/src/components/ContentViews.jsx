import React from 'react';
import TracksGrid from './TracksGrid';
import AlbumsGrid from './AlbumsGrid';
import ArtistsGrid from './ArtistsGrid';

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

const AlbumsView = ({
  theme,
  selectedArtist,
  albums,
  onAlbumSelect,
  onBack,
}) => {
  return (
    <div>
      <BackButton theme={theme} onBack={onBack} label="Artists" />
      <SectionTitle theme={theme} title={selectedArtist.name} />
      <AlbumsGrid
        theme={theme}
        albums={albums}
        onAlbumSelect={onAlbumSelect}
      />
    </div>
  );
};

const ArtistsView = ({ theme, artists, onArtistSelect }) => {
  return (
    <div>
      <SectionTitle theme={theme} title="Artists" />
      <ArtistsGrid
        theme={theme}
        artists={artists}
        onArtistSelect={onArtistSelect}
      />
    </div>
  );
};

const BackButton = ({ theme, onBack, label }) => (
  <button
    onClick={onBack}
    className="text-xl font-semibold mb-6 hover:text-violet-500 transition-colors flex items-center gap-2 group"
  >
    <span className="group-hover:-translate-x-1 transition-transform">←</span>
    Back to {label}
  </button>
);

const SectionTitle = ({ theme, title }) => (
  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
    {title}
  </h2>
);

export { TracksView, AlbumsView, ArtistsView };
