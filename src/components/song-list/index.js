import React from 'react';
import { ListWrapper, List } from './style';
import { getName } from '../../api/utils';

const SongList = React.forwardRef((props, ref) => {
  const { songs, collectCount, showCollect } = props;
  const totalCount = songs.length;

  const renderColleact = count => {
    return (
      <div className="add-list">
        <i className="iconfont">&#xe62d;</i>
        <span>收藏({Math.floor(count / 1000) / 10}万)</span>
      </div>
    );
  };

  const renderListContent = list => {
    return list.map((item, index) => {
      return (
        <li key={index}>
          <span className="index">{index + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} -{' '}
              {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      );
    });
  };

  return (
    <ListWrapper>
      <div className="first-line">
        <div className="play-all">
          <i className="iconfont">&#xe6e3;</i>
          <span>
            播放全部 <span className="sum"> (共{totalCount}首)</span>
          </span>
        </div>
        {showCollect ? renderColleact(collectCount) : null}
      </div>
      <List>{renderListContent(songs)}</List>
    </ListWrapper>
  );
});

export default React.memo(SongList);
