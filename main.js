const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 650,
    resizable: false, // Запрещаем изменение размера окна
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Разрешаем программное изменение размера окна
  win.setResizable(false);

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);