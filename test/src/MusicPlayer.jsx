import React, { useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PlayerBar from './components/PlayerBar';
import EmptyState from './components/EmptyState';
import { TracksView, AlbumsView, ArtistsView } from './components/ContentViews';
import { useTheme } from './hooks/useTheme';
import { useAudio } from './hooks/useAudio';
import { useMusic } from './hooks/useMusic';
import { THEME_CLASSES } from './utils/constants';

const MusicPlayer = () => {
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

  const {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlayPause,
    setCurrentTrackTime,
    setAudioVolume,
  } = useAudio(() => skipTrack('next'));

  const playTrack = useCallback(
    async (track) => {
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

  const skipTrack = useCallback(
    (direction) => {
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
    [currentTrack, tracks, playTrack]
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
          selectedArtist={selectedArtist}
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
      className={`min-h-screen flex flex-col font-sans transition-all duration-500 ${themeClass.bg} ${themeClass.text}`}
    >
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          theme={theme}
          onThemeToggle={cycleTheme}
          onSelectDirectory={selectDirectory}
        />

        {/* Content Area - Centered */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-6xl">
              <Header theme={theme} />
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Player Bar */}
      <PlayerBar
        theme={theme}
        currentTrack={currentTrack}
        selectedArtist={selectedArtist}
        selectedAlbum={selectedAlbum}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        onPlayPause={togglePlayPause}
        onSkip={skipTrack}
        onSeek={setCurrentTrackTime}
        onVolumeChange={setAudioVolume}
      />

      {/* Hidden Audio Element */}
      <audio ref={audioRef} crossOrigin="anonymous" />
    </div>
  );
};

export default MusicPlayer;
