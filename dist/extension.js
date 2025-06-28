"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// src/extension.ts
// Entry point for the VS Code extension 
const vscode = __importStar(require("vscode"));
function activate(context) {
    console.log('VisuCode extension is now active!');
    // Register commands
    context.subscriptions.push(vscode.commands.registerCommand('visucode.openCanvas', () => {
        console.log('Opening VisuCode Canvas...');
        openVisuCodeCanvas(context.extensionUri);
    }));
    // Also register a command to open in a panel
    context.subscriptions.push(vscode.commands.registerCommand('visucode.openCanvasPanel', () => {
        console.log('Opening canvas in panel...');
        openVisuCodeCanvas(context.extensionUri);
    }));
    // Show a welcome message
    vscode.window.showInformationMessage('VisuCode extension is now active! Use "Open VisuCode Canvas" command to start.');
}
function deactivate() {
    console.log('VisuCode extension is now deactivated!');
}
function openVisuCodeCanvas(extensionUri) {
    const panel = vscode.window.createWebviewPanel('visucodeCanvas', '🎨 VisuCode Canvas', vscode.ViewColumn.One, {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [extensionUri]
    });
    panel.webview.html = getWebviewContent();
    // Handle panel close
    panel.onDidDispose(() => {
        console.log('VisuCode Canvas panel closed');
    });
}
function getWebviewContent() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisuCode Canvas</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background-color: #1e1e1e;
            color: #ffffff;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .header {
            background-color: #2d2d30;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .header h1 {
            margin: 0 0 10px 0;
            font-size: 2.5em;
            color: #007acc;
        }
        
        .header p {
            margin: 0;
            font-size: 1.2em;
            color: #cccccc;
        }
        
        .canvas-area {
            background-color: #3c3c3c;
            border: 3px dashed #666;
            border-radius: 8px;
            padding: 40px;
            text-align: center;
            min-height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .canvas-content {
            max-width: 600px;
        }
        
        .canvas-content h2 {
            color: #4CAF50;
            margin-bottom: 20px;
        }
        
        .canvas-content p {
            color: #cccccc;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .test-button {
            background: #007acc;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: background-color 0.2s;
        }
        
        .test-button:hover {
            background: #005a9e;
        }
        
        .features {
            margin-top: 30px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .feature {
            background-color: #2d2d30;
            padding: 20px;
            border-radius: 6px;
            text-align: center;
        }
        
        .feature h3 {
            color: #4CAF50;
            margin-bottom: 10px;
        }
        
        .feature p {
            color: #cccccc;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎨 VisuCode Canvas</h1>
            <p>Revolutionary Visual Coding Interface for VS Code</p>
        </div>
        
        <div class="canvas-area">
            <div class="canvas-content">
                <h2>🚀 Canvas Ready!</h2>
                <p>Your visual coding interface is now active. This canvas will soon feature interactive code nodes, AI-powered operations, and real-time collaboration.</p>
                <button class="test-button" onclick="testInteraction()">
                    🎯 Test Interaction
                </button>
            </div>
        </div>
        
        <div class="features">
            <div class="feature">
                <h3>🔍 Code Visualization</h3>
                <p>See your codebase as interconnected visual nodes</p>
            </div>
            <div class="feature">
                <h3>🤖 AI Integration</h3>
                <p>MCP-powered AI operations and code analysis</p>
            </div>
            <div class="feature">
                <h3>🎨 Interactive Canvas</h3>
                <p>Click, drag, and interact with code components</p>
            </div>
            <div class="feature">
                <h3>⚡ Real-time Sync</h3>
                <p>Live synchronization with your actual codebase</p>
            </div>
        </div>
    </div>
    
    <script>
        function testInteraction() {
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = '✅ Working!';
            button.style.background = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '#007acc';
            }, 2000);
            
            console.log('VisuCode Canvas interaction test successful!');
        }
        
        // Log that the WebView is loaded
        console.log('VisuCode Canvas WebView loaded successfully!');
    </script>
</body>
</html>`;
}
