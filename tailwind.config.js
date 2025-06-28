/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/webview/**/*.{js,ts,jsx,tsx}",
    "./src/webview/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'vscode-bg': '#1e1e1e',
        'vscode-fg': '#cccccc',
        'vscode-border': '#3c3c3c',
      },
    },
  },
  plugins: [],
} 