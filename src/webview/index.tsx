import React from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from './components/Canvas';
import './styles.css';

// Mock data for initial development
const mockNodes = [
  { id: '1', name: 'App.tsx', type: 'component', x: 100, y: 100 },
  { id: '2', name: 'useState', type: 'hook', x: 300, y: 100 },
  { id: '3', name: 'Button', type: 'component', x: 500, y: 100 },
];

const mockConnections = [
  { id: '1-2', source: '1', target: '2', type: 'dependency' },
  { id: '1-3', source: '1', target: '3', type: 'dependency' },
];

const App: React.FC = () => {
  const handleNodeClick = (node: any) => {
    console.log('Node clicked:', node);
  };

  return (
    <Canvas 
      nodes={mockNodes} 
      connections={mockConnections} 
      onNodeClick={handleNodeClick}
    />
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 