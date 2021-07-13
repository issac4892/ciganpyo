const {app, BrowserWindow} = require('electron')

function createWindow () {  // 브라우저 창을 생성
    let win = new BrowserWindow({
      width: 450,
      height: 650,
      webPreferences: {
        nodeIntegration: true
      }
    })
  
    //브라우저창이 읽어 올 파일 위치
    win.loadFile('./index.html')
    win.removeMenu()
    win.setResizable(false)
  }
  
  app.on('ready', createWindow);
