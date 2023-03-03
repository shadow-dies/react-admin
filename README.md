# 项目运行说明

## 启动客户端

```bash
final文件打开终端

cd fe
#进入前端项目文件夹
npm i
# 安装依赖
npm start
# 运行项目
在 http://localhost:3000/ 打开前端项目
```

## 启动服务端
```bash
cd server

npm i

npm start

在3001端口启动服务器
```

## 用户登录
```
本实验设置了三个账号，保存在admin.json中，分别为

用户名：admin
密码：123456

用户名：hzt
密码:123456qwepoi

用户名：guest
密码：11122415
```

## 文件结构
```
server
│   README.md 
│
└───fe: 前端项目
│   │   README.md
│   │
│   │───pubilc: 静态资源文件
│   │───build： 打包项目文件
│   └───src: 前端代码文件
│       │    router.tsx: 路由配置文件
│       │    setupProxy.ts: 跨域代理配置文件
│       │    index.tsx: 项目主文件
│       │
│       │───components: 组件文件
│       │───pages： 页面文件
│       └───utils： 工具函数
│   
│ 
└───server: 后端项目
    │   README.md
    │   app.js: 项目主文件
    │
    │───pubilc: 静态资源文件，json文件就保存在这里了
    │───config: config配置文件
    └───router: 路由文件

       
```
