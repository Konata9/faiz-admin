# Faiz-admin

一个基于 TypeScript 的前后端一体启动模板。帮助全干或想要全干的工程师们快速启动项目。项目介绍请参考[本文]()

## 技术栈

- 前端
  - 框架： React + mobx
  - UI： antd, styled-component
  - 请求工具： Apollo Client, Axios
- 后端
  - 框架：Express，Apollo Server
  - ORM：Mongoose（TypeGoose）
  - Graphql：TypeGraphQL

## 运行项目

0. 请确保已经安装了 TypeScript
1. 请确保已经安装并启动了 MongoDB，端口号可以在 `server` 文件夹的 `config` 里设置。推荐使用 Docker 镜像。
2. 前后端可单独运行，因此安装依赖时请进入各自的文件夹。

```shell
# 1. 前端项目，全局配置在 config 文件夹下
cd frontend

yarn add

yarn run dev

# 2. 后端项目
cd server

yarn add

# 首次运行项目时，初始化数据库
yarn run db-init

yarn run dev
```

前端运行在 2222 端口；后端运行在 3333 端口。去掉 JWT 的校验便可进入 GraphQL 的 playground 模式进行玩耍。

默认账号密码: admin / admin

## 目录结构

```
.
├── frontend // 前端工程文件
│   ├── config // 全局配置文件
│   │   └── index.ts
│   ├── index.html
│   ├── locale // 国际化文本文件
│   │   └── zh_CN
│   ├── package.json
│   ├── public // 静态资源文件
│   ├── src
│   │   ├── client.ts // ApolloClient 
│   │   ├── constants // 常量文件夹
│   │   ├── global.d.ts
│   │   ├── index.tsx // 入口文件
│   │   ├── interface // interface 文件夹
│   │   ├── pages // 页面文件夹
│   │   ├── service // 处理 effects 以及 Query 语句
│   │   ├── store // mobx store 文件
│   │   └── utils // 工具函数
│   ├── tsconfig.json
│   ├── webpack
│   │   ├── webpack.config.js
│   │   └── webpack.dev.config.js
│   └── yarn.lock
└── server // 服务端工程文件
    ├── config // 全局配置文件
    │   └── index.ts
    ├── database.ts // 数据库链接 (Mongoose)
    ├── dbInit.ts // 数据库初始化文件
    ├── index.ts // 入口文件 Express + ApolloServer
    ├── logger // 日志存放文件夹
    ├── nodemon.json
    ├── package.json
    ├── src
    │   ├── constants // 常量文件夹
    │   ├── controller // 数据库 CRUD 操作部分
    │   ├── graphql // GraphQL 的 Schema & resolver，GraphQL 与 Mongoose 的 Schema 可以公用
    │   ├── router // 路由文件，处理 RESTful 的接口
    │   └── utils // 工具函数
    ├── tsconfig.json
    └── yarn.lock
```

## TODO LIST

- [] Server 端日志功能集成
- [] pm2 集成
- [] 目录结构优化