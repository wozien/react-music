import React from 'react';
import { getCount } from '../../api/utils';
import { ListWrapper, List, ListItem } from './style';

function RecommendList(props) {
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {props.recommendList.map(item => {
          return (
            <ListItem key={item.id}>
              <div className="img-wrapper">
                <div className="decorate"></div>
                <img src={item.picUrl + '?param=300x300'} alt="" />
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

export default React.memo(RecommendList);
