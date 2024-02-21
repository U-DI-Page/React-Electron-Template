const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const https = require('https');

let mainWindow = null;

const createWindow = () => {
    const isDev = process.env.NODE_ENV !== 'production';

    /**
     * current mode development or production
     */
    console.log('isDev', isDev, process.env.NODE_ENV)

    mainWindow  = new BrowserWindow({
        width: 800,
        height: 600,
        // fullscreen: true,
        maximizable: true,
        backgroundColor: '#fff',
        maximizable: true,
        darkTheme: true,
        movable: true,
        resizable: true,
        webPreferences: {
            hardwareAcceleration: false,
            javascript: true,
            plugins: true,
            nodeIntegration: true, // 不集成 Nodejs
            contextIsolation:false,
            webSecurity: false,
            preload: path.join(__dirname, 'preload.js'),
            devTools: true
         }
    })

    mainWindow.loadURL(isDev ? "http://localhost:3000/index.html" : `file://${path.join(__dirname, 'build/index.html')}`)

    if(isDev){
        /** 在开发环境中打开调试工具 */
        mainWindow.webContents.openDevTools()
        /** 在开发环境中禁用缓存 */
        mainWindow.webContents.on('did-finish-load', () => {
            mainWindow.webContents.session.clearCache();
        });
    }
    
    mainWindow.maximize()
}

app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
})
  