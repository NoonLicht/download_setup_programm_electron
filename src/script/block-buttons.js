const { shell } = require('electron');
const sudo = require('sudo-prompt');

document.addEventListener("DOMContentLoaded", function () {
  const container1 = document.querySelector('.container1 .com');
  const container2 = document.querySelector('.container2 .coms');
  const container3 = document.querySelector('.container3 .coms');

  // Создаем кнопки для блоков с приложениями
  const buttonsContainer1 = document.createElement("div");
  buttonsContainer1.className = "buttons-container";

  buttonsContainer1.appendChild(chooseFolderButton);
  buttonsContainer1.appendChild(downloadButton);
  buttonsContainer1.appendChild(installButton);
  buttonsContainer1.appendChild(installLinux);
  buttonsContainer1.appendChild(installHyperV);
  buttonsContainer1.appendChild(GithubLinkOne);
  buttonsContainer1.appendChild(toggleThemeBtnOne);

  container1.appendChild(buttonsContainer1);

  // Создаем кнопки для твиков
  const buttonsContainer2 = document.createElement("div");
  buttonsContainer2.className = "buttons-container";

  buttonsContainer2.appendChild(EnableCheck);
  buttonsContainer2.appendChild(GithubLinkTwo);
  buttonsContainer2.appendChild(toggleThemeBtnTwo);

  container2.appendChild(buttonsContainer2);

  //Создаем кнопки для страницы с удалением программ
  const buttonsContainer3 = document.createElement("div");
  buttonsContainer3.className = "buttons-container";

  buttonsContainer3.appendChild(deleteChecked);
  buttonsContainer3.appendChild(GithubLinkThree);
  buttonsContainer3.appendChild(toggleThemeBtnThree);

  container3.appendChild(buttonsContainer3);
});

// Остальной код кнопок и их обработчиков
function createIconButton(className, clickHandler, iconPath, buttonText) {
  const button = document.createElement("button");
  button.className = "button normal-button";
  button.addEventListener("click", clickHandler);

  const iconSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  iconSVG.setAttribute("width", "95%");
  iconSVG.setAttribute("height", "95%");
  iconSVG.setAttribute("fill", "none");
  iconSVG.setAttribute("stroke", "currentColor");
  iconSVG.setAttribute("stroke-linecap", "round");
  iconSVG.setAttribute("stroke-linejoin", "round");
  iconSVG.setAttribute("stroke-width", "2");
  iconSVG.setAttribute("viewBox", "0 0 24 24");

  const iconPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  iconPathElement.setAttribute("d", iconPath);

  iconSVG.appendChild(iconPathElement);

  const iconContainer = document.createElement("div");
  iconContainer.className = "svg-con";
  iconContainer.appendChild(iconSVG);

  const buttonTextElement = document.createElement("div");
  buttonTextElement.className = "button-text";
  buttonTextElement.textContent = buttonText;

  button.appendChild(iconContainer);
  button.appendChild(buttonTextElement);

  return button;
}


// Использование функции для создания кнопок
const chooseFolderButton = createIconButton(
  "button normal-button",
  chooseFolder,
  "M3 17V7a2 2 0 0 1 2-2h6l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",
  "Выбрать папку"
);

const downloadButton = createIconButton(
  "button normal-button",
  downloadData,
  "M12 10v6m0 0-3-3m3 3 3-3M3 17V7a2 2 0 0 1 2-2h6l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",
  "Скачать"
);

const installButton = createIconButton(
  "button normal-button",
  installData,
  "M17 14v6m-3-3h6M6 10h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Zm10 0h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2ZM6 20h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z",
  "Установить"
);

const installLinux = createIconButton(
  "button normal-button",
  enableWSL,
  "m8 9 3 3-3 3 M13 15h3 M5 20h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z",
  "Установить WSL"
);

const installHyperV = createIconButton(
  "button normal-button",
  installHyper,
  "m21 14-9 7-9-7L6 3l3 7h6l3-7 3 11Z",
  "Включить Hyper-V"
);

const deleteChecked = createIconButton(
  "button normal-button",
  deleteApps,
  "M10 11v6m4-6v6M4 7h16m-1 0-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7h14Zm-4 0V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3h6Z",
  "Удалить выбранное"
)

const GithubLinkOne = createIconButton(
  "button normal-button",
  gitLink,
  "M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21h6Z M9 19c-4.3 1.4-4.3-2.5-6-3",
  "Репозиторий"
);

const GithubLinkTwo = createIconButton(
  "button normal-button",
  gitLink,
  "M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21h6Z M9 19c-4.3 1.4-4.3-2.5-6-3",
  "Репозиторий"
);

const GithubLinkThree = createIconButton(
  "button normal-button",
  gitLink,
  "M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21h6Z M9 19c-4.3 1.4-4.3-2.5-6-3",
  "Репозиторий"
);

const EnableCheck = createIconButton(
  "button normal-button",
  enableCheck,
  "m9 12 2 2 4-4 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  "Применить"
);

const toggleThemeBtnOne = createIconButton(
  "button normal-button",
  toggleTheme,
  "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  "Сменить тему"
);

const toggleThemeBtnTwo = createIconButton(
  "button normal-button",
  toggleTheme,
  "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  "Сменить тему"
);

const toggleThemeBtnThree = createIconButton(
  "button normal-button",
  toggleTheme,
  "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  "Сменить тему"
);

//----------------------------------------Обработка кнопок----------------------------------------//

function deleteApps() {
  console.log("Удалить выбранные приложения")
}

function enableCheck() {
  console.log("Установить данные");
}

function chooseFolder() {
  ipcRenderer.send('openFolderDialog');
}

function downloadData() {
  console.log("Скачать данные");
}

function installData() {
  console.log("Установить данные");
}

function installHyper() {
  const command = 'powershell Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All';

  sudo.exec(command, { name: 'Your App Name' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Ошибка при включении Hyper-V: ${error}`);
    } else {
      console.log(`Hyper-V успешно включен:\n${stdout}`);
    }
  });
}

function enableWSL() {
  const enableCommand = 'powershell dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart';

  sudo.exec(enableCommand, { name: 'Your App Name' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Ошибка при включении WSL: ${error}`);
    } else {
      console.log(`WSL успешно включен:\n${stdout}`);
      installWSL();
    }
  });
}

function installWSL() {
  const installCommand = 'wsl.exe --install -d Ubuntu-22.04';

  sudo.exec(installCommand, { name: 'Your App Name' }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Ошибка установки WSL: ${error}`);
    } else {
      console.log(`WSL успешно установлен:\n${stdout}`);
    }
  });
}

function gitLink() {
  const repositoryURL = "https://github.com/NoonLicht/download_setup_programm_electron";
  shell.openExternal(repositoryURL);
}

function toggleTheme() {
  const isDarkTheme = document.body.classList.toggle('dark-theme');
  console.log("Theme toggled:", isDarkTheme);

  const pathElementsBtn1 = toggleThemeBtnOne.querySelectorAll("path");
  const pathElementsBtn2 = toggleThemeBtnTwo.querySelectorAll("path");
  const pathElementsBtn3 = toggleThemeBtnThree.querySelectorAll("path");

  const newPath = isDarkTheme
    ? "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
    : "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z";

  pathElementsBtn1.forEach((path) => {
    path.setAttribute("d", newPath);
  });

  pathElementsBtn2.forEach((path) => {
    path.setAttribute("d", newPath);
  });

  pathElementsBtn3.forEach((path) => {
    path.setAttribute("d", newPath);
  });
}