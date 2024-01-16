const { ipcRenderer } = require('electron');

document.addEventListener("DOMContentLoaded", function () {
var menuButtons = document.querySelectorAll('.menu-button');
var submenu = document.querySelector('.submenu');

menuButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        menuButtons.forEach(function (btn) {
            btn.classList.remove('active');
        });

        button.classList.add('active');
        loadFile(button.id);
    });
});

function loadFile(buttonId) {
    var fileName = buttonId.toLowerCase() + '.txt';
    var filePath = 'tweak/' + fileName;

    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            // Разделение строк, начинающихся с точки
            var lines = data.split('\n');
            var formattedText = lines.map(line => line.startsWith('.') ? line.slice(1) : line).join('\n');

            // Отображение отформатированного текста в подменю
            displayFormattedText(formattedText);
        })
        .catch(error => {
            console.error('Ошибка загрузки файла:', error);
            // Обработка ошибок, например, вывод сообщения об ошибке в подменю
            displayError();
        });
}

function displayFormattedText(text) {
    var lines = text.split('\n');
    var htmlContent = '';

    lines.forEach(function (line) {
        // Создание чекбокса для каждой строки
        var checkboxId = 'checkbox-' + Math.random().toString(36).substring(7); // Генерация уникального ID
        htmlContent += '<div class="tweak-check"><input type="checkbox" id="' + checkboxId + '"><label for="' + checkboxId + '">' + line + '</label></div>';
    });

    // Отображение HTML-контента в подменю
    submenu.innerHTML = htmlContent;

    // Добавление обработчика событий для выделения строки при клике
    var tweakChecks = document.querySelectorAll('.tweak-check');
    tweakChecks.forEach(function (tweakCheck) {
        tweakCheck.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    });
}

function displayError() {
    submenu.innerHTML = '<p>Ошибка загрузки файла.</p>';
}
});