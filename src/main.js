const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const Store = require('electron-store');
const store = new Store();

function getDownloadFolder() {
  return store.get('downloadFolder', app.getPath('downloads'));
}

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 650,
    backgroundColor: '#1e1e1e',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.handle('select-folder', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  if (!canceled && filePaths.length > 0) {
    store.set('downloadFolder', filePaths[0]);
    return filePaths[0];
  }
  return getDownloadFolder();
});

ipcMain.handle('download', async (event, { url, type }) => {
  return new Promise((resolve, reject) => {
    // ✅ Caminho corrigido — sem “resources/resources”
    const basePath = app.isPackaged
      ? path.join(process.resourcesPath, 'bin', 'win')
      : path.join(__dirname, '..', 'resources', 'bin', 'win');

    const ytDlpPath = path.join(basePath, 'yt-dlp.exe');
    const ffmpegPath = path.join(basePath, 'ffmpeg.exe');
    const outputFolder = getDownloadFolder();

    const args = [
      url,
      '-f', type === 'audio' ? 'bestaudio' : 'bestvideo+bestaudio/best',
      '-o', path.join(outputFolder, '%(title)s.%(ext)s'),
      '--ffmpeg-location', ffmpegPath,
      '--newline'
    ]; 

    if (type === 'audio') {
      args.push('-x', '--audio-format', 'mp3');
    } else {
      args.push('--merge-output-format', 'mp4');
    }


    const ytdlp = spawn(ytDlpPath, args);

    ytdlp.stdout.on('data', (data) => {
      const line = data.toString();
      const match = line.match(/(\d{1,3}\.\d)%/);
      if (match) {
        event.sender.send('download-progress', parseFloat(match[1]));
      }
    });

    ytdlp.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    ytdlp.on('close', (code) => {
      if (code === 0) {
        resolve('Download completed');
      } else {
        reject(new Error(`yt-dlp exited with code ${code}`));
      }
    });
  });
});
