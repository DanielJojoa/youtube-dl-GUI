const { app, BrowserWindow } = require('electron');
app.on('ready',()=>{
    let mainWindow = new BrowserWindow();
    mainWindow.setMaximumSize(400,800);
    mainWindow.loadURL('file://'+__dirname+'/index.html')
});
