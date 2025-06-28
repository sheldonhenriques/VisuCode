"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const Canvas_1 = require("./components/Canvas");
require("./styles.css");
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
const App = () => {
    const handleNodeClick = (node) => {
        console.log('Node clicked:', node);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "canvas-container", children: (0, jsx_runtime_1.jsx)(Canvas_1.Canvas, { nodes: mockNodes, connections: mockConnections, onNodeClick: handleNodeClick }) }));
};
const root = client_1.default.createRoot(document.getElementById('root'));
root.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(App, {}) }));
