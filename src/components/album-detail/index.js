import React, { useRef } from 'react';
import { TopDesc, Menu } from './style';
import SongList from '../song-list';
import MusciNote from '../../common/music-note';

function AlbumDetail(props) {
  const musicNoteRef = useRef();
  const { currentAlbum } = props;

  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img-wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play-count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">{Math.floor(currentAlbum.subscribedCount / 1000) / 10}万</span>
          </div>
        </div>
        <div className="desc-wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    );
  };

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    );
  };

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y });
  };

  const renderSongList = () => {
    return (
      <SongList
        songs={currentAlbum.tracks}
        collectCount={currentAlbum.subscribedCount}
        showCollect={true}
        showBackground={true}
        musicAnimation={musicAnimation}
      ></SongList>
    );
  };

  return (
    <div>
      {renderTopDesc()}
      {renderMenu()}
      {renderSongList()}
      <MusciNote ref={musicNoteRef}></MusciNote>
    </div>
  );
}

export default React.memo(AlbumDetail);
