const {app, BrowserWindow, Notification} = require('electron')
const {autoUpdater} = require('electron-updater')
const log = require('electron-log')

//Object.defineProperty(app, 'isPackaged', {
//  get() {
//    return true
//  }
//})

function notifyupdate () {
  new Notification({title: "업데이트 가능", body: "업데이트 후 시작합니다."}).show()
}

// Logger

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...')
autoUpdater.on('checking-for-update', () => {
  log.info('Checking for update...')
})
autoUpdater.on('update-available', (info) => {
  log.info('Update available.')
})
autoUpdater.on('update-not-available', (info) => {
  log.info('Update not available.')
})
autoUpdater.on('error', (err) => {
  log.info('Error in auto-updater. ' + err)
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
  log.info(log_message)
})
autoUpdater.on('update-downloaded', (info) => {
  log.info('Update downloaded')
  notifyupdate()
  autoUpdater.quitAndInstall()
})

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

// Updater End

function createWindow () {  // 브라우저 창을 생성
    let win = new BrowserWindow({
      width: 450,
      height: 680,
      center: true,
      resizable: false
    })
  
    //브라우저창이 읽어 올 파일 위치
    win.loadFile('./index.html')
    win.removeMenu()
  }

  app.on('ready', function()  {
    autoUpdater.checkForUpdates();
    log.info(app.getVersion())
    createWindow()
  })

  app.on('window-all-closed', () => {
    app.quit()
  })