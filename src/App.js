import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont.js';
import Player from './pages/player';
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
