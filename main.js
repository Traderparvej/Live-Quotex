const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: false  // Cross-origin / CORS avoid
        }
    });

    // Load valid Quotex trade URL
    win.loadURL('https://market-qx.trade/en/trade');

    // Optional: prevent navigation to other sites
    win.webContents.on('will-navigate', (e, url) => {
        if (!url.startsWith('https://market-qx.trade')) e.preventDefault();
    });
}

app.whenReady().then(createWindow);
