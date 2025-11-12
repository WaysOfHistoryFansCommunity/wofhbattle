const { contextBridge, ipcRenderer } = require('electron');
const { fs } = require('node:fs');
const { path } = require('node:path');

contextBridge.exposeInMainWorld('api', 
{
    readDir: (dir) => fs.readdirSync(path.resolve(dir)),
    readBinary: (filePath) => {
        try 
        {
            const buffer = fs.readFileSync(path.resolve(filePath));
            return new Uint8Array(buffer);
        } 
        catch (err) 
        {
            console.error('Ошибка при чтении бинарного файла:', err);
            return null;
        }
    },
    readFile: (file) => fs.readFileSync(path.resolve(file), 'utf8'),
    writeFile: (file, data) => fs.writeFileSync(path.resolve(file), data),
    readClipboardText: async () => await ipcRenderer.invoke("get-clipboard-text"),
    writeClipboardText: async (text) => await ipcRenderer.invoke("write-clipboard-text", text),
    createWindow: (opts) => ipcRenderer.invoke('create-window', opts)
});