# React Best Practices Guide

This document outlines the best practices implemented in the refactored music player.

## 1. Component Design

### Single Responsibility Principle
Each component has ONE clear purpose:
```javascript
// ✓ Good - Single responsibility
const Sidebar = ({ theme, onThemeToggle, onSelectDirectory }) => {
  // Only handles sidebar UI
};

// ✗ Avoid - Multiple responsibilities
const Sidebar = ({ ... allProps ... }) => {
  // Handles sidebar, playback, theme, etc.
};
```

### Props Documentation
All components include JSDoc with parameter descriptions:
```javascript
/**
 * Sidebar Component
 * @param {Object} props - Component props
 * @param {string} props.theme - Current theme
 * @param {Function} props.onThemeToggle - Theme toggle callback
 * @param {Function} props.onSelectDirectory - Directory select callback
 * @returns {JSX.Element}
 */
const Sidebar = ({ theme, onThemeToggle, onSelectDirectory }) => {
```

### Props Over State
Presentational components receive data via props, not internal state:
```javascript
// ✓ Good - Data via props
const Card = ({ theme, onClick, children, isActive }) => {
  // Pure component based on props
};

// ✗ Avoid - Managing own state
const Card = ({ theme, itemName }) => {
  const [isActive, setIsActive] = useState(false);
  // Complex state management in presentation layer
};
```

## 2. State Management with Hooks

### Custom Hooks for Business Logic
Extract state and logic into reusable hooks:
```javascript
// ✓ Good - Logic in hook
export const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  const cycleTheme = useCallback(() => {
    // theme logic
  }, []);
  return { theme, cycleTheme };
};

// Use in component
const { theme, cycleTheme } = useTheme();
```

### Proper Dependency Arrays
Always include dependencies in useEffect and useCallback:
```javascript
// ✓ Good
useEffect(() => {
  const handleEvent = () => { /* ... */ };
  audio.addEventListener('ended', handleEvent);
  return () => audio.removeEventListener('ended', handleEvent);
}, [onTrackEnd]); // Include dependency

// ✗ Avoid
useEffect(() => {
  // ... missing dependencies
}, []);
```

### Cleanup in useEffect
Always clean up subscriptions and event listeners:
```javascript
// ✓ Good
useEffect(() => {
  const handleEvent = () => { /* ... */ };
  audio.addEventListener('timeupdate', handleEvent);
  
  return () => {
    audio.removeEventListener('timeupdate', handleEvent); // Cleanup
  };
}, [dependencies]);

// ✗ Avoid
useEffect(() => {
  audio.addEventListener('timeupdate', handleEvent);
  // Missing cleanup function
}, [dependencies]);
```

## 3. Performance Optimization

### useCallback for Callbacks
Wrap callbacks in useCallback to prevent unnecessary re-renders:
```javascript
// ✓ Good
const playTrack = useCallback(
  async (track) => {
    // Implementation
  },
  [audioRef, setCurrentTrack]
);

// ✗ Avoid
const playTrack = async (track) => {
  // Recreated on every render
};
```

### Memoization
Use React.memo for expensive components:
```javascript
// ✓ Good for expensive components
export default React.memo(Card);

// Natural for grid layouts
<Grid items={items}>
  {items.map((item, idx) => (
    <Card key={idx} {...props} /> // Memoized
  ))}
</Grid>
```

## 4. Code Organization

### File Structure
Organize by feature/concern, not by type:
```
// ✓ Good - Organized by feature
src/
├── components/
│   ├── Sidebar.jsx
│   ├── PlayerBar.jsx
│   └── Card.jsx
├── hooks/
│   ├── useTheme.js
│   ├── useAudio.js
│   └── useMusic.js
└── utils/
    ├── constants.js
    └── helpers.js

// ✗ Avoid - Organized by type
src/
├── components/
│   ├── all.jsx
├── hooks/
│   ├── all.js
└── utils/
    ├── all.js
```

### Import Organization
Order imports by dependency:
```javascript
// ✓ Good - Organized imports
import React, { useState, useCallback } from 'react';
import { Music } from 'lucide-react';
import Card from './Card';
import { removeFileExtension } from '../utils/helpers';

// ✗ Avoid - Random order
import { removeFileExtension } from '../utils/helpers';
import React from 'react';
import Card from './Card';
import { Music } from 'lucide-react';
```

## 5. Error Handling

### Try-Catch for Async Operations
```javascript
// ✓ Good
const selectDirectory = useCallback(async () => {
  try {
    const dirHandle = await window.showDirectoryPicker();
    setDirectory(dirHandle);
  } catch (err) {
    console.error('Error selecting directory:', err);
  }
}, []);

// ✗ Avoid
const selectDirectory = useCallback(async () => {
  const dirHandle = await window.showDirectoryPicker();
  setDirectory(dirHandle);
  // Unhandled promise rejection
}, []);
```

## 6. Naming Conventions

### Consistent Naming
```javascript
// ✓ Good - Clear, consistent naming
const [theme, setTheme] = useState('dark');
const [currentTrack, setCurrentTrack] = useState(null);
const [isPlaying, setIsPlaying] = useState(false);

// ✗ Avoid - Inconsistent naming
const [t, setT] = useState('dark');
const [cur, setCur] = useState(null);
const [playing, setPlaying] = useState(false);
```

### Boolean State Names
Start with "is" or "has":
```javascript
// ✓ Good
const [isPlaying, setIsPlaying] = useState(false);
const [hasError, setHasError] = useState(false);

// ✗ Avoid
const [playing, setPlaying] = useState(false);
const [error, setError] = useState(false);
```

## 7. Component Patterns

### Controlled Components
Form inputs should be controlled:
```javascript
// ✓ Good - Controlled input
<input
  type="range"
  value={currentTime}
  onChange={(e) => setCurrentTime(e.target.value)}
/>

// ✗ Avoid - Uncontrolled
<input type="range" defaultValue={currentTime} />
```

### Composition Over Inheritance
Use component composition for code reuse:
```javascript
// ✓ Good - Composition
<Grid>
  <Card>Content</Card>
  <Card>Content</Card>
</Grid>

// ✗ Avoid - Inheritance
class ExtendedCard extends Card {
  // Complex inheritance chain
}
```

## 8. Accessibility (a11y)

### ARIA Labels
Add ARIA labels to interactive elements:
```javascript
// ✓ Good - Accessible
<button
  onClick={onPlayPause}
  title="Play/Pause"
  aria-label="Play or pause music"
>
  {isPlaying ? <Pause /> : <Play />}
</button>

// ✗ Avoid - Not accessible
<button onClick={onPlayPause}>
  {isPlaying ? <Pause /> : <Play />}
</button>
```

## 9. Comments and Documentation

### When to Comment
- **DO**: Explain WHY, not WHAT
- **DON'T**: State obvious code

```javascript
// ✓ Good - Explains purpose
// Clean up audio listeners to prevent memory leaks
useEffect(() => {
  // ...
}, []);

// ✗ Avoid - States obvious
// Set isPlaying to true
setIsPlaying(true);
```

### JSDoc for Public APIs
```javascript
// ✓ Good - Complete documentation
/**
 * Format seconds to MM:SS format
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  // ...
};
```

## 10. Testing Considerations

### Make Code Testable
- Pure functions are easy to test
- Props should be explicit
- Hooks can be tested independently

```javascript
// ✓ Good - Easily testable
export const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Test it
test('formatTime formats correctly', () => {
  expect(formatTime(125)).toBe('2:05');
});
```

## Common Pitfalls to Avoid

### 1. Stale Closures
```javascript
// ✗ Avoid
useEffect(() => {
  const handler = () => {
    console.log(dependency); // Stale closure
  };
  element.addEventListener('click', handler);
}, []);

// ✓ Good
useEffect(() => {
  const handler = () => {
    console.log(dependency); // Fresh reference
  };
  element.addEventListener('click', handler);
  return () => element.removeEventListener('click', handler);
}, [dependency]);
```

### 2. Props Drilling
```javascript
// ✗ Avoid - Props drilling through many levels
<Component1 theme={theme}>
  <Component2 theme={theme}>
    <Component3 theme={theme}>
      {/* Uses theme */}
    </Component3>
  </Component2>
</Component1>

// ✓ Good - Use Context API or custom hook
const { theme } = useTheme();
```

### 3. Inline Objects as Props
```javascript
// ✗ Avoid - Creates new object every render
<Component style={{ color: 'blue' }} />

// ✓ Good - Reference constant or memoize
const styles = { color: 'blue' };
<Component style={styles} />
```

## Summary Checklist

- [ ] Each component has a single responsibility
- [ ] All components have documented props with JSDoc
- [ ] State logic extracted to custom hooks
- [ ] useEffect dependencies are complete
- [ ] Cleanup functions handle subscriptions
- [ ] Callbacks wrapped in useCallback
- [ ] Files organized by feature/concern
- [ ] Imports ordered consistently
- [ ] Error handling with try-catch
- [ ] Naming conventions followed
- [ ] ARIA labels on interactive elements
- [ ] Comments explain WHY, not WHAT
- [ ] Code is testable
- [ ] No stale closures or props drilling
- [ ] No inline objects as props

Following these practices ensures your React code is:
- **Maintainable**: Easy to understand and modify
- **Scalable**: Easy to extend and add features
- **Testable**: Each piece can be tested independently
- **Performant**: Optimizations prevent unnecessary re-renders
- **Accessible**: Usable by everyone
- **Professional**: Follows industry standards
