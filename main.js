const { app, BrowserWindow } = require('electron');
const path = require('path');
require('@electron/remote/main').initialize();

function createWindow() 
{
    const win = new BrowserWindow({
        width: 960,
        height: 755,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false,
            allowRunningInsecureContent: true
        },
    });

    require('@electron/remote/main').enable(win.webContents);
    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => 
{
    if (process.platform !== 'darwin') 
    {
        app.quit();
    }
});

app.on('activate', () => 
{
    if (BrowserWindow.getAllWindows().length === 0) 
    {
        createWindow();
    }
});

function createNewWindow(url, title, id) 
{
    const win = new BrowserWindow(
    {
        width: 960,
        height: 755,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false,
            allowRunningInsecureContent: true
        },
        title: title,
        id: id
    });

    win.webContents.openDevTools();

    win.webContents.on("render-process-gone", (event, details) => 
    {
        console.error("gone", details)
    })

    console.log(`file://${path.join(__dirname, url)}`);
    win.loadURL(`file://${path.join(__dirname, url)}`);
}

global.createNewWindow = createNewWindow;