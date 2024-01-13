if (window.process) {
    var { ipcRenderer } = window.require("electron");
}
else {
    document.getElementById('titlebar').style.display='none'
}
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};
if(window.process){
ipcRenderer.on('unmaximized',()=>{
    document.getElementById('restore-button').style.display='none'
    document.getElementById('max-button').style.display='flex'
})
ipcRenderer.on('maximized',()=>{
    document.getElementById('restore-button').style.display='flex'
    document.getElementById('max-button').style.display='none'
})
}