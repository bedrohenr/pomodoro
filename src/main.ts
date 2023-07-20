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

    ipcMain.on('showNotif',(event, title: string, body: string) => {
        new Notification({
            title: title,
            body: body
        }).show()
    })
}

app.on('ready', createWindow);
