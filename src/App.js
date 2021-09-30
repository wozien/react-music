import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
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
      <Router>
        <GlobalStyle />
        <IconStyle />
        {renderRoutes(routes)}
        <Player></Player>
      </Router>
    </Provider>
  );
}

export default App;
