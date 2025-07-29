# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## High-Level Architecture

This is a Next.js 15 application using the App Router that creates an interactive memory map for couples. The application displays memories as markers on a map with various views and features.

### Core Technologies
- **Framework**: Next.js 15.4.4 with App Router
- **UI**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS v4 with custom romantic theme
- **State Management**: Zustand with persistence
- **Map**: Leaflet with React-Leaflet and marker clustering
- **Components**: Radix UI for accessible components
- **Animations**: Framer Motion

### Key Architectural Patterns

1. **Client-Side Rendering for Map**: The map component uses dynamic imports with SSR disabled due to Leaflet's dependency on browser APIs.

2. **Global State Pattern**: Uses Zustand store (`memory-store.ts`) with browser persistence to manage:
   - Memory data (loaded from `data/memories.json`)
   - UI state (selected memory, filters, search)
   - CRUD operations for memories

3. **Type-Safe Data Models**: Memory types defined in `lib/types/memory.ts`:
   - Memory: Core data structure with location, images, category
   - MemoryCategory: 'date' | 'travel' | 'anniversary' | 'daily'
   - Location: lat/lng coordinates with place name

4. **Layout Architecture**: 
   - Root layout includes global UI components (bottom nav, alerts, background music)
   - Page-specific content rendered in main area with padding for bottom navigation

### Project Structure Overview

- `/app` - Next.js App Router pages and layouts
  - `/memory/[id]` - Dynamic route for individual memory details
  - `/timeline`, `/stats`, `/about` - Additional views
- `/components` - React components organized by feature
  - `/memory` - Map, timeline, and memory display components
  - `/ui` - Reusable UI components and effects
  - `/layout` - Navigation components
- `/lib` - Utilities and business logic
  - `/store` - Zustand state management
  - `/types` - TypeScript type definitions
  - `/utils` - Helper functions for dates and special features
- `/data/memories.json` - Memory data source
- `/public` - Static assets including Leaflet markers and PWA manifest

### Key Features Implementation

- **Map Integration**: Leaflet map with custom heart markers showing memory locations
- **Dark Mode**: Class-based dark mode with Tailwind CSS
- **PWA Support**: Manifest.json for installable web app
- **Responsive Design**: Mobile-first with bottom navigation
- **Special Effects**: Heart particles, petal animations, background music
- **Data Filtering**: Category and search-based filtering in memory store