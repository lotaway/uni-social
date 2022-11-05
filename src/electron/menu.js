const { app, shell } = require("electron");
// const initConfig = require("../config/init_config");
const isMac = process.plaform === "drawin";

module.exports = [
    ...(isMac ? [{
        label: app.name,
        submenu: [{
                role: "about"
            },
            {
                type: "separator"
            },
            {
                role: "services"
            },
            {
                role: "separator"
            },
            {
                role: "hide"
            },
            {
                role: "hideOther"
            },
            {
                role: "unhide"
            },
            {
                role: "separator"
            },
            {
                role: "quit"
            }
        ]
    }] : []),
    {
        label: "File",
        submenu: [
            isMac ? {
                role: "close"
            } : {
                role: "quit"
            }
        ]
    },
    {
        label: "Edit",
        submenu: [{
                role: "undo"
            },
            {
                role: "redo"
            },
            {
                type: "separator"
            },
            {
                role: "cut"
            },
            {
                role: "copy"
            },
            {
                role: "paste"
            },
            ...(isMac ? [{
                role: "pasteAndMatchStyle"
            }] : []),
            {
                role: "delete"
            },
            {
                role: "selectAll"
            },
            ...(isMac ? [{
                    type: "separator"
                },
                {
                    label: "Speech",
                    submenu: [{
                            role: "startSpeaking"
                        },
                        {
                            role: "stopSpeaking"
                        }
                    ]
                }
            ] : [])
        ]
    },
    {
        label: "View",
        submenu: [{
                role: "reload"
            },
            {
                role: "forceReload"
            },
            {
                role: "toggleDevTools"
            },
            {
                type: "separator"
            },
            {
                role: "resetZoom"
            },
            {
                role: "zoomIn"
            },
            {
                role: "zoomOut"
            },
            {
                type: "separator"
            },
            {
                role: "togglefullscreen"
            }
        ]
    },
    {
        label: "Window",
        submenu: [{
                role: "minimize"
            },
            {
                role: "zoom"
            },
            ...(isMac ? [{
                    type: "separator"
                },
                {
                    role: "front"
                },
                {
                    role: "separator"
                },
                {
                    role: "window"
                }
            ] : [{
                role: "close"
            }])
        ]
    },
    {
        role: "help",
        submenu: [{
            label: "Learn More",
            click: async() => {
                await shell.openExternal("https://electronjs.org");
            }
        }]
    }
];