import { app, BrowserWindow } from 'electron';

const createWindow = (): void => {
    const mainWindow = new BrowserWindow({
        width: 300,
        height: 250,
        frame: false,
        resizable: false,
        focusable: true,
    });

    mainWindow.removeMenu();
    mainWindow.loadFile('src/index.html');
    mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow)
