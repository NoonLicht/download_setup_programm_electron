const { shell } = require('electron');

document.addEventListener("DOMContentLoaded", function () {
  const container1 = document.querySelector('.container1 .com');
  const container2 = document.querySelector('.container2 .coms');

  // Создаем кнопки для контейнера1
  const buttonsContainer1 = document.createElement("div");
  buttonsContainer1.className = "buttons-container";

  buttonsContainer1.appendChild(chooseFolderButton);
  buttonsContainer1.appendChild(downloadButton);
  buttonsContainer1.appendChild(installButton);
  buttonsContainer1.appendChild(installLinux);
  buttonsContainer1.appendChild(installHyperV);
  buttonsContainer1.appendChild(GithubLink);
  buttonsContainer1.appendChild(toggleThemeBtn);

  container1.appendChild(buttonsContainer1);

  // Создаем кнопки для контейнера2
  const buttonsContainer2 = document.createElement("div");
  buttonsContainer2.className = "buttons-container";

  buttonsContainer2.appendChild(EnableCheck);
  buttonsContainer2.appendChild(RollBack);
  buttonsContainer2.appendChild(GithubLinkDouble);
  buttonsContainer2.appendChild(toggleThemeBtnDouble);

  container2.appendChild(buttonsContainer2);
});

// Остальной код кнопок и их обработчиков
function createIconButton(className, clickHandler, iconPath) {
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

  button.appendChild(iconContainer);

  return button;
}

// Использование функции для создания кнопок
const chooseFolderButton = createIconButton(
  "button normal-button",
  chooseFolder,
  "M3 17V7a2 2 0 0 1 2-2h6l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"
);

const downloadButton = createIconButton(
  "button normal-button",
  downloadData,
  "M12 10v6m0 0-3-3m3 3 3-3M3 17V7a2 2 0 0 1 2-2h6l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"
);

const installButton = createIconButton(
  "button normal-button",
  installData,
  "M17 14v6m-3-3h6M6 10h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Zm10 0h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2ZM6 20h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z"
);

const installLinux = createIconButton(
  "button normal-button",
  installWSL,
  "m8 9 3 3-3 3 M13 15h3 M5 20h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
);

const installHyperV = createIconButton(
  "button normal-button",
  installHyper,
  "m21 14-9 7-9-7L6 3l3 7h6l3-7 3 11Z"
);

const GithubLink = createIconButton(
  "button normal-button",
  gitLink,
  "M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21h6Z M9 19c-4.3 1.4-4.3-2.5-6-3"
);

const GithubLinkDouble = createIconButton(
  "button normal-button",
  gitLink,
  "M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21h6Z M9 19c-4.3 1.4-4.3-2.5-6-3"
);

const EnableCheck = createIconButton(
  "button normal-button",
  enableCheck,
  "m9 12 2 2 4-4 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
);

const RollBack = createIconButton(
  "button normal-button",
  rollBack,
  "m15 19-7-7 7-7"
);

const toggleThemeBtn = createIconButton(
  "button toggle-theme-button",
  toggleTheme,
  "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
);

const toggleThemeBtnDouble = createIconButton(
  "button toggle-theme-button",
  toggleTheme,
  "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
);

//----------------------------------------Обработка кнопок----------------------------------------//

function enableCheck() {
  console.log("Установить данные");
}

function rollBack() {
  console.log("Ссылка на репозиторий");
}

function chooseFolder() {
  console.log("Выбрать папку");
}

function installHyper() {
  console.log("Включить Hyper-V");
}

function installWSL() {
  console.log("Установить WSL");
}

function downloadData() {
  console.log("Скачать данные");
}

function installData() {
  console.log("Установить данные");
}

function gitLink() {
  const repositoryURL = "https://github.com/NoonLicht/download_setup_programm_electron";
  shell.openExternal(repositoryURL);
}

function toggleTheme() {
  const isDarkTheme = document.body.classList.toggle('dark-theme');
  console.log("Theme toggled:", isDarkTheme);

  const pathElementsBtn1 = toggleThemeBtn.querySelectorAll("path");
  const pathElementsBtn2 = toggleThemeBtnDouble.querySelectorAll("path");

  const newPath = isDarkTheme
    ? "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
    : "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z";

  pathElementsBtn1.forEach((path) => {
    path.setAttribute("d", newPath);
  });

  pathElementsBtn2.forEach((path) => {
    path.setAttribute("d", newPath);
  });
}