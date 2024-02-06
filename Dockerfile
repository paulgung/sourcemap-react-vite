# 使用官方的 Node.js 16 镜像作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制前端项目文件到容器内的工作目录
COPY . .

# 安装项目依赖
RUN yarn

# 启动前端应用
CMD yarn dev