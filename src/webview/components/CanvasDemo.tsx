import React, { useState } from 'react';
import { Canvas } from './Canvas';

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

export const CanvasDemo: React.FC = () => {
  const [nodes] = useState<CodeNode[]>([
    { id: '1', name: 'App.tsx', type: 'component', x: 100, y: 100 },
    { id: '2', name: 'useCanvas', type: 'hook', x: 300, y: 100 },
    { id: '3', name: 'Canvas', type: 'component', x: 500, y: 100 },
    { id: '4', name: 'CodeNode', type: 'interface', x: 200, y: 250 },
    { id: '5', name: 'Connection', type: 'interface', x: 400, y: 250 },
    { id: '6', name: 'parseCode', type: 'function', x: 300, y: 400 },
  ]);

  const [connections] = useState<Connection[]>([
    { id: '1', source: '1', target: '2', type: 'uses' },
    { id: '2', source: '1', target: '3', type: 'renders' },
    { id: '3', source: '3', target: '4', type: 'displays' },
    { id: '4', source: '3', target: '5', type: 'displays' },
    { id: '5', source: '2', target: '6', type: 'calls' },
  ]);

  const handleNodeClick = (node: CodeNode) => {
    console.log('Node clicked:', node);
    // Here you could open the file, show details, etc.
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas 
        nodes={nodes} 
        connections={connections} 
        onNodeClick={handleNodeClick} 
      />
    </div>
  );
}; 