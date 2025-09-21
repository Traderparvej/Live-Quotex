const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Load Quotex login URL
    win.loadURL('https://broker-qx.pro/sign-up/?lid=1508486');

    // Prevent navigation to other sites
    win.webContents.on('will-navigate', (e, url) => {
        if (!url.startsWith('https://broker-qx.pro')) e.preventDefault();
    });
}

app.whenReady().then(createWindow);

