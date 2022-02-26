
npm install moralis# Getting Started with Create React App

This project was bootstrapped with [heroku-app](https://github.com/ibestidea-com/heroku-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

##这是Coding线下试题

### 描述：创建一个简单的react app demo，可以使用相关区块链库（moralis）来链接 区块链钱包（metamask），并调用create API接口实现创建账号的功能。

### 步骤：
### 1、在Github上创建一个repo，并将repo分享给editorai 账号
### 2、使用create react app和typescript创建并初始化项目demo
### 3、安装并了解 chrome浏览上的区块链钱包metamask插件（https://metamask.io）
### 4、初步了解 moralis SDK（https://docs.moralis.io/introduction/readme https://github.com/ethereum-boilerplate/ethereum-boilerplate ）
### 5、开发1：使用moralis SDK来链接metamask插件，并获取当前的钱包地址（address）
### 6、开发2：使用如下API来创建账号：
`curl -X POST https://enigmatic-gorge-44583.herokuapp.com/account/create -d '{"address": "0xxxxxxx"}' -H "Content-Type: application/json"`
### 7、开发3：创建前端页面，可仅创建一个首页菜单（需设置样式、排版等），如：
### 8.开发4：做一个3列布局
`1、ABC跟随外层父级宽度自适应
 2、间距均分
 3、A靠左无间距，C靠右无间距`
### 9.通过CSS实现，鼠标移入到不同的色块，该色块显示在最上层
### 10.将create API 返回的信息显示在前端页面上
### 11.上传代码到github repo
