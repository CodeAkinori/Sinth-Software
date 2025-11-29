const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  download: (data) => ipcRenderer.invoke('download', data),
  onProgress: (callback) => ipcRenderer.on('download-progress', (_, progress) => callback(progress))
});
