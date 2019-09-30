import React from 'react';
import { connect } from 'react-redux';
import { ListWrapper, List } from './style';
import { getName } from '../../api/utils';
import {
  changePlayList,
  changeSequecePlayList,
  changeCurrentIndex
} from '../../pages/player/store/actionCreators';

const SongList = React.forwardRef((props, refs) => {
  const { songs, collectCount, showCollect, showBackground } = props;
  const {
    changePlayListDispatch,
    changeSequecePlayListDispatch,
    changeCurrentIndexDispatch
  } = props;
  const totalCount = songs.length;

  const selectItem = (e, index) => {
    changePlayListDispatch(songs);
    changeSequecePlayListDispatch(songs);
    changeCurrentIndexDispatch(index);
  };

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
        <li key={index} onClick={e => selectItem(e, index)}>
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
    <ListWrapper ref={refs} showBackground={showBackground}>
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

const mapDispatch = dispatch => ({
  changePlayListDispatch(data) {
    dispatch(changePlayList(data));
  },
  changeSequecePlayListDispatch(data) {
    dispatch(changeSequecePlayList(data));
  },
  changeCurrentIndexDispatch(data) {
    dispatch(changeCurrentIndex(data));
  }
});

export default connect(
  null,
  mapDispatch
)(React.memo(SongList));
