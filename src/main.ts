import { app, BrowserWindow, ipcMain, Notification } from 'electron';

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

    new Notification({
        title: 'Teste',
        body: 'Testee'
    }).show()

    // Teste
    mainWindow.removeMenu();
    mainWindow.loadFile('src/index.html');

    // Window button commands
    ipcMain.on('minimize', () => {
        mainWindow.minimize();
    });

    ipcMain.on('close', () => {
        mainWindow.close();
    });
}
app.on('ready', createWindow);
