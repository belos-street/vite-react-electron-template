const { Menu, BrowserWindow } = require('electron')

const NODE_ENV = process.env.NODE_ENV

// 2.创建菜单模板,数组里的每一个对象都是一个菜单
const template = [{
        label: '菜单一',
        // submenu 代表下一级菜单
        submenu: [{
                label: '子菜单一',
                // 添加快捷键
                accelerator: 'ctrl+n'
            },
            {
                label: '子菜单二',
                click: () => {
                    console.log('子菜单二 click')
                }
            },
            { label: '子菜单三' },
        ],
    },
    {
        label: '其它',
        // submenu 代表下一级菜单
        submenu: [
            { label: '子菜单一' },
            { label: '子菜单二' },
            { label: '子菜单三' },
            {
                label: '关于',
                accelerator: 'ctrl+o',
                click: () => {
                    createAboutWindow()
                }
            },
        ],
    },
]

const createAboutWindow = () => {
    const aboutWin = new BrowserWindow({
        width: 200,
        height: 200,
    })
    aboutWin.loadURL(NODE_ENV === 'development' ?
            'http://localhost:3000' :
            `file://${path.join(__dirname, '../dist/index.html')}`)
        // 为关闭的时候进行清空
    aboutWin.on('close', () => sonWin = null)
}

// 3.从模板中创建菜单
const myMenu = Menu.buildFromTemplate(template)

// 4.设置为应用程序菜单
Menu.setApplicationMenu(myMenu)