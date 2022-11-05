const { contextBridge, ipcMain, ipcRenderer } = require("electron");

const eventHandler = (event, data) => {
    switch (event) {
        default: console.log("unexpect event type: " + event);
        break;
    }
};

contextBridge.exposeInMainWorld("desktop", {
    "emitMain": (event, data) => ipcMain.emit(event, data),
    "emit": (event, data) => eventHandler(event, data)
});

window.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("contextmenu", event => {
        event.preventDefault();
        ipcRenderer.send("show-conext-menu");
    });
});