# Vibe Coding Camp

## 项目简介
这是一个基于 React + Vite + Tailwind CSS 构建的个人主页项目，集成了学习成果展示、课程列表导航以及 AI 智能助手（基于智谱 GLM-4）功能。

## 📦 部署指南

### 前置要求
- Node.js (v18+)
- Python 3.8+ (如果需要运行 AI 后端)

### 1. 安装依赖
```bash
npm install
```

### 2. 启动前端开发服务器
```bash
npm run dev
```
访问 http://localhost:3000

### 3. 构建生产版本
```bash
npm run build
# 构建产物位于 dist/ 目录
```

### 4. 启动 AI 后端服务 (可选)
如果需要启用右下角的 AI 对话功能，需要启动 Python 后端。

**设置 API Key (必做):**
在运行前，请设置环境变量 `ZHIPU_API_KEY`，或者在 `server.py` 中手动填入您的 Key（不推荐上传到 Git）。

```bash
# 安装依赖
pip install flask flask-cors zhipuai requests

# 设置环境变量 (Linux/Mac)
export ZHIPU_API_KEY="您的智谱API_KEY"

# 启动服务
python3 server.py
```
后端服务将运行在 `http://localhost:5000`。

## 🛠️ 技术栈
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Python Flask (AI Chat Proxy)
- **AI Integration**: ZhipuAI (GLM-4 / GLM-4-Flash)

## 📄 目录结构
- `src/`: 前端源码
- `server.py`: AI 后端代理服务
- `dist/`: 构建后的静态文件 (未上传)
