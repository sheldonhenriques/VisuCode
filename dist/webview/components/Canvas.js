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
    const [canvas, setCanvas] = (0, react_1.useState)(null);
    const [viewport, setViewport] = (0, react_1.useState)({ x: 0, y: 0, zoom: 1 });
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const [lastMousePos, setLastMousePos] = (0, react_1.useState)({ x: 0, y: 0 });
    // Initialize canvas with infinite scrolling capabilities
    (0, react_1.useEffect)(() => {
        if (canvasRef.current) {
            const fabricCanvas = new fabric_1.Canvas(canvasRef.current, {
                width: window.innerWidth,
                height: window.innerHeight,
                selection: false,
                renderOnAddRemove: false,
                enableRetinaScaling: true,
                backgroundColor: '#ffffff',
                preserveObjectStacking: true
            });
            // Enable infinite panning
            fabricCanvas.on('mouse:down', (opt) => {
                const evt = opt.e;
                if (evt.altKey === true) {
                    fabricCanvas.isDragging = true;
                    fabricCanvas.lastPosX = evt.clientX;
                    fabricCanvas.lastPosY = evt.clientY;
                    setIsDragging(true);
                    setLastMousePos({ x: evt.clientX, y: evt.clientY });
                    fabricCanvas.defaultCursor = 'grabbing';
                }
            });
            fabricCanvas.on('mouse:move', (opt) => {
                if (fabricCanvas.isDragging) {
                    const evt = opt.e;
                    const vpt = fabricCanvas.viewportTransform;
                    if (vpt) {
                        vpt[4] += evt.clientX - fabricCanvas.lastPosX;
                        vpt[5] += evt.clientY - fabricCanvas.lastPosY;
                        fabricCanvas.requestRenderAll();
                        fabricCanvas.lastPosX = evt.clientX;
                        fabricCanvas.lastPosY = evt.clientY;
                        // Update viewport state
                        setViewport((prev) => ({
                            ...prev,
                            x: vpt[4],
                            y: vpt[5]
                        }));
                    }
                }
            });
            fabricCanvas.on('mouse:up', () => {
                fabricCanvas.isDragging = false;
                setIsDragging(false);
                fabricCanvas.defaultCursor = 'default';
            });
            // Enable infinite zoom
            fabricCanvas.on('mouse:wheel', (opt) => {
                const delta = opt.e.deltaY;
                let zoom = fabricCanvas.getZoom();
                zoom *= 0.999 ** delta;
                if (zoom > 20)
                    zoom = 20;
                if (zoom < 0.01)
                    zoom = 0.01;
                const point = new fabric_1.Point(opt.e.offsetX, opt.e.offsetY);
                fabricCanvas.zoomToPoint(point, zoom);
                // Update viewport state
                setViewport((prev) => ({
                    ...prev,
                    zoom
                }));
                opt.e.preventDefault();
                opt.e.stopPropagation();
            });
            // Double click to reset view
            fabricCanvas.on('mouse:dblclick', (opt) => {
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
    const createLightPoints = (0, react_1.useCallback)((fabricCanvas) => {
        const pointSpacing = 40; // Much denser
        const zoom = fabricCanvas.getZoom();
        const adjustedSpacing = pointSpacing * zoom;
        // Clear existing points
        const existingPoints = fabricCanvas.getObjects().filter((obj) => obj.isLightPoint);
        existingPoints.forEach((obj) => fabricCanvas.remove(obj));
        const canvasWidth = fabricCanvas.getWidth() || 800;
        const canvasHeight = fabricCanvas.getHeight() || 600;
        const vpt = fabricCanvas.viewportTransform;
        if (!vpt)
            return;
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
                const point = new fabric_1.Circle({
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
                point.isLightPoint = true;
                fabricCanvas.add(point);
            }
        }
    }, []);
    // Update light points when viewport changes
    (0, react_1.useEffect)(() => {
        if (canvas) {
            createLightPoints(canvas);
            canvas.requestRenderAll();
        }
    }, [viewport, canvas, createLightPoints]);
    return ((0, jsx_runtime_1.jsx)("canvas", { ref: canvasRef, style: {
            cursor: isDragging ? 'grabbing' : 'default',
            width: '100vw',
            height: '100vh',
            display: 'block'
        } }));
};
exports.Canvas = Canvas;
