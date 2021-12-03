FROM alpine:3.13

# 安装 nodejs npm
RUN apk add --update --no-cache nodejs npm

# # 指定工作目录
WORKDIR /app

# 拷贝包管理文件
COPY package*.json /app

# npm 安装依赖
RUN npm install

# 将当前目录（dockerfile所在目录）下所有文件都拷贝到工作目录下
COPY . /app

# 执行启动命令
CMD ["npm", "start"]