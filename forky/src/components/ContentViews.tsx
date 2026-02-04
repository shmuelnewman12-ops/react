import React from 'react';
import { Card } from './Card';
import type { Theme, Track, Album, Artist } from '../types';
import { removeFileExtension } from '../utils/helpers';

interface TracksViewProps {
  theme: Theme;
  selectedAlbum: Album;
  selectedArtist: Artist;
  tracks: Track[];
  currentTrack: Track | null;
  onTrackSelect: (track: Track) => void;
  onBack: () => void;
}

export const TracksView: React.FC<TracksViewProps> = ({
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
      <button
        onClick={onBack}
        className="text-xl font-semibold mb-6 hover:text-violet-500 transition-colors flex items-center gap-2 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to {selectedArtist.name}
      </button>
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
        {selectedAlbum.name}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {tracks.map((track, idx) => (
          <Card
            key={idx}
            name={removeFileExtension(track.name)}
            onClick={() => onTrackSelect(track)}
            isActive={currentTrack?.name === track.name}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

interface AlbumsViewProps {
  theme: Theme;
  selectedArtist: Artist;
  albums: Album[];
  onAlbumSelect: (album: Album) => void;
  onBack: () => void;
}

export const AlbumsView: React.FC<AlbumsViewProps> = ({
  theme,
  selectedArtist,
  albums,
  onAlbumSelect,
  onBack,
}) => {
  return (
    <div>
      <button
        onClick={onBack}
        className="text-xl font-semibold mb-6 hover:text-violet-500 transition-colors flex items-center gap-2 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to Artists
      </button>
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
        {selectedArtist.name}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {albums.map((album, idx) => (
          <Card
            key={idx}
            name={album.name}
            onClick={() => onAlbumSelect(album)}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

interface ArtistsViewProps {
  theme: Theme;
  artists: Artist[];
  onArtistSelect: (artist: Artist) => void;
}

export const ArtistsView: React.FC<ArtistsViewProps> = ({
  theme,
  artists,
  onArtistSelect,
}) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
        Artists
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {artists.map((artist, idx) => (
          <Card
            key={idx}
            name={artist.name}
            onClick={() => onArtistSelect(artist)}
            theme={theme}
            isRound={true}
          />
        ))}
      </div>
    </div>
  );
};
