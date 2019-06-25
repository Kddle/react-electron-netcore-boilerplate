const url = require("url");
const path = require("path");
const { ConnectionBuilder } = require("electron-cgi");
const ipc = require('electron').ipcMain;

import { app, BrowserWindow } from 'electron';

let window: BrowserWindow | null;

const createWindow = () => {
    window = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } });

    window.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        })
    );

    window.on("closed", () => {
        window = null;
    });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (window === null) {
        createWindow();
    }
});

let connection = new ConnectionBuilder()
.connectTo("dotnet", "run", "--project", "./Core")
.build();

connection.onDisconnect = () => {
    console.log("disconnected from server");
}

ipc.on('get-data', function (event: any, arg: string) {
    console.log('[INFO] GET-DATA received from RP');
    
    connection.send("greeting", arg, (response: string) => {
        console.log('[INFO] Message Received from Ghost Server');
        console.log('[INFO] response : ', response);
        window.webContents.send('get-data-response', response);
    });
});
