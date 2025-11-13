import { app, BrowserWindow, ipcMain, clipboard } from 'electron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

app.whenReady().then(() => 
{
    createMainWindow();

    ipcMain.handle('read-dir', (_, dirname) => fs.readdirSync(path.resolve(dirname)));
    ipcMain.handle('read-file-binary', (_, filename) => Uint8Array(fs.readFileSync(path.resolve(filename))));
    ipcMain.handle('read-file', (_, filename) => fs.readFileSync(path.resolve(filename), 'utf8'));
    ipcMain.handle('write-file', (_, filename, data) => fs.writeFileSync(path.resolve(filename), data));
    ipcMain.handle('create-window', (_, { url, title, width, height, favicon, resizable, maximizable, minimizable, fullscreenable }) => createNewWindow(url, title, width, height, favicon, resizable, maximizable, minimizable, fullscreenable));
    ipcMain.handle('get-clipboard-text', (_, ...args) => clipboard.readText());
    ipcMain.handle('write-clipboard-text', (_, text, ...args) => clipboard.writeText(text));
});

function createMainWindow() 
{
    mainWindow = new BrowserWindow(
    {
        width: 280,
        height: 320,
        autoHideMenuBar: true,
        resizable: false,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        icon: './img/favicon.ico',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
    });

    mainWindow.loadFile('views/menu.html');
}

function createNewWindow(url, title = 'Window', width = 1200, height = 800, favicon = 'favicon.ico', resizable = true, minimizable = true, maximizable = true, fullscreenable = false) 
{
    const win = new BrowserWindow(
    {
        width: width,
        height: height,
        title,
        autoHideMenuBar: true,
        resizable: resizable,
        minimizable: minimizable,
        maximizable: maximizable,
        fullscreenable: fullscreenable,
        icon: `./img/${favicon}`,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true, 
            nodeIntegration: false
        },
    });

    const filePath = url.startsWith('file://')
        ? url
        : `file://${path.join(__dirname, url)}`;
    win.loadURL(filePath);
}

app.on('window-all-closed', () => 
{
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => 
{
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});