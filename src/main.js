const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadFile('src/index.html');
    mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow)
