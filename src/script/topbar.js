document.addEventListener('DOMContentLoaded', () => {
    const { ipcRenderer } = require('electron');

    const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click', () => {
        ipcRenderer.send('closeApp');
    });

    const minimizeBtn = document.getElementById('minimizeBtn');
    minimizeBtn.addEventListener('click', () => {
        ipcRenderer.send('minimizeApp');
    });
});
// function navigateToIndex() {
//     ipcRenderer.send('navigateToIndex');
// }

// function navigateToTweak() {
//     ipcRenderer.send('navigateToTweak');
// }