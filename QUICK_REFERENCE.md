# Quick Reference - Component & Hook Usage

A quick reference for understanding and using the refactored music player.

## Project Layout

```
test/src/
├── MusicPlayer.jsx          (Main orchestrator component)
├── components/              (UI presentation components)
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── Card.jsx
│   ├── PlayerBar.jsx
│   ├── EmptyState.jsx
│   ├── ArtistsGrid.jsx
│   ├── AlbumsGrid.jsx
│   ├── TracksGrid.jsx
│   └── ContentViews.jsx
├── hooks/                   (Business logic & state)
│   ├── useTheme.js
│   ├── useAudio.js
│   └── useMusic.js
└── utils/                   (Constants & helpers)
    ├── constants.js
    └── helpers.js
```

## Component Usage Examples

### Sidebar
**Purpose**: Theme toggle and directory selection
```javascript
<Sidebar
  theme={theme}
  onThemeToggle={cycleTheme}
  onSelectDirectory={selectDirectory}
/>
```

### Header
**Purpose**: App branding and title
```javascript
<Header theme={theme} title="webp3" />
```

### Card
**Purpose**: Generic card for grid items
```javascript
<Card
  theme={theme}
  onClick={() => playTrack(track)}
  isActive={currentTrack?.name === track.name}
>
  {/* Card content */}
</Card>
```

### PlayerBar
**Purpose**: Audio playback controls
```javascript
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
```

### Grid Components
**Purpose**: Display artists, albums, or tracks
```javascript
<ArtistsGrid
  theme={theme}
  artists={artists}
  onArtistSelect={selectArtist}
/>

<AlbumsGrid
  theme={theme}
  albums={albums}
  onAlbumSelect={selectAlbum}
/>

<TracksGrid
  theme={theme}
  tracks={tracks}
  currentTrack={currentTrack}
  onTrackSelect={playTrack}
/>
```

## Hook Usage Examples

### useTheme
**Purpose**: Manage theme state and cycling
```javascript
const { theme, cycleTheme } = useTheme();

// theme: 'light' | 'dark' | 'amoled'
// cycleTheme(): cycles to next theme
```

### useMusic
**Purpose**: Manage music library navigation
```javascript
const {
  directory,
  artists,           // Artist list
  selectedArtist,    // Selected artist object
  albums,            // Album list
  selectedAlbum,     // Selected album object
  tracks,            // Track list
  currentTrack,      // Currently playing track
  setCurrentTrack,   // Set current track
  selectDirectory,   // Browse for music folder
  selectArtist,      // Select artist and load albums
  selectAlbum,       // Select album and load tracks
  resetSelection,    // Go back to artists view
  resetAlbumSelection, // Go back to albums view
} = useMusic();
```

### useAudio
**Purpose**: Manage audio playback
```javascript
const {
  audioRef,          // Reference to <audio> element
  isPlaying,         // Boolean playback state
  setIsPlaying,      // Set playback state
  currentTime,       // Current playback time (seconds)
  duration,          // Track duration (seconds)
  volume,            // Volume level (0-1)
  togglePlayPause,   // Toggle play/pause
  setCurrentTrackTime, // Seek to time (seconds)
  setAudioVolume,    // Set volume (0-1)
} = useAudio(onTrackEnd);
```

## Utility Functions

### formatTime(seconds)
Convert seconds to MM:SS format
```javascript
import { formatTime } from './utils/helpers';

formatTime(125);    // Returns "2:05"
formatTime(45);     // Returns "0:45"
```

### removeFileExtension(filename)
Remove audio extensions from filename
```javascript
import { removeFileExtension } from './utils/helpers';

removeFileExtension('song.mp3');     // Returns "song"
removeFileExtension('track.wav');    // Returns "track"
```

### isAudioFile(filename)
Check if filename is audio
```javascript
import { isAudioFile } from './utils/helpers';

isAudioFile('song.mp3');    // Returns true
isAudioFile('image.jpg');   // Returns false
```

### sortByName(items)
Sort items alphabetically
```javascript
import { sortByName } from './utils/helpers';

const sorted = sortByName(artists);  // Sorted by name
```

## Constants

### Themes
```javascript
import { THEMES } from './utils/constants';

THEMES.LIGHT    // 'light'
THEMES.DARK     // 'dark'
THEMES.AMOLED   // 'amoled'
```

### Audio Extensions
```javascript
import { AUDIO_EXTENSIONS } from './utils/constants';

// ['.mp3', '.wav', '.ogg', '.m4a', '.flac']
```

### Theme Classes
```javascript
import { THEME_CLASSES } from './utils/constants';

THEME_CLASSES['dark'].bg      // Background gradient
THEME_CLASSES['dark'].card    // Card styling
THEME_CLASSES['dark'].border  // Border color
```

## Common Tasks

### Add a Feature
1. Create hook in `hooks/` for state/logic
2. Create component in `components/` for UI
3. Import and use in main component

### Modify Styling
1. Update `THEME_CLASSES` in `utils/constants.js`
2. Components automatically pick up new styles

### Add a New Theme
1. Add to `THEMES` in `utils/constants.js`
2. Add styling to `THEME_CLASSES`
3. Update `THEME_LIST` if needed

### Debug State
1. Check relevant hook (useMusic, useAudio, useTheme)
2. Use React DevTools to inspect hook state
3. Add console logs in hooks

### Test a Feature
1. Extract the hook
2. Create test file: `__tests__/hooks.test.js`
3. Test hook independently

## Component Hierarchy

```
MusicPlayer (orchestrator)
├── Sidebar
│   └── buttons: theme, folder
├── Main Content
│   ├── Header
│   └── View (one of):
│       ├── EmptyState
│       ├── ArtistsView → ArtistsGrid → Card
│       ├── AlbumsView → AlbumsGrid → Card
│       └── TracksView → TracksGrid → Card
└── PlayerBar
    ├── Track info
    ├── Playback controls
    ├── Volume control
    └── Progress bar
```

## Data Flow

```
User Action
↓
Hook (useMusic, useAudio, useTheme)
↓
State Update
↓
Component Re-render
↓
UI Update
```

## State Objects

### Artist Object
```javascript
{
  name: string,      // Artist name
  handle: FileSystemDirectoryHandle
}
```

### Album Object
```javascript
{
  name: string,      // Album name
  handle: FileSystemDirectoryHandle
}
```

### Track Object
```javascript
{
  name: string,      // Track filename with extension
  handle: FileSystemFileHandle
}
```

## Tips & Tricks

### Get all theme classes
```javascript
const themeClass = THEME_CLASSES[theme];
// themeClass.bg, .text, .card, .border, .hoverBg, .innerBg
```

### Skip to next track
```javascript
skipTrack('next');   // Next track
skipTrack('prev');   // Previous track
```

### Format display names
```javascript
// Track: "song.mp3" → "song"
removeFileExtension(track.name)

// Artist/Album: use name directly
artist.name, album.name
```

### Check if playing
```javascript
if (isPlaying) {
  // Currently playing
}
```

### Check if track selected
```javascript
if (currentTrack?.name === track.name) {
  // Show active state
}
```

## Troubleshooting

### Issue: Audio not playing
- Check `showDirectoryPicker` permission
- Verify audio file format is supported
- Check browser DevTools for errors

### Issue: Theme not updating
- Verify `useTheme()` is called
- Check `cycleTheme()` is connected to button
- Confirm theme value is used in components

### Issue: Library not loading
- Ensure folder structure matches Artist/Album/Track
- Check file extensions are supported
- Verify browser permissions for file access

### Issue: Player bar not showing
- Verify `currentTrack` is set
- Check `PlayerBar` is rendered conditionally
- Ensure audio file is loading

## Performance Tips

1. Use `React.memo()` for expensive grids
2. `useCallback` prevents child re-renders
3. Proper dependencies in `useEffect`
4. Clean up event listeners

## Accessibility Tips

1. All buttons have `aria-label`
2. Inputs have `title` attributes
3. Semantic HTML for structure
4. Keyboard navigation works

---

For detailed information, see:
- `REFACTORING_GUIDE.md` - Architecture overview
- `BEST_PRACTICES.md` - Coding standards
- JSDoc comments in component files
