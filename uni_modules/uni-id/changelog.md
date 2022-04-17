## 3.3.13（2022-03-04）

- createInstance 方法支持传递 clientInfo [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id.html#create-instance)
- 修复`this.t is not a function`报错

## 3.3.12（2022-01-15）

- 新增 preferedAppPlatform 配置用于解决 uni-app vue2 版本 vue3 版本获取 platform 不一致的问题 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=prefered-app-platform)
- 修复 checkToken 未返回自定义 token 内容的 Bug

## 3.3.11（2022-01-11）

- 修复用户名密码登录时多个应用出现重复用户名登录报错的 Bug

## 3.3.10（2022-01-07）

- 新增 自定义国际化语言支持 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=custom-i8n)
- 修复 一键登录时未校验重复手机号是否已验证的 Bug
- 修复 Apple 登录时用户邮箱为空时报错的 Bug
- 修复 登录接口未传 username 时错误提示不正确的 Bug

## 3.3.9（2021-11-09）

- 去除重复的 context.xxx 未找到的提示语

## 3.3.8（2021-10-28）

- 新增 用户账户封禁接口 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=ban-account)
- 新增 用户账户注销接口 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=close-account)
- 修复 未传 appid 时用户重复注册的 Bug

## 3.3.7（2021-10-08）

- 移除部分接口的废弃提示

## 3.3.6（2021-09-08）

- 修复 邀请码可能重复的 Bug

## 3.3.5（2021-08-10）

- 修复版本号错误

## 3.3.4（2021-08-10）

- 微信、QQ、支付宝登录新增 type 参数用于指定当前是登录还是注册

## 3.3.3（2021-08-04）

- 修复使用数组形式的配置文件报错的 Bug

## 3.3.2（2021-08-03）

- 修复上 3.3.0 版本引出的 createInstance 接口传入配置不生效的 Bug 感谢[hmh](https://gitee.com/hmh)

## 3.3.1（2021-07-30）

- 修复 将设置用户允许登录的应用列表时传入空数组报错的 Bug

## 3.3.0（2021-07-30）

- 新增 不同端应用配置隔离 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=isolate-config)
- 新增 不同端用户隔离 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=isolate-user)
  - 此版本升级需要开发者处理一下用户数据，请参考 [补齐用户 dcloud_appid 字段](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=makeup-dcloud-appid)
- 新增 QQ 登录、注册相关功能 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=qq)
- 调整 不再支持绑定手机、邮箱时不填验证码直接绑定

## 3.2.1（2021-07-09）

- 撤销 3.2.0 版本所做的调整

## 3.2.0（2021-07-09）

- 【重要】支持不同端（管理端、用户端等）用户隔离 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=isolate-user)
- 支持不同端（管理端、用户端等）配置文件隔离 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=isolate-config)

## 3.1.3（2021-07-08）

- 移除插件内误传的 node_modules

## 3.1.2（2021-07-08）

- 修复 微信小程序绑定微信账号时报错的 Bug

## 3.1.1（2021-07-01）

- 使用新的错误码规范，兼容旧版 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=errcode)
- 修复微信登录、绑定时未返回用户 accessToken 的 Bug

## 3.1.0（2021-04-19）

- 增加对用户名、邮箱、密码字段的两端去空格
- 默认忽略用户名、邮箱的大小写 [详情](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=case-sensitive)
- 修复 customToken 导出 async 方法报错的 Bug

## 3.0.12（2021-04-13）

- 调整 bindTokenToDevice 默认值为 false

## 3.0.11（2021-04-12）

- 修复 3.0.7 版本引出的多个用户访问时可能出现 30201 报错的 Bug

## 3.0.10（2021-04-08）

- 优化错误提示

## 3.0.9（2021-04-08）

- bindMobile 接口支持通过一键登录的方式绑定
- 优化错误提示

## 3.0.8（2021-03-19）

- 修复 3.0.7 版本某些情况下生成 token 报错的 Bug

## 3.0.7（2021-03-19）

- 新增 支持 uni-config-center，更新 uni-id 无须再担心配置被覆盖 [详情](https://uniapp.dcloud.io/uniCloud/uni-id?id=uni-config-center)
- 新增 自定义 token 内容，可以缓存角色权限之外的更多信息到客户端 [详情](https://uniapp.dcloud.io/uniCloud/uni-id?id=custom-token)
- 新增 支持传入 context 获取 uni-id 实例，防止单实例多并发时全局 context 混乱 [详情](https://uniapp.dcloud.io/uniCloud/uni-id?id=create-instance)

## 3.0.6（2021-03-05）

- 新增[uniID.wxBizDataCrypt](https://uniapp.dcloud.io/uniCloud/uni-id?id=%e5%be%ae%e4%bf%a1%e6%95%b0%e6%8d%ae%e8%a7%a3%e5%af%86)方法
- 优化 loginByApple 方法，提高接口响应速度

## 3.0.5（2021-02-03）

- 调整为 uni_modules 目录规范
