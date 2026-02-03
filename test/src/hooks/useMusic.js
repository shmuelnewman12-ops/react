import { useState, useCallback } from 'react';
import { isAudioFile, sortByName } from '../utils/helpers';

export const useMusic = () => {
  const [directory, setDirectory] = useState(null);
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  const scanDirectory = useCallback(async (dirHandle) => {
    const artistList = [];
    try {
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'directory') {
          artistList.push({ name: entry.name, handle: entry });
        }
      }
      setArtists(sortByName(artistList));
    } catch (err) {
      console.error('Error scanning directory:', err);
    }
  }, []);

  const selectDirectory = useCallback(async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      setDirectory(dirHandle);
      await scanDirectory(dirHandle);
    } catch (err) {
      console.error('Error selecting directory:', err);
    }
  }, [scanDirectory]);

  const loadArtistAlbums = useCallback(async (artistHandle) => {
    const albumList = [];
    try {
      for await (const entry of artistHandle.values()) {
        if (entry.kind === 'directory') {
          albumList.push({ name: entry.name, handle: entry });
        }
      }
      setAlbums(sortByName(albumList));
    } catch (err) {
      console.error('Error loading albums:', err);
    }
  }, []);

  const loadAlbumTracks = useCallback(async (albumHandle) => {
    const trackList = [];
    try {
      for await (const entry of albumHandle.values()) {
        if (entry.kind === 'file' && isAudioFile(entry.name)) {
          trackList.push({ name: entry.name, handle: entry });
        }
      }
      setTracks(sortByName(trackList));
    } catch (err) {
      console.error('Error loading tracks:', err);
    }
  }, []);

  const selectArtist = useCallback((artist) => {
    setSelectedArtist(artist);
    setSelectedAlbum(null);
    setTracks([]);
    loadArtistAlbums(artist.handle);
  }, [loadArtistAlbums]);

  const selectAlbum = useCallback((album) => {
    setSelectedAlbum(album);
    loadAlbumTracks(album.handle);
  }, [loadAlbumTracks]);

  const resetSelection = useCallback(() => {
    setSelectedArtist(null);
    setSelectedAlbum(null);
    setAlbums([]);
    setTracks([]);
  }, []);

  const resetAlbumSelection = useCallback(() => {
    setSelectedAlbum(null);
    setTracks([]);
  }, []);

  return {
    directory,
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
  };
};
