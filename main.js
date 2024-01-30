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

// Добавляем обработчик для открытия диалога выбора папки
ipcMain.on('openFolderDialog', async (event, arg) => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
    defaultPath: arg || undefined, // Устанавливаем начальный путь
  });

  // В result.filePaths у вас будет выбранный путь к папке
  const folderPath = result.filePaths[0];
  console.log('Selected folder:', folderPath);

  // Сохраняем выбранный путь
  event.reply('folderSelected', folderPath);
});

// Добавляем обработчик для открытия ссылок в фоне
ipcMain.on('openLinksInBackground', async (event, links) => {
  // Открываем каждую ссылку в фоне (это пример, вы можете использовать свой механизм)
  for (const link of links) {
    // Ваш код для открытия ссылок в фоне
    console.log('Opening link in background:', link);
  }
});