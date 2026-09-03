#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

echo "==> 开始构建..."
npm run build

echo "==> 构建完成,启动本地预览..."
npm run serve
