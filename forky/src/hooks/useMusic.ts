import { useState, useCallback } from 'react';
import type { Artist, Album, Track } from '../types';
import { sortByName, isAudioFile } from '../utils/helpers';

export const useMusic = () => {
  const [directory, setDirectory] = useState<any>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const selectDirectory = useCallback(async () => {
    try {
      const dirHandle = await (window as any).showDirectoryPicker();
      setDirectory(dirHandle);
      await scanDirectory(dirHandle);
    } catch (err) {
      console.error('Error selecting directory:', err);
    }
  }, []);

  const scanDirectory = useCallback(async (dirHandle: any) => {
    const artistList: Artist[] = [];
    for await (const entry of dirHandle.values()) {
      if (entry.kind === 'directory') {
        artistList.push({ name: entry.name, handle: entry });
      }
    }
    setArtists(sortByName(artistList));
  }, []);

  const selectArtist = useCallback(async (artist: Artist) => {
    setSelectedArtist(artist);
    const albumList: Album[] = [];
    for await (const entry of (artist.handle as any).values()) {
      if (entry.kind === 'directory') {
        albumList.push({ name: entry.name, handle: entry });
      }
    }
    setAlbums(sortByName(albumList));
    setSelectedAlbum(null);
    setTracks([]);
  }, []);

  const selectAlbum = useCallback(async (album: Album) => {
    setSelectedAlbum(album);
    const trackList: Track[] = [];
    for await (const entry of (album.handle as any).values()) {
      if (entry.kind === 'file' && isAudioFile(entry.name)) {
        trackList.push({ name: entry.name, handle: entry });
      }
    }
    setTracks(sortByName(trackList));
  }, []);

  const resetSelection = useCallback(() => {
    setSelectedArtist(null);
    setAlbums([]);
    setSelectedAlbum(null);
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
    selectDirectory,
    setCurrentTrack,
    selectArtist,
    selectAlbum,
    resetSelection,
    resetAlbumSelection,
  };
};
