import * as vscode from 'vscode';
import * as path from 'path';

export class VisualCodeProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;
    
    constructor(private readonly _extensionUri: vscode.Uri) {}
    
    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        console.log('Resolving WebView:', webviewView.viewType);
        this._view = webviewView;
        
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        
        // Show the view by default
        webviewView.show();
        
        console.log('WebView resolved and shown');
    }
    
    public openCanvas() {
        console.log('Opening canvas...');
        if (this._view) {
            this._view.show();
            console.log('Canvas shown');
        } else {
            console.log('No view available');
        }
    }
    
    public getWebviewContent() {
        return this._getHtmlForWebview(null as any);
    }
    
    private _getHtmlForWebview(webview: vscode.Webview) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisuCode Canvas</title>
    <style>
        body {
            margin: 0;
            padding: 10px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background-color: #1e1e1e;
            color: #ffffff;
            min-height: 200px;
        }
        
        #root {
            width: 100%;
            min-height: 200px;
        }
        
        .header {
            background-color: #2d2d30;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 10px;
        }
        
        .canvas-placeholder {
            background-color: #3c3c3c;
            border: 2px dashed #666;
            border-radius: 4px;
            padding: 20px;
            text-align: center;
            min-height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>
<body>
    <div id="root">
        <div class="header">
            <h2>🎨 VisuCode Canvas</h2>
            <p>Visual coding interface is active!</p>
        </div>
        <div class="canvas-placeholder">
            <div>
                <h3>Canvas Ready</h3>
                <p>Interactive visual coding interface coming soon...</p>
                <button onclick="alert('Canvas clicked!')" style="background: #007acc; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                    Test Interaction
                </button>
            </div>
        </div>
    </div>
</body>
</html>`;
    }
} 