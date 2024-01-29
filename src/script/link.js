const fs = require('fs');
const path = require('path');

document.addEventListener("DOMContentLoaded", function () {
  const blocksContainer = document.querySelector('.blocks-container');

  blocksContainer.addEventListener("click", function (event) {
      const target = event.target;

      // Проверяем, является ли элемент чекбоксом
      if (target.type === "checkbox" && target.className === "program-checkbox") {
          // Получаем текстовое содержимое (название программы)
          const programName = target.nextElementSibling.textContent.trim();

          // Получаем индекс блока, в котором находится чекбокс
          const blockIndex = Array.from(target.closest('.checkbox-block').parentNode.children).indexOf(target.closest('.checkbox-block'));

          // Получаем строку из data_id.txt, соответствующую выбранной программе
          const idOrLink = getDataIdOrLink(programName, blockIndex);

          // Обрабатываем полученное значение
          processIdOrLink(idOrLink);
      }
  });
});

function getDataIdOrLink(programName, blockIndex) {
  const dataPath = path.join(__dirname, 'data.txt');
  const dataIdPath = path.join(__dirname, 'data_id.txt');

  try {
    // Чтение данных из файлов
    const dataContent = fs.readFileSync(dataPath, 'utf-8').split('\n');
    const dataIdContent = fs.readFileSync(dataIdPath, 'utf-8').split('\n');

    // Находим индекс строки в файле data.txt
    const dataIndex = dataContent.findIndex((line) => line.trim() === programName);

    if (dataIndex !== -1) {
      // Извлекаем соответствующую строку из файла data_id.txt
      const dataIdLine = dataIdContent[dataIndex].trim();

      // Проверяем, является ли значение числом (id) или ссылкой
      if (!isNaN(dataIdLine)) {
        // Это id, формируем ссылку
        return `https://www.comss.ru/download/page.php?id=${dataIdLine}`;
      } else {
        // Это ссылка
        return dataIdLine;
      }
    } else {
      // Строка не найдена
      return 'Строка не найдена';
    }
  } catch (error) {
    return `Ошибка при чтении файла: ${error.message}`;
  }
}

function processIdOrLink(idOrLink) {
  if (idOrLink.match(/^\d{3,5}$/)) {
      // Если значение является числом от 3 до 5 цифр, формируем ссылку
      const link = `https://www.comss.ru/download/page.php?id=${idOrLink}`;
      console.log(link);
  } else {
      // Если значение не является числом, считаем его ссылкой
      console.log(idOrLink);
  }
}