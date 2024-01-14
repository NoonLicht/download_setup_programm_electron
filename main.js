// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const ipc = ipcMain;
const fs = require('fs');



let mainWindow;
let loadingWindow;

function createLoadingWindow() {
    loadingWindow = new BrowserWindow({
        width: 1200,
        height: 650,
        frame: false,
        transparent: true,
        center: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    loadingWindow.loadFile('src/loading.html');

    loadingWindow.on('closed', () => {
        loadingWindow = null;
    });
}

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 650,
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile('src/index.html');
  
    // Добавим обработчик события для закрытия окна через IPC
    ipcMain.on('closeApp', () => {
        console.log('Clicked on Close Btn');
        mainWindow.close();
    });
    
    ipcMain.on('minimizeApp', () => {
        console.log('Clicked on Minimize Btn');
        mainWindow.minimize();
    });

    ipcMain.on('getThemeIndex', (event) => {
        event.reply('currentThemeIndex', currentThemeIndex);
    });

    ipcMain.on('setThemeIndex', (event, newIndex) => {
        currentThemeIndex = newIndex;
        mainWindow.webContents.send('currentThemeIndex', newIndex);
    });
}

app.whenReady().then(() => {
    createLoadingWindow();

    setTimeout(() => {
        loadingWindow.close();
        createMainWindow();
    }, 1000);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});

ipcMain.on('navigateToIndex', () => {
    mainWindow.loadFile('src/index.html');
});

ipcMain.on('navigateToTweak', () => {
    mainWindow.loadFile('src/tweak.html');
});