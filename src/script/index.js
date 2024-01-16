const { ipcRenderer } = require('electron');

document.addEventListener("DOMContentLoaded", function () {
    initIndex();
});

function initIndex() {
    const container = document.querySelector('.com');
    // Создаем контейнер для блоков
    const blocksContainer = document.createElement("div");
    blocksContainer.className = "blocks-container";
    container.appendChild(blocksContainer);

    //----------------------------------------Чтение данных из файла----------------------------------------//

    fetch('data.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const lines = data.split('\n');

            let currentBlockCheckboxes = [];

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();

                if (line) {
                    // Если строка не пустая

                    if (line.startsWith("/")) {
                        // Убираем символ "/" из названия блока
                        const blockName = line.replace("/", "").trim();

                        // Создаем новый блок
                        const block = document.createElement("div");
                        block.className = "checkbox-block";

                        // Добавляем чекбокс для блока
                        const blockCheckbox = document.createElement("input");
                        blockCheckbox.type = "checkbox";
                        blockCheckbox.id = "blockCheckbox" + (i + 1);

                        // Добавляем название блока
                        const blockLabel = document.createElement("label");
                        blockLabel.htmlFor = "blockCheckbox" + (i + 1);
                        blockLabel.innerHTML = blockName;

                        // Добавляем стиль только к названию блока
                        blockLabel.classList.add("block-name-style");

                        // Добавляем чекбокс и название блока в блок
                        block.appendChild(blockCheckbox);
                        block.appendChild(blockLabel);

                        // Добавляем блок в контейнер блоков
                        blocksContainer.appendChild(block);

                        // Добавляем чекбокс блока в массив для последующего использования
                        currentBlockCheckboxes.push(blockCheckbox);
                    } else {
                        // Если это строка с названием программы, добавляем чекбокс для программы
                        const programCheckbox = document.createElement("input");
                        programCheckbox.type = "checkbox";
                        programCheckbox.className = "program-checkbox";
                        programCheckbox.id = "programCheckbox" + (i + 1);

                        // Добавляем название программы
                        const programLabel = document.createElement("label");
                        programLabel.htmlFor = "programCheckbox" + (i + 1);
                        programLabel.textContent = line;

                        programLabel.classList.add("program-name-style");

                        // Создаем контейнер для логотипа и программы
                        const programLogoContainer = document.createElement("div");
                        programLogoContainer.className = "program-logo-container";

                        // Получаем название программы без лишних пробелов
                        const programName = line.trim();

                        // Формируем путь к логотипу
                        const logoPath = `C:/Users/Moon/Desktop/MyProject/download_setup_programm_electron/src/logo/${programName}.png`;

                        // Создаем элемент логотипа
                        const programLogo = document.createElement("img");
                        programLogo.className = "program-logo";
                        programLogo.src = logoPath;
                        programLogo.alt = programName;
                        programLogo.width = 15;
                        programLogo.height = 15;

                        // Добавляем логотип и программу в контейнер
                        programLogoContainer.appendChild(programLogo);
                        programLogoContainer.appendChild(programCheckbox);
                        programLogoContainer.appendChild(programLabel);

                        // console.log(`Added logo for ${programName}: ${logoPath}`);

                        // Добавляем контейнер с логотипом и программой в последний блок
                        const lastBlock = blocksContainer.lastElementChild;
                        lastBlock.appendChild(programLogoContainer);
                    }
                }
            }

            currentBlockCheckboxes.forEach(blockCheckbox => {
                blockCheckbox.addEventListener("change", function () {
                    toggleProgramCheckboxes(this);
                });
            });
        })
        .catch(error => console.error('Ошибка загрузки файла:', error));
}
function toggleProgramCheckboxes(blockCheckbox) {
    // Находим родительский блок для данного чекбокса
    const block = blockCheckbox.closest(".checkbox-block");

    // Находим все чекбоксы программ внутри этого блока
    const programCheckboxes = block.querySelectorAll(".program-checkbox");

    // Устанавливаем состояние всех чекбоксов программ таким же, как и у чекбокса блока
    programCheckboxes.forEach(programCheckbox => {
        programCheckbox.checked = blockCheckbox.checked;
    });
}
