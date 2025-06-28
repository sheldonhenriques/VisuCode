"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
// src/webview/components/Canvas.tsx
// Placeholder for Canvas component 
const react_1 = require("react");
const fabric_1 = require("fabric");
const Canvas = ({ nodes, connections, onNodeClick }) => {
    const canvasRef = (0, react_1.useRef)(null);
    const [fabricCanvas, setFabricCanvas] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (canvasRef.current) {
            const canvas = new fabric_1.Canvas(canvasRef.current, {
                width: 800,
                height: 600,
                backgroundColor: '#1e1e1e'
            });
            setFabricCanvas(canvas);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (fabricCanvas) {
            // Clear existing objects
            fabricCanvas.clear();
            // Render nodes
            nodes.forEach(node => {
                const rect = new fabric_1.Rect({
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
                const text = new fabric_1.Text(node.name, {
                    left: node.x + 10,
                    top: node.y + 30,
                    fontSize: 12,
                    fill: '#ffffff'
                });
                const group = new fabric_1.Group([rect, text]);
                // Store node data in a custom property
                group.nodeData = node;
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
                    const line = new fabric_1.Line([
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
    const getNodeColor = (type) => {
        switch (type) {
            case 'component': return '#4CAF50';
            case 'hook': return '#2196F3';
            case 'function': return '#FF9800';
            default: return '#9C27B0';
        }
    };
    return (0, jsx_runtime_1.jsx)("canvas", { ref: canvasRef });
};
exports.Canvas = Canvas;
