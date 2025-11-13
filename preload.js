const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', 
{
    readDir: (dirname) => ipcRenderer.invoke('read-dir', dirname),
    readFileBinary: (filename) => ipcRenderer.invoke('read-file-binary', filename),
    readFile: (filename) => ipcRenderer.invoke('read-file', filename),
    writeFile: (filename, data) => ipcRenderer.invoke('write-file', filename, data),
    readClipboardText: async () => await ipcRenderer.invoke("get-clipboard-text"),
    writeClipboardText: async (text) => await ipcRenderer.invoke("write-clipboard-text", text),
    createWindow: (opts) => ipcRenderer.invoke('create-window', opts)
});