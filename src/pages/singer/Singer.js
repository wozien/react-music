import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { changeEnterLoading, getSingerInfo } from './slice';
import Header from '../../components/album-header';
import Scroll from '../../common/scroll';
import SongList from '../../components/song-list';
import Loading from '../../common/loading';
import MusicNote from '../../common/music-note';
import { Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer } from './style';

function Singer(props) {
  const initHeight = useRef(0);
  const musicNoteRef = useRef();
  const [showStatus, setShowStatus] = useState(true);

  const { artist, hotSongs, enterLoading } = useSelector(state => state.singer);
  const songsCount = useSelector(state => state.player.playList.length);
  const dispatch = useDispatch();
  const getSingerInfoDispatch = (id) => {
    dispatch(changeEnterLoading(true));
    dispatch(getSingerInfo(id));
  }

  const imgWrapper = useRef();
  const collectButton = useRef();
  const songListWrapper = useRef();
  const songScroll = useRef();
  const layer = useRef();
  const header = useRef();
  const OFFSET = 7; // 露出圆角的偏移

  useEffect(() => {
    const id = props.match.params.id;
    getSingerInfoDispatch(id);
    const h = imgWrapper.current.offsetHeight;
    initHeight.current = h;
    songListWrapper.current.style.top = `${h - OFFSET}px`;
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
    // eslint-disable-next-line
  }, []);

  const handleScroll = useCallback(pos => {
    const h = initHeight.current;
    const newY = pos.y;
    const imageDOM = imgWrapper.current;
    const collectDOM = collectButton.current;
    const layerDOM = layer.current;
    const headerDOM = header.current;
    const minScrollY = -(h - OFFSET) + 45;
    const percent = Math.abs(newY / h);

    if (newY > 0) {
      imageDOM.style['transform'] = `scale(${1 + percent})`;
      collectDOM.style['transform'] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${h - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      layerDOM.style.top = `${h - OFFSET + newY}px`;
      layerDOM.style.zIndex = 1;
      // 按钮移动
      collectDOM.style['transform'] = `translate3d(0, ${newY}px, 0)`;
      collectDOM.style['opacity'] = `${1 - percent * 2}`;
      // 设置图片高度
      imageDOM.style.height = 0;
      imageDOM.style.paddingTop = '75%';
      imageDOM.style.zIndex = -1;
    } else {
      layerDOM.style.top = `${45 - OFFSET}px`;
      // 设置图片高度和header一直
      imageDOM.style.height = `45px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
      // 设置header层级
      headerDOM.style.zIndex = 100;
    }
    // eslint-disable-next-line
  }, []);

  const handleBack = useCallback(() => {
    setShowStatus(false);
    // eslint-disable-next-line
  }, []);

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y });
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      unmountOnExit
      appear={true}
      onExited={props.history.goBack}
    >
      <Container play={songsCount}>
        <Header ref={header} title={artist.name} handleClick={handleBack}></Header>
        <ImgWrapper bgUrl={artist.picUrl} ref={imgWrapper}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text">收藏</span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songListWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongList songs={hotSongs} showCollect={false} musicAnimation={musicAnimation}></SongList>
          </Scroll>
        </SongListWrapper>
        {enterLoading ? <Loading></Loading> : null}
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
  );
}

export default React.memo(Singer);
