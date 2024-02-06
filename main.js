// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const ipc = ipcMain;
const fs = require('fs');
const { exec } = require('child_process');


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

// Добавляем обработчик для запуска процесса установки
ipcMain.on('startInstallation', (event, folderPath) => {
    console.log('Starting installation process...');
  
    // Получаем список файлов в выбранной папке
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(`Error reading directory: ${err.message}`);
        return;
      }
  
      // Фильтруем только файлы с расширением .exe
      const exeFiles = files.filter(file => path.extname(file).toLowerCase() === '.exe');
  
      if (exeFiles.length === 0) {
        console.log('No executable files found in the selected folder.');
        return;
      }
  
      // Запускаем установку каждого exe файла по очереди
      installNextExe(folderPath, exeFiles, 0);
    });
  });
  
  // Функция рекурсивной установки следующего exe файла
  function installNextExe(folderPath, exeFiles, index) {
    if (index >= exeFiles.length) {
      console.log('Installation of all executable files completed.');
      return;
    }
  
    const filePath = path.join(folderPath, exeFiles[index]);
    console.log(`Installing ${filePath}...`);
  
    // Запускаем процесс установки тихо
    exec(`start /B /WAIT "" "${filePath}" /S`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing ${filePath}: ${error.message}`);
        return;
      }
  
      console.log(`Installation of ${filePath} completed.`);
  
      // После установки удаляем exe файл
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting ${filePath}: ${err.message}`);
          // Переход к следующему exe файлу
          installNextExe(folderPath, exeFiles, index + 1);
          return;
        }
      
        console.log(`${filePath} deleted.`);
        
        // Переход к следующему exe файлу
        installNextExe(folderPath, exeFiles, index + 1);
      });
    });
  }