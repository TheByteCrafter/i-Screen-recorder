const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron');
const path = require('path');

// WINDOWS ESSENTIAL CONFIGURATION
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion');
app.commandLine.appendSwitch('enable-features', 'WebRTCPipeWireCapturer');
app.commandLine.appendSwitch('force-device-scale-factor', '1');
app.disableHardwareAcceleration();

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false, // TEMPORARILY DISABLED
      nodeIntegration: true, // TEMPORARILY ENABLED
      sandbox: false, // TEMPORARILY DISABLED
      enableRemoteModule: true // TEMPORARILY ENABLED
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.openDevTools();
};

ipcMain.handle('GET_SCREEN_SOURCES', async () => {
  const sources = await desktopCapturer.getSources({ 
    types: ['screen'],
    thumbnailSize: { width: 1920, height: 1080 }
  });
  return sources;
});

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});