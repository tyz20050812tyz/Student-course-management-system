# 学生课程管理系统

这是一个大二学生自主开发的简易课程管理系统项目，采用前后端分离架构实现。

## 项目概述
学生课程管理系统允许学生查看课程、注册课程、查看成绩和管理个人信息。教师可以创建课程、录入成绩和管理课程内容。

## 技术栈
- **前端**：HTML, CSS, JavaScript
- **后端**：Java (Spring Boot)
- **数据库**：PostgreSQL

## 功能模块
1. 用户认证（登录/注册）
2. 课程浏览和注册
3. 成绩查询
4. 个人信息管理
5. 课程内容管理（教师端）

## 项目结构
- `/frontend`：前端静态文件
- `/backend`：Java后端代码
- `/database`：数据库脚本和配置

## 如何运行
1. 安装PostgreSQL数据库并执行schema.sql创建表结构
2. 配置application.properties中的数据库连接信息
3. 使用Maven构建并运行后端项目
4. 在浏览器中打开frontend/index.html访问前端界面

## 上传到GitHub
1. 在GitHub上创建一个新的仓库
2. 在项目根目录执行以下命令：
   ```bash
   # 初始化Git仓库
   git init
   
   # 添加所有文件
   git add .
   
   # 提交更改
   git commit -m "Initial commit - 学生课程管理系统"
   
   # 关联远程仓库（替换为你的GitHub仓库URL）
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   
   # 推送到远程仓库
   git push -u origin main
   ```
3. 如果是第一次使用Git，需要先配置用户名和邮箱：
   ```bash
   git config --global user.name "你的用户名"
   git config --global user.email "你的邮箱"
   ```
