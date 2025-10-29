const { app, BrowserWindow } = require("electron");

const path = require("node:path");

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
    });

    const dev = !app.isPackaged;

    if (dev) {
        window.loadURL("http://localhost:5173");
    } else {
        window.loadFile(path.join(__dirname, "../renderer/dist/index.html"));
    }
};

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
