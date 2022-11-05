const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const remote = require("@electron/remote/main");
const path = require('path');
// const url = require('url');
const menuTemplate = require("./electron/menu.js");
const contextMenuTemplate = require("./electron/contextMenu.js");
const isMac = process.platform === "darwin";

// Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, "./electron/preload.js")
        }
    });

    remote.initialize();
    remote.enable(mainWindow.webContents);
    // and load the html of the app.
    // mainWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, '../index.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }));
    mainWindow.loadFile("dist/build/h5/index.html");

    // Open the DevTools.
    // win.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

function createMenu() {
    const menu = Menu.buildFromTemplate(menuTemplate);

    Menu.setApplicationMenu(menu);
}

function createContextMenu() {
    const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);

    ipcMain.on("show-context-menu", event => {
        contextMenu.popup({
            window: mainWindow
        });
    });
}

// This method will be called when Electron has finished initialization and is ready to create browser windows. Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
    createMenu();
    createContextMenu();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
    if (!isMac) {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0 || mainWindow === null) {
        createWindow();
    }
});