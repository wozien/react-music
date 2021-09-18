import React from 'react';
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import { Top, Tab, TabItem } from './style';

function Home(props) {
  const { route } = props;

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span>云音悦</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <TabItem>
          <NavLink to="/recommend" activeClassName="selected">
            <span>推荐</span>
          </NavLink>
        </TabItem>
        <TabItem>
          <NavLink to="/singers" activeClassName="selected">
            <span>歌手</span>
          </NavLink>
        </TabItem>
        <TabItem>
          <NavLink to="/rank" activeClassName="selected">
            <span>排行</span>
          </NavLink>
        </TabItem>
      </Tab>
      {renderRoutes(route.routes)}
    </div>
  );
}

export default React.memo(Home);
