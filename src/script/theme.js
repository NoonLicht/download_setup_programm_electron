document.addEventListener("DOMContentLoaded", function () {
  const toggleThemeButton = document.getElementById('toggleThemeBtn');
  toggleThemeButton.addEventListener("click", toggleTheme);

  function toggleTheme() {
    ipcRenderer.send('toggleTheme');
  }
});