const BrowserWindow = require("@electron/remote").BrowserWindow;

function openWindow(url) {
    const newWindow = new BrowserWindow({
        width: 1200,
        height: 800
    });

    // newWindow.loadURL("");
}