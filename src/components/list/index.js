import React from 'react';
import { withRouter } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { getCount } from '../../api/utils';
import { ListWrapper, List, ListItem } from './style';

function RecommendList(props) {
  const enterDetail = id => {
    props.history.push(`/recommend/${id}`);
  };

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {props.recommendList.map(item => {
          return (
            <ListItem key={item.id} onClick={() => enterDetail(item.id)}>
              <div className="img-wrapper">
                <div className="decorate"></div>
                <LazyLoad
                  placeholder={
                    <img src={require('./music.png')} width="100%" height="100%" alt="" />
                  }
                >
                  <img src={item.picUrl + '?param=300x300'} alt="" />
                </LazyLoad>
                <div className="play-count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          );
        })}
      </List>
    </ListWrapper>
  );
}

export default React.memo(withRouter(RecommendList));
