const {app, BrowserWindow} = require('electron')
const {autoUpdater} = require('electron-updater')

// Updater Start

// Define Menu
let template = []
if (process.platform === 'darwin') {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit(); }
      },
    ]
  })
}

app.on('ready', function()  {
  autoUpdater.checkForUpdatesAndNotify();
});

// Updater End

function createWindow () {  // 브라우저 창을 생성
    let win = new BrowserWindow({
      width: 450,
      height: 700,
      center: true,
      resizable: false
    })
  
    //브라우저창이 읽어 올 파일 위치
    win.loadFile('./index.html')
    win.removeMenu()
  }
  
  app.on('ready', createWindow);
