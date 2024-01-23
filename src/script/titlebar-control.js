const { ipcRenderer } = require('electron');

function createButton(className, id, svgPath, clickHandler) {
    const button = document.createElement('button');
    button.className = className;
    button.id = id;
    button.style.display = 'flex';
    button.style.justifyContent = 'center';
    button.onclick = clickHandler;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('viewBox', '0 0 24 24');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', svgPath);

    svg.appendChild(path);
    button.appendChild(svg);

    return button;
}

function createTitleBar() {
    const titlebar = document.getElementById('titlebar');

    const closeBtn = createButton('close', 'closeBtn', 'm6 6 12 12M6 18 18 6 6 18Z', null);
    const minimizeBtn = createButton('minimize', 'minimizeBtn', 'M5 12h14', null);
    const menuBtn = createButton('navbutton', 'menuBtn', 'M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01', navigateToIndex);
    const tweakerBtn = createButton('navbutton', 'tweakerBtn', 'M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z', navigateToTweak);

    titlebar.appendChild(closeBtn);
    titlebar.appendChild(minimizeBtn);
    titlebar.appendChild(menuBtn);
    titlebar.appendChild(tweakerBtn);
}


document.addEventListener('DOMContentLoaded', createTitleBar);