import { app } from 'electron';
import { TitleWindowController } from "./windows/controllers/TitleWindowController";

let titleWindowController = new TitleWindowController();

function createTitleWindow() {
    titleWindowController.createWindow();
}

app.on('ready', createTitleWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (titleWindowController.getWindow() === null) {
        createTitleWindow();
    }
});