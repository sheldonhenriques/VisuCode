// src/extension.ts
// Entry point for the VS Code extension 
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    console.log('VisuCode extension is now active!');
    
    // Register commands
    context.subscriptions.push(
        vscode.commands.registerCommand('visucode.openCanvas', () => {
            console.log('Opening VisuCode Canvas...');
            openVisuCodeCanvas(context.extensionUri);
        })
    );
    
    // Also register a command to open in a panel
    context.subscriptions.push(
        vscode.commands.registerCommand('visucode.openCanvasPanel', () => {
            console.log('Opening canvas in panel...');
            openVisuCodeCanvas(context.extensionUri);
        })
    );
    
    // Show a welcome message
    vscode.window.showInformationMessage('VisuCode extension is now active! Use "Open VisuCode Canvas" command to start.');
}

export function deactivate() {
    console.log('VisuCode extension is now deactivated!');
}

function openVisuCodeCanvas(extensionUri: vscode.Uri) {
    const panel = vscode.window.createWebviewPanel(
        'visucodeCanvas',
        '🎨 VisuCode Canvas',
        vscode.ViewColumn.One,
        {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [extensionUri]
        }
    );
    
    // Load the built webview HTML file
    const webviewPath = path.join(extensionUri.fsPath, 'webview', 'index.html');
    
    try {
        if (fs.existsSync(webviewPath)) {
            let htmlContent = fs.readFileSync(webviewPath, 'utf8');
            
            // Convert local file paths to webview URIs
            const bundleUri = panel.webview.asWebviewUri(
                vscode.Uri.file(path.join(extensionUri.fsPath, 'webview', 'bundle.js'))
            );
            
            // Replace the bundle.js reference with the webview URI
            htmlContent = htmlContent.replace('src="bundle.js"', `src="${bundleUri}"`);
            
            panel.webview.html = htmlContent;
        } else {
            // Fallback to a simple message if the built files don't exist
            panel.webview.html = getFallbackContent();
        }
    } catch (error) {
        console.error('Error loading webview:', error);
        panel.webview.html = getFallbackContent();
    }
    
    // Handle panel close
    panel.onDidDispose(() => {
        console.log('VisuCode Canvas panel closed');
    });
}

function getFallbackContent() {
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
            text-align: center;
            padding-top: 100px;
        }
        
        .error-message {
            background-color: #2d2d30;
            padding: 40px;
            border-radius: 8px;
            border: 2px solid #ff6b6b;
        }
        
        .error-message h1 {
            color: #ff6b6b;
            margin-bottom: 20px;
        }
        
        .error-message p {
            color: #cccccc;
            margin-bottom: 20px;
        }
        
        .build-button {
            background: #007acc;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="error-message">
            <h1>🚨 Build Required</h1>
            <p>The webview files have not been built yet. Please run:</p>
            <p><code>npm run build</code></p>
            <p>Then reload the extension.</p>
        </div>
    </div>
</body>
</html>`;
} 