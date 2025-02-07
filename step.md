<!--
 * @Date: 2025-01-26 20:07:31
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-08 00:30:47
 * @FilePath: /nestjs-manager-demo/step.md
 * @name: filename
 * @description: description
-->
第二步：配置数据库
2.1 配置 TypeORM
2.1.2 配置 TypeORM 模块
2.1.3 安装 PostgreSQL 数据库
2.2 创建用户实体
2.2.1 创建 user 模块
2.2.2 定义 User 实体
2.2.3 注册实体
2.3 测试数据库连接
2.4 总结
在这一步中，我们完成了以下工作：

配置了 TypeORM 并连接了 PostgreSQL 数据库。

创建了 User 实体，用于表示用户数据。

注册了 User 实体到 user 模块中。

接下来，我们将实现用户注册功能。

PostgreSQL 数据库准备工作步骤
1. 登录到 PostgreSQL
打开终端，使用 psql 工具以默认超级用户 postgres 登录到 PostgreSQL 数据库：
bash
psql -U postgres
解释：
-U 选项用于指定要使用的数据库用户。
postgres 是 PostgreSQL 默认的超级用户，具备最高权限，可以执行创建新用户、数据库等操作。
2. 创建数据库用户
在 psql 命令行中，执行以下 SQL 语句创建一个新的数据库用户，例如 user_manager：
sql
CREATE USER user_manager WITH PASSWORD 'your_password';
解释：
CREATE USER 是用于创建新数据库用户的 SQL 命令。
user_manager 是你创建的用户名称。
WITH PASSWORD 'your_password' 为该用户设置了登录密码，你需要将 your_password 替换为你自己设定的密码。
3. 创建数据库
继续在 psql 中执行以下命令来创建一个新的数据库，比如 user_management：
sql
CREATE DATABASE user_management OWNER user_manager;
解释：
CREATE DATABASE 用于创建新的数据库。
user_management 是数据库名称。
OWNER user_manager 指定了该数据库的所有者为之前创建的 user_manager 用户。
4. 授予用户数据库权限
为了让新创建的用户能够对数据库进行各种操作，需要授予其相应的权限，执行以下命令：
sql
GRANT ALL PRIVILEGES ON DATABASE user_management TO user_manager;
解释：
GRANT ALL PRIVILEGES 表示授予所有权限。
ON DATABASE user_management 指定是针对 user_management 这个数据库。
TO user_manager 表示将这些权限授予 user_manager 用户。
5. 退出 psql
完成上述操作后，输入以下命令退出 psql 命令行界面：
sql
\q
经过这些步骤，就完成了 PostgreSQL 数据库的准备工作，之后可以在 NestJS 项目里配置连接该数据库进行开发。若确认没问题，输入 NEXT 可继续项目后续流程。


一、项目准备
数据库准备
登录到 PostgreSQL
创建数据库用户
创建数据库
授予用户数据库权限
退出 psql
配置 TypeORM
创建 TypeORM 配置文件
在 AppModule 中引入配置
二、创建用户实体和 DTO
创建用户实体
在 src/users 目录下创建 user.entity.ts 文件
定义用户表结构
创建 DTO
在 src/users/dto 目录下创建 create-user.dto.ts 和 login-user.dto.ts 文件
使用 class-validator 进行数据验证
安装依赖
安装 class-validator 和 class-transformer
三、创建用户模块和服务
创建用户模块
在 src/users 目录下创建 users.module.ts 文件
注册 User 实体和 UsersService
创建用户服务
在 src/users 目录下创建 users.service.ts 文件
实现用户创建和查找方法
引入用户模块
在 src/app.module.ts 中引入 UsersModule
四、创建用户控制器
创建用户控制器
在 src/users 目录下创建 users.controller.ts 文件
实现用户注册和登录接口
引入控制器
在 src/users/users.module.ts 中引入 UsersController
五、实现 JWT 认证
安装依赖
安装 @nestjs/passport、@nestjs/jwt、passport、passport-jwt 和 bcrypt
配置 JWT 模块
在 src/auth 目录下创建 auth.module.ts 文件
配置 JWT 密钥和过期时间
创建认证服务
在 src/auth 目录下创建 auth.service.ts 文件
实现用户验证、登录和注册方法
创建 JWT 策略
在 src/auth 目录下创建 jwt.strategy.ts 文件
验证 JWT 的有效性
添加 JWT 密钥到 .env 文件
在 .env 文件中添加 JWT_SECRET
修改用户控制器
在 src/users/users.controller.ts 中添加注册和登录接口
引入认证模块
在 src/app.module.ts 中引入 AuthModule
六、测试接口
启动项目
使用 npm run start:dev 启动 NestJS 项目
模拟请求
使用 Postman、cURL 或 Axios 模拟用户注册和登录请求






接口方法

搜索
http://localhost:3000/user/search?username=aaa&role=user
header加token