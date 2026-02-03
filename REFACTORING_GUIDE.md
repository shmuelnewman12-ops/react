# Music Player - Refactored React Architecture

A modern, maintainable React music player built with best practices for component composition, state management, and code organization.

## Project Structure

```
src/
├── MusicPlayer.jsx          # Main component that orchestrates all features
├── components/              # Reusable UI components
│   ├── Sidebar.jsx         # Navigation sidebar with theme toggle
│   ├── Header.jsx          # App header with branding
│   ├── Card.jsx            # Reusable card component for grid items
│   ├── PlayerBar.jsx       # Music player controls & progress bar
│   ├── EmptyState.jsx      # Displayed when no music folder selected
│   ├── ArtistsGrid.jsx     # Grid layout for artists
│   ├── AlbumsGrid.jsx      # Grid layout for albums
│   ├── TracksGrid.jsx      # Grid layout for tracks
│   └── ContentViews.jsx    # Composite views for navigation states
├── hooks/                   # Custom React hooks
│   ├── useTheme.js         # Theme management (light/dark/amoled)
│   ├── useAudio.js         # Audio playback state & controls
│   └── useMusic.js         # Music library navigation & state
└── utils/                   # Utility functions & constants
    ├── constants.js        # Theme definitions & audio extensions
    └── helpers.js          # Helper functions for common operations
```

## Key Features

### Component Architecture

Each component is **single-responsibility** and **reusable**:

- **Sidebar**: Theme toggling and directory selection
- **Header**: Branded header display
- **Card**: Generic card component used for artists, albums, and tracks
- **PlayerBar**: Full music player with controls, progress bar, and volume
- **EmptyState**: UX-friendly message when no music is loaded
- **Grid Components**: Specialized grid layouts for different content types
- **ContentViews**: Navigation management for different view states

### Custom Hooks

Separates business logic from UI rendering:

#### `useTheme()`
- Manages theme state (light/dark/amoled)
- Provides `theme` state and `cycleTheme()` function
- Isolated theme logic for easy testing and reuse

#### `useAudio()`
- Manages audio playback state
- Handles play/pause, seek, and volume
- Audio event listeners with proper cleanup
- Returns: `audioRef`, `isPlaying`, `currentTime`, `duration`, `volume`, and control functions

#### `useMusic()`
- Manages music library navigation
- Handles directory scanning, album/track loading
- Tracks: `artists`, `selectedArtist`, `albums`, `selectedAlbum`, `tracks`, `currentTrack`
- Methods: `selectDirectory()`, `selectArtist()`, `selectAlbum()`, `resetSelection()`

### Utilities

#### Constants
- Theme styling classes for light/dark/amoled themes
- Audio file extensions
- Theme list for cycling

#### Helpers
- `formatTime()`: Convert seconds to MM:SS format
- `removeFileExtension()`: Clean up file names for display
- `isAudioFile()`: Validate audio file types
- `sortByName()`: Alphabetically sort items

## Best Practices Implemented

### 1. **Component Composition**
- Breaking large monolithic components into smaller, focused ones
- Each component has a single responsibility
- Props are clearly documented with JSDoc

### 2. **State Management**
- Custom hooks encapsulate related state and logic
- Separation of concerns: UI components only handle presentation
- Easy to test logic independently from rendering

### 3. **Code Reusability**
- Generic `Card` component used throughout
- Common styling patterns extracted to constants
- Helper functions eliminate code duplication

### 4. **Performance**
- `useCallback` prevents unnecessary re-renders
- Audio event listeners are properly cleaned up
- Lazy loading for grid components

### 5. **Accessibility**
- ARIA labels on interactive elements
- Semantic HTML with proper titles
- Keyboard-accessible controls

### 6. **Documentation**
- JSDoc comments on all components and functions
- Clear prop descriptions
- Purpose comments in hooks

### 7. **Error Handling**
- Try-catch blocks for file operations
- Console error logging for debugging
- Graceful fallbacks for failed operations

## Data Flow

```
MusicPlayer (Main)
├─ useTheme() → theme state
├─ useMusic() → library & navigation state
├─ useAudio() → playback state & controls
└─ Components consume state via props
   ├─ Sidebar → theme & directory
   ├─ Content → artists/albums/tracks display
   └─ PlayerBar → playback controls
```

## Usage

### Select Music Folder
Click the folder icon in the sidebar to select a music directory. The app will scan for:
- Artists (top-level directories)
- Albums (subdirectories within artists)
- Tracks (audio files within albums)

### Theme Switching
Click the sun/moon icon in the sidebar to cycle through themes:
- **Light**: Bright, clean interface
- **Dark**: Dark gray theme (default)
- **AMOLED**: Pure black theme for OLED displays

### Playback
- Click any track to play
- Use player controls to pause/play, skip, seek
- Adjust volume with the volume slider
- Progress auto-advances to next track when finished

## File Structure Benefits

### Easy to Navigate
- Clear folder organization by concern (components, hooks, utils)
- Related code grouped together
- Easy to find specific functionality

### Easy to Test
- Components have minimal dependencies
- Hooks can be tested independently
- Pure utility functions are easily testable
- Props are explicit and documented

### Easy to Maintain
- Changes to one component don't affect others
- Adding new features doesn't require modifying existing components
- Theme styling is centralized
- Helper functions prevent duplication

### Easy to Extend
- Add new grid types by creating new components
- Add new hooks for new features
- Add new themes by extending constants
- Extract components for reuse in other projects

## Component Props Reference

### `Sidebar`
- `theme`: Current theme
- `onThemeToggle`: Callback for theme cycling
- `onSelectDirectory`: Callback for folder selection

### `PlayerBar`
- `theme`: Current theme
- `currentTrack`: Currently playing track object
- `selectedArtist`: Selected artist object
- `selectedAlbum`: Selected album object
- `isPlaying`: Boolean playback state
- `currentTime`: Current playback time in seconds
- `duration`: Total track duration in seconds
- `volume`: Volume level (0-1)
- `onPlayPause`: Play/pause callback
- `onSkip`: Skip callback (receives 'next' or 'prev')
- `onSeek`: Seek callback (receives time value)
- `onVolumeChange`: Volume change callback

### `Card`
- `theme`: Current theme
- `onClick`: Click handler
- `children`: Card content
- `isActive`: Whether card is selected

## Future Enhancements

- Add playlist support
- Shuffle and repeat modes
- Search functionality
- Album artwork display
- Keyboard shortcuts
- Persistent playback state
- Track metadata display
- Visualization effects
