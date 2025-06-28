// src/webview/components/Canvas.tsx
// Placeholder for Canvas component 

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Canvas as FabricCanvas, Rect, Text, Group, Line } from 'fabric';

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

export const Canvas: React.FC<CanvasProps> = ({ nodes, connections, onNodeClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new FabricCanvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#1e1e1e'
      });
      setFabricCanvas(canvas);
    }
  }, []);
  
  useEffect(() => {
    if (fabricCanvas) {
      // Clear existing objects
      fabricCanvas.clear();
      
      // Render nodes
      nodes.forEach(node => {
        const rect = new Rect({
          left: node.x,
          top: node.y,
          width: 120,
          height: 80,
          fill: getNodeColor(node.type),
          stroke: '#ffffff',
          strokeWidth: 2,
          rx: 8,
          ry: 8
        });
        
        const text = new Text(node.name, {
          left: node.x + 10,
          top: node.y + 30,
          fontSize: 12,
          fill: '#ffffff'
        });
        
        const group = new Group([rect, text]);
        
        // Store node data in a custom property
        (group as any).nodeData = node;
        
        group.on('mousedown', () => {
          onNodeClick(node);
        });
        
        fabricCanvas.add(group);
      });
      
      // Render connections
      connections.forEach(connection => {
        const sourceNode = nodes.find(n => n.id === connection.source);
        const targetNode = nodes.find(n => n.id === connection.target);
        
        if (sourceNode && targetNode) {
          const line = new Line([
            sourceNode.x + 60,
            sourceNode.y + 40,
            targetNode.x + 60,
            targetNode.y + 40
          ], {
            stroke: '#666666',
            strokeWidth: 2
          });
          
          fabricCanvas.add(line);
        }
      });
      
      fabricCanvas.renderAll();
    }
  }, [nodes, connections, fabricCanvas, onNodeClick]);
  
  const getNodeColor = (type: string): string => {
    switch (type) {
      case 'component': return '#4CAF50';
      case 'hook': return '#2196F3';
      case 'function': return '#FF9800';
      default: return '#9C27B0';
    }
  };
  
  return <canvas ref={canvasRef} />;
}; 