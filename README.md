# Tools Collection 工具集合项目

## 项目简介

这是一个基于 Vue 3 + Vite + Element Plus 开发的工具集合应用，集成了多个实用的计算工具。

## 技术栈

- Vue 3
- Vite
- Vue Router
- Element Plus
- Element Plus Icons

## 项目结构

```
tools-collection/
├── public/                # 静态资源目录
│   └── vite.svg          # 网站图标
├── src/                   # 源代码目录
│   ├── assets/           # 资源文件目录
│   │   └── vue.svg       # Vue logo
│   ├── components/       # 组件目录
│   │   ├── Calculator.vue    # 计算器组件
│   │   ├── TaxCalculator.vue # 税收计算器组件
│   │   ├── ToolCard.vue      # 工具卡片组件
│   │   └── HelloWorld.vue    # 示例组件
│   ├── router/           # 路由配置
│   │   └── index.js      # 路由主配置文件
│   ├── App.vue           # 根组件
│   ├── main.js           # 应用入口文件
│   └── style.css         # 全局样式文件
├── index.html            # HTML 模板
├── package.json          # 项目配置文件
└── vite.config.js        # Vite 配置文件
```

## 主要功能模块

### 1. 计算器

基础计算器功能，支持常用的数学运算。

### 2. 税收计算器

帮助用户计算税收相关的数值。

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```
