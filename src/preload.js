const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getSources: () => ipcRenderer.invoke('GET_SCREEN_SOURCES'),
  getStream: (sourceId) => ipcRenderer.invoke('GET_SCREEN_STREAM', sourceId)
});