// const { app, BrowserWindow } = require('electron');

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1000,
//     height: 650,
//     resizable: false, // Запрещаем изменение размера окна
//     webPreferences: {
//       nodeIntegration: true
//     }
//   });

//   // Разрешаем программное изменение размера окна
//   win.setResizable(false);

//   win.loadFile('index.html');
// }

// app.whenReady().then(createWindow);

const { app, BrowserWindow } = require('electron');

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

  loadingWindow.loadFile('loading.html');

  loadingWindow.on('closed', () => {
    loadingWindow = null;
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 650,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createLoadingWindow();

  // Simulate some delay for loading (replace this with your actual loading logic)
  setTimeout(() => {
    loadingWindow.close();
    createMainWindow();
  }, 3000); // 3000 milliseconds (3 seconds) as an example delay
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
