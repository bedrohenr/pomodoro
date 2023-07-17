import { app, BrowserWindow, ipcMain } from 'electron';

const createWindow = (): void => {
    const mainWindow = new BrowserWindow({
        width: 300,
        height: 250,
        frame: false,
        focusable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    // Teste
    mainWindow.removeMenu();
    mainWindow.loadFile('src/index.html');
    mainWindow.webContents.openDevTools();

    ipcMain.on('minimize', () => {
        mainWindow.minimize();
    });

    ipcMain.on('close', () => {
        mainWindow.close();
    });
}

app.on('ready', createWindow)
