import React from 'react';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont.js';

function App() {
  return (
    <HashRouter>
      <GlobalStyle />
      <IconStyle />
      {renderRoutes(routes)}
    </HashRouter>
  );
}

export default App;
