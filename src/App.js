import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
// 把路由配置转为Route组件
import { renderRoutes } from 'react-router-config';  
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont.js';
import Player from './pages/player/Player';
import routes from './routes';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        <IconStyle />
        {renderRoutes(routes)}
        <Player></Player>
      </HashRouter>
    </Provider>
  );
}

export default App;
