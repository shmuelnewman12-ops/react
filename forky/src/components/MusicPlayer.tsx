import React, { useCallback } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { PlayerBar } from './PlayerBar';
import { EmptyState } from './EmptyState';
import { TracksView, AlbumsView, ArtistsView } from './ContentViews';
import { useTheme } from '../hooks/useTheme';
import { useAudio } from '../hooks/useAudio';
import { useMusic } from '../hooks/useMusic';
import { THEME_CLASSES } from '../utils/constants';
import type { Track } from '../types';

export const MusicPlayer: React.FC = () => {
  const { theme, cycleTheme } = useTheme();
  const {
    artists,
    selectedArtist,
    albums,
    selectedAlbum,
    tracks,
    currentTrack,
    setCurrentTrack,
    selectDirectory,
    selectArtist,
    selectAlbum,
    resetSelection,
    resetAlbumSelection,
  } = useMusic();

  const handleSkipTrack = useCallback(
    (direction: 'prev' | 'next') => {
      if (!currentTrack) return;
      const currentIndex = tracks.findIndex(
        (t) => t.name === currentTrack.name
      );
      const nextIndex =
        direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= 0 && nextIndex < tracks.length) {
        playTrack(tracks[nextIndex]);
      }
    },
    [currentTrack, tracks]
  );

  const {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlayPause,
    setCurrentTrackTime,
    setAudioVolume,
  } = useAudio(() => handleSkipTrack('next'));

  const playTrack = useCallback(
    async (track: Track) => {
      try {
        const file = await track.handle.getFile();
        const url = URL.createObjectURL(file);
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.load();
          await audioRef.current.play();
          setCurrentTrack(track);
        }
      } catch (err) {
        console.error('Error playing track:', err);
      }
    },
    [audioRef, setCurrentTrack]
  );

  const themeClass = THEME_CLASSES[theme];

  const renderContent = () => {
    if (artists.length === 0) {
      return <EmptyState theme={theme} />;
    }

    if (selectedAlbum) {
      return (
        <TracksView
          theme={theme}
          selectedAlbum={selectedAlbum}
          selectedArtist={selectedArtist!}
          tracks={tracks}
          currentTrack={currentTrack}
          onTrackSelect={playTrack}
          onBack={resetAlbumSelection}
        />
      );
    }

    if (selectedArtist) {
      return (
        <AlbumsView
          theme={theme}
          selectedArtist={selectedArtist}
          albums={albums}
          onAlbumSelect={selectAlbum}
          onBack={resetSelection}
        />
      );
    }

    return (
      <ArtistsView
        theme={theme}
        artists={artists}
        onArtistSelect={selectArtist}
      />
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-all duration-300 ${themeClass}`}
    >
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          theme={theme}
          onCycleTheme={cycleTheme}
          onSelectDirectory={selectDirectory}
        />

        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto">
            <Header theme={theme} />
            {renderContent()}
          </div>
        </div>
      </div>

      <PlayerBar
        theme={theme}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        selectedArtist={selectedArtist}
        selectedAlbum={selectedAlbum}
        onTogglePlayPause={togglePlayPause}
        onSkipTrack={handleSkipTrack}
        onSetCurrentTime={setCurrentTrackTime}
        onSetVolume={setAudioVolume}
      />

      <audio ref={audioRef} />
    </div>
  );
};
