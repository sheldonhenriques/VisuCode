# Infinite Canvas Code Visualization

A VS Code extension that provides an infinite, draggable canvas for visualizing code - inspired by Figma's canvas interaction model.

## 🎯 Core Features

- **Infinite Canvas** - Boundless workspace that extends in all directions
- **Smooth Pan & Zoom** - Figma-like navigation with mouse and trackpad gestures
- **Dynamic Viewport** - Efficient rendering of only visible elements
- **Grid System** - Visual reference grid that scales with zoom level
- **Draggable Elements** - Interactive code nodes that can be moved and resized
- **Real-time Viewport Info** - Live display of zoom level and pan position

## 🛠️ Tech Stack

- **React** - UI framework
- **Fabric.js** - Canvas manipulation and infinite scrolling
- **VS Code Extension API** - Extension integration
- **TypeScript** - Type-safe development

## 📦 Implementation

The canvas is implemented using Fabric.js with the following key features:

### Infinite Panning
```typescript
// Alt + Click and drag to pan the canvas
fabricCanvas.on('mouse:down', (opt) => {
  const evt = opt.e;
  if (evt.altKey === true) {
    fabricCanvas.isDragging = true;
    fabricCanvas.lastPosX = evt.clientX;
    fabricCanvas.lastPosY = evt.clientY;
  }
});
```

### Smooth Zooming
```typescript
// Mouse wheel or trackpad pinch to zoom
fabricCanvas.on('mouse:wheel', (opt) => {
  const delta = opt.e.deltaY;
  let zoom = fabricCanvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  
  const point = new Point(opt.e.offsetX, opt.e.offsetX);
  fabricCanvas.zoomToPoint(point, zoom);
});
```

### Dynamic Grid System
```typescript
// Grid that scales with zoom level
const createGrid = (fabricCanvas) => {
  const gridSize = 50;
  const zoom = fabricCanvas.getZoom();
  const adjustedGridSize = gridSize * zoom;
  
  // Calculate visible grid bounds and render only visible lines
  // This ensures performance even at high zoom levels
};
```

### Draggable Code Nodes
```typescript
// Interactive nodes with resize controls
const group = new Group([rect, text], {
  selectable: true,
  hasControls: true,
  hasBorders: true,
  lockRotation: true
});
```

## 🚀 Getting Started

1. Install the extension
2. Open VS Code
3. Press `Cmd/Ctrl + Shift + P`
4. Type "Open VisuCode Canvas"
5. Start exploring your codebase visually

## 🎮 Controls

- **Pan**: Alt + Click and drag
- **Zoom**: Mouse wheel or trackpad pinch
- **Reset View**: Double click on empty space
- **Select Node**: Click on any code node
- **Move Node**: Drag nodes to reposition them
- **Resize Node**: Use the corner handles to resize

## 🔄 Performance Optimization

- **Viewport Culling** - Only renders elements visible in the current viewport
- **Debounced Rendering** - Efficient canvas state management
- **Hardware Acceleration** - Uses GPU-accelerated transforms
- **Dynamic Grid** - Grid lines are only rendered for visible areas
- **Efficient Object Management** - Proper cleanup and object pooling

## 🎨 Visual Features

### Code Node Types
- **Components** - Green (#4CAF50)
- **Hooks** - Blue (#2196F3)
- **Functions** - Orange (#FF9800)
- **Classes** - Purple (#9C27B0)
- **Interfaces** - Pink (#E91E63)
- **Types** - Blue Grey (#607D8B)

### Grid System
- Adaptive grid that scales with zoom level
- Subtle grid lines for visual reference
- Automatic grid regeneration on viewport changes

### Viewport Information
- Real-time zoom percentage display
- Current pan position coordinates
- Overlay panel with live updates

## 🔧 Development

### Building the Extension
```bash
npm run build
```

### Development Mode
```bash
npm run watch
```

### Testing
```bash
npm test
```

## 📁 Project Structure

```
src/
├── webview/
│   ├── components/
│   │   ├── Canvas.tsx          # Main infinite canvas component
│   │   ├── CanvasDemo.tsx      # Demo component for testing
│   │   └── ...
│   ├── index.tsx              # Main webview entry point
│   └── styles.css             # Global styles
├── extension/
│   └── extension.ts           # VS Code extension entry point
└── mcp/
    └── server.ts              # Model Context Protocol server
```

## 🎯 Future Enhancements

- **Connection Lines** - Dynamic connection visualization
- **Node Clustering** - Automatic grouping of related nodes
- **Search & Filter** - Find and highlight specific nodes
- **Export Options** - Save canvas as image or PDF
- **Collaboration** - Real-time collaborative editing
- **AI Integration** - Automatic code analysis and visualization