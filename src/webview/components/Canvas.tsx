// src/webview/components/Canvas.tsx
// Placeholder for Canvas component 

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas as FabricCanvas, Point, Circle } from 'fabric';

interface CodeNode {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
}

interface Connection {
  id: string;
  source: string;
  target: string;
  type: string;
}

interface CanvasProps {
  nodes: CodeNode[];
  connections: Connection[];
  onNodeClick: (node: CodeNode) => void;
}

interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

export const Canvas: React.FC<CanvasProps> = ({ nodes, connections, onNodeClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<FabricCanvas | null>(null);
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Initialize canvas with infinite scrolling capabilities
  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new FabricCanvas(canvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight,
        selection: false,
        renderOnAddRemove: false,
        enableRetinaScaling: true,
        backgroundColor: '#ffffff',
        preserveObjectStacking: true
      });

      // Enable infinite panning
      fabricCanvas.on('mouse:down', (opt: any) => {
        const evt = opt.e;
        if (evt.altKey === true) {
          (fabricCanvas as any).isDragging = true;
          (fabricCanvas as any).lastPosX = evt.clientX;
          (fabricCanvas as any).lastPosY = evt.clientY;
          setIsDragging(true);
          setLastMousePos({ x: evt.clientX, y: evt.clientY });
          fabricCanvas.defaultCursor = 'grabbing';
        }
      });

      fabricCanvas.on('mouse:move', (opt: any) => {
        if ((fabricCanvas as any).isDragging) {
          const evt = opt.e;
          const vpt = fabricCanvas.viewportTransform;
          if (vpt) {
            vpt[4] += evt.clientX - (fabricCanvas as any).lastPosX;
            vpt[5] += evt.clientY - (fabricCanvas as any).lastPosY;
            fabricCanvas.requestRenderAll();
            (fabricCanvas as any).lastPosX = evt.clientX;
            (fabricCanvas as any).lastPosY = evt.clientY;
            
            // Update viewport state
            setViewport((prev: Viewport) => ({
              ...prev,
              x: vpt[4],
              y: vpt[5]
            }));
          }
        }
      });

      fabricCanvas.on('mouse:up', () => {
        (fabricCanvas as any).isDragging = false;
        setIsDragging(false);
        fabricCanvas.defaultCursor = 'default';
      });

      // Enable infinite zoom
      fabricCanvas.on('mouse:wheel', (opt: any) => {
        const delta = opt.e.deltaY;
        let zoom = fabricCanvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        
        const point = new Point(opt.e.offsetX, opt.e.offsetY);
        fabricCanvas.zoomToPoint(point, zoom);
        
        // Update viewport state
        setViewport((prev: Viewport) => ({
          ...prev,
          zoom
        }));
        
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });

      // Double click to reset view
      fabricCanvas.on('mouse:dblclick', (opt: any) => {
        if (!opt.target) {
          fabricCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
          setViewport({ x: 0, y: 0, zoom: 1 });
        }
      });

      // Handle window resize
      const handleResize = () => {
        fabricCanvas.setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
        fabricCanvas.requestRenderAll();
      };

      window.addEventListener('resize', handleResize);
      setCanvas(fabricCanvas);

      return () => {
        window.removeEventListener('resize', handleResize);
        fabricCanvas.dispose();
      };
    }
  }, []);

  // Create light points system
  const createLightPoints = useCallback((fabricCanvas: FabricCanvas) => {
    const pointSpacing = 40; // Much denser
    const zoom = fabricCanvas.getZoom();
    const adjustedSpacing = pointSpacing * zoom;
    
    // Clear existing points
    const existingPoints = fabricCanvas.getObjects().filter((obj: any) => obj.isLightPoint);
    existingPoints.forEach((obj: any) => fabricCanvas.remove(obj));

    const canvasWidth = fabricCanvas.getWidth() || 800;
    const canvasHeight = fabricCanvas.getHeight() || 600;
    const vpt = fabricCanvas.viewportTransform;
    
    if (!vpt) return;

    // Calculate bounds so points always cover the visible area, including edges
    const left = -vpt[4] / zoom;
    const top = -vpt[5] / zoom;
    const startX = Math.floor(left / pointSpacing) * pointSpacing;
    const endX = Math.ceil((left + canvasWidth / zoom) / pointSpacing) * pointSpacing;
    const startY = Math.floor(top / pointSpacing) * pointSpacing;
    const endY = Math.ceil((top + canvasHeight / zoom) / pointSpacing) * pointSpacing;

    // Create light points
    for (let x = startX; x <= endX; x += pointSpacing) {
      for (let y = startY; y <= endY; y += pointSpacing) {
        const point = new Circle({
          left: x,
          top: y,
          radius: Math.max(1, 2 * zoom),
          fill: '#e0e0e0',
          stroke: 'none',
          selectable: false,
          evented: false,
          originX: 'center',
          originY: 'center'
        });
        (point as any).isLightPoint = true;
        fabricCanvas.add(point);
      }
    }
  }, []);

  // Update light points when viewport changes
  useEffect(() => {
    if (canvas) {
      createLightPoints(canvas);
      canvas.requestRenderAll();
    }
  }, [viewport, canvas, createLightPoints]);

  return (
    <canvas 
      ref={canvasRef}
      style={{ 
        cursor: isDragging ? 'grabbing' : 'default',
        width: '100vw',
        height: '100vh',
        display: 'block'
      }}
    />
  );
}; 