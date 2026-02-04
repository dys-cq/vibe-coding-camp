#!/bin/bash

# Nice哥个人主页 - 一键部署脚本

echo "🚀 Nice哥个人主页部署脚本"
echo ""

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 请在项目根目录运行此脚本"
    exit 1
fi

echo "📦 安装依赖..."
npm install

echo "🔨 构建项目..."
npm run build

echo ""
echo "✅ 构建完成！"
echo ""
echo "📂 构建文件位于: dist/"
echo ""
echo "🌐 部署选项："
echo ""
echo "1️⃣  Vercel (推荐)"
echo "   npm i -g vercel"
echo "   vercel"
echo ""
echo "2️⃣  Netlify"
echo "   - 访问 https://app.netlify.com/drop"
echo "   - 将 dist 文件夹拖入"
echo ""
echo "3️⃣  GitHub Pages"
echo "   - 将 dist 内容推送到 gh-pages 分支"
echo ""
echo "💡 本地预览: npm run preview"
echo ""
