document.addEventListener("DOMContentLoaded", function () {

            const container = document.querySelector('.com');

            function createIconButton(className, clickHandler, iconPath) {
                const button = document.createElement("button");
                button.className = "button normal-button";
                button.addEventListener("click", clickHandler);

                const iconSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                iconSVG.setAttribute("width", "85%");
                iconSVG.setAttribute("height", "85%");
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

            const installButton = createIconButton(
                "button normal-button",
                installData,
                "M3 3h7v7H3zm11 0h7v7h-7zm0 10h7v7h-7zm-11 0h7v7H3z"
            );

            const GithubLink = createIconButton(
                "button normal-button",
                gitLink,
                "M16.25 22.5v-3.865a3.361 3.361 0 0 0-.94-2.607c3.14-.35 6.44-1.538 6.44-6.99a5.43 5.43 0 0 0-1.5-3.746 5.058 5.058 0 0 0-.09-3.765s-1.18-.35-3.91 1.478a13.397 13.397 0 0 0-7 0C6.52 1.177 5.34 1.527 5.34 1.527a5.058 5.058 0 0 0-.09 3.765 5.43 5.43 0 0 0-1.5 3.775c0 5.413 3.3 6.602 6.44 6.991a3.366 3.366 0 0 0-.94 2.577V22.5 M9.25 19.503c-5 1.498-5-2.496-7-2.996"
            );


            //----------------------------------------Кнопка "Смена темы"----------------------------------------//

            const toggleThemeButton = document.createElement("button");
            toggleThemeButton.className = "button toggle-theme-button";
            toggleThemeButton.addEventListener("click", toggleTheme);

            // Создаем контейнер для хранения свг
            const svgContainer = document.createElement("div");
            svgContainer.className = "svg-container";

            // Создаем массив из ваших свг
            const svgs = [
                `<svg width="85%" height="85%" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7a5 5 0 1 0 0 10 5 5 0 1 0 0-10z"></path>
                    <path d="M12 1v2"></path>
                    <path d="M12 21v2"></path>
                    <path d="m4.22 4.22 1.42 1.42"></path>
                    <path d="m18.36 18.36 1.42 1.42"></path>
                    <path d="M1 12h2"></path>
                    <path d="M21 12h2"></path>
                    <path d="m4.22 19.78 1.42-1.42"></path>
                    <path d="m18.36 5.64 1.42-1.42"></path>
                </svg>`,
                `<svg width="85%" height="85%" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"></path>
                </svg>`
            ];

            // Устанавливаем первое svg при инициализации
            svgContainer.innerHTML = svgs[0];
            toggleThemeButton.appendChild(svgContainer);

            // Индекс текущего svg
            let currentSvgIndex = 0;

            // Создаем контейнер для кнопок
            const buttonsContainer = document.createElement("div");
            buttonsContainer.className = "buttons-container";
            buttonsContainer.appendChild(installButton);
            buttonsContainer.appendChild(GithubLink);
            buttonsContainer.appendChild(toggleThemeButton);
            container.appendChild(buttonsContainer);

            //----------------------------------------Обработка кнопок----------------------------------------//

            

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
                console.log("Ссылка на репозиторий");
            }

            function toggleTheme() {
                currentSvgIndex = (currentSvgIndex + 1) % svgs.length;
                svgContainer.innerHTML = svgs[currentSvgIndex];
                document.body.classList.toggle('dark-theme');
            }

            function toggleProgramCheckboxes(blockCheckbox) {
                const block = blockCheckbox.closest(".checkbox-block");
                const programCheckboxes = block.querySelectorAll(".program-checkbox");

                programCheckboxes.forEach(checkbox => {
                    checkbox.checked = blockCheckbox.checked;
                });
            }
        });