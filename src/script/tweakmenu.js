// Function to create a menu button
function createMenuButton(id, text) {
  const button = document.createElement('button');
  button.className = 'menu-button';
  button.id = id;
  button.textContent = text;
  button.onclick = function () {
      document.querySelectorAll('.menu-button').forEach(btn => btn.classList.remove('active'));

      button.classList.add('active');

      loadFile(id);
  };
  return button;
}

function createTweakMenu() {
  const tweakmenu = document.getElementById('tweakmenu');

  const menu = document.createElement('div');
  menu.className = 'menu';

  const confidentialityBtn = createMenuButton('confidentiality', 'Конфиденциальность');
  const personalizationBtn = createMenuButton('personalization', 'Персонализация');
  const systemBtn = createMenuButton('system', 'Система');
  const securityBtn = createMenuButton('security', 'Безопасность');

  menu.appendChild(confidentialityBtn);
  menu.appendChild(personalizationBtn);
  menu.appendChild(systemBtn);
  menu.appendChild(securityBtn);

  const submenu = document.createElement('div');
  submenu.className = 'submenu';

  const description = document.createElement('div');
  description.className = 'description';

  tweakmenu.appendChild(menu);
  tweakmenu.appendChild(submenu);
  tweakmenu.appendChild(description);
}

document.addEventListener('DOMContentLoaded', createTweakMenu);

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

  document.querySelector('.submenu').innerHTML = htmlContent;

  // Добавление обработчика событий для выделения строки при клике
  var tweakChecks = document.querySelectorAll('.tweak-check');
  tweakChecks.forEach(function (tweakCheck) {
      tweakCheck.addEventListener('click', function () {
          this.classList.toggle('active');
      });
  });
}

function displayError() {
  document.querySelector('.submenu').innerHTML = '<p>Ошибка загрузки файла.</p>';
}
