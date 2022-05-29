// electron/main.js

// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV


//取消的话则为系统原生菜单
//require('./menu')

function createWindow() {
    // 创建浏览器窗口
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // 加载 index.html
    // mainWindow.loadFile('dist/index.html') 将该行改为下面这一行，加载url
    mainWindow.loadURL(
        NODE_ENV === 'development' ?
        'http://localhost:3000' :
        `file://${path.join(__dirname, '../dist/index.html')}`
    )

    // 打开开发工具
    if (NODE_ENV === "development") {
        mainWindow.webContents.openDevTools()
    }

}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function() {
        // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
        // 打开的窗口，那么程序会重新创建一个窗口。
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})

// 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
// 也可以拆分成几个文件，然后用 require 导入。


//主线程监听渲染进程的消息
ipcMain.on('openFile', (_event, filename) => {
    readFile(path.join(process.cwd(), `/assets/${filename}`), (_e, data) => {
        _event.reply('fileReply', data.toString())
    })
})