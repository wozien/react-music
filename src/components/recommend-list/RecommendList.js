import React from 'react';
import { useHistory } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { getCount } from '@/utils';
import { ListWrapper, List, ListItem } from './style';

function RecommendList(props) {
  const history = useHistory()
  const enterDetail = id => {
    history.push(`/recommend/${id}`);
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

// 因为组件时Recommend组件的子组件，无法直接
// 从props中获取history对象， 需要withRouter包一下
export default React.memo(RecommendList);
