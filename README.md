:cd: React starting...

## 启动和配置

```bash
create-react-app react-music

cd react-music && yarn && yarn start
```

利用 `customize-cra` 自定义 `webpack` 配置

```bash
yarn add customize-cra react-app-rewired -D
```
修改 `package.json`：

```json
{
  "scripts": {
    "start": "cross-env PORT=8080 react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```
在根目录新建 `config-overrides.js` 配置文件

```js
const path = require('path')
const {
  override,
  addWebpackAlias,
  overrideDevServer
} = require('customize-cra')

// 自定义配置
const devServerConfig = () => config => {
  return {
    ...config
  }
}

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    })
  ),
  devServer: overrideDevServer(
    devServerConfig()
  )
}
```
[关于更多配置](https://github.com/arackaf/customize-cra/blob/master/api.md)

## 样式处理

```bash
yarn add styled-components
```

基本使用
```js
import styled from 'styled-components'

const Container = styled.div`
  width: 400px;
  height: 200px;
  color: ${props => props.color}
`

// jsx
function App(props) {
  return <Container color="red"></Container>
}
```

引入全局样式

```js
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`...`

// App.js 入口处引入
```

`mixin` 和变量处理:

```js

// 文字超出用...显示
const noWrap = () => {
  return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `;
};
const colors = { 'primary-color': '#7a7b7c' }

const text = styled.p`
  ${noWrap()};
  color: ${colors['primary-color']};
`
```


## 路由处理

```bash
yarn add react-router-config react-router-dom 
```

路由配置文件 

```js
import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import Home from '@/pages/home/Home';
const Recommend = lazy(() => import('../pages/recommend/Recommend'));

// 异步组件包装
const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to="/recommend" />
      },
      {
        path: '/recommend',
        component: SuspenseComponent(Recommend),
        routes: [
          {
            path: '/recommend/:id',
            component: SuspenseComponent(Album)
          }
        ]
      },
  }
];

```

在入口 `App.js` 引入并且利用 `renderRoutes` 路由子组件：

```jsx
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '@/routes'  

function App(props) {
  return (
    <HashRouter>
      {renderRoutes(routes)} 
    </HashRouter>
  )
}
```

组件内的渲染子路由:

```jsx
function Child(props) {
  return <div>{renderRoutes(props.route.routes)}</div>
}
```

路由导航:

```js
props.history.push('/')
```
路由参数获取：
```js
const id = props.match.params.id;   // 路由参数
```




## 集成 Redux

安装 redux 相关包
```bash
yarn add redux react-redux redux-thunk 
```

安装不可变对象工具包
```bash
yarn add immutable redux-immutable
```

1. 定义组件的相关状态

```js

// action types
export const CHANGE_BANNER = 'recommend/CHANGE_BANNER';

// action
export const getBannerList = () => {
  return dispatch => {
    getBannerRequest()
      .then(res => {
        dispatch({
          type: CHANGE_BANNER,
          data: res.data
        });
      })
      .catch(() => {
        console.log('获取轮播图数据错误');
      });
  };
};

// reducer
import { fromJS } from 'immutable';

const defaultState = fromJS({
  bannerList: []
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_BANNER:
      return state.set('bannerList', action.data);
    default:
      return state;
  }
};
```

2. 组装各模块store

```js
// store/index.js
import { createStore, compose, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import { reducer as recommendReducer } from '../pages/recommend/store';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({
  recommend: recommendReducer,
}), composeEnhancers(applyMiddleware(thunk)));

export default store;
```

3. 入口处注入

```js
// App.js
import { Provider } from 'react-redux';
import store from '@/store'

function App() {
  return (
    <Provider store={store}>
      <Child></Child>
    </Provider>
  )
}
```

4. 组件连接Store

```js
import { connect } from 'react-redux'

function Child(props) {
   // 这里可以去到store映射的状态和actions
  const { bannerList, getBannerListDispatch } = props
}

const mapStateToProps = state => ({
  bannerList: state.getIn(['recommend', 'bannerList'])
})

const mapDispatchToProps = dispatch => ({
  getBannerListDispatch() {
    dispatch(getBannerList())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Child))
```



## 图片懒加载

```bash
yarn add react-lazyload
```

组件内使用：

```js
// List.js
import LazyLoad from 'react-lazyload'

<LazyLoad  placeholder={ <img src={require('./music.png')} width="100%" height="100%" alt=""/> }>
  <img src={item.picUrl + '?param=300x300'} alt="" />
</LazyLoad>
```

滚动激活

```js
import { forceCheck } from 'react-lazyload';

function App(props) {
  return (
    <Scroll onScroll={forceCheck}>
      <List></List>
    </Scroll>
  )
}
```

## 组件动画

```bash
yarn add react-transition-group
```

利用 `CSSTransition` 包裹元素

```js
<CSSTransition
  in={show}
  timeout={300}
  className="fade"
  unmountOnExit
  appear={true}
  onExited={props.history.goBack}
>
</CSSTransition>
```

## 改进计划

`dva`: 状态管理，减少 redux 繁琐的状态模版
`immer`： 可以替换 `immutable.js`， 更加轻量高效