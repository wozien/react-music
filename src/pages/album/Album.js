import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAlbumDetail, changeEnterLoading } from './slice';
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';
import Scroll from '../../common/scroll';
import AlbumHeader from '../../components/album-header';
import AlbumDetail from '../../components/album-detail';
import CommonStyle from '../../assets/styles/common';
import Loading from '../../common/loading';
import { isEmptyObject } from '@/utils';

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState('歌单');
  const [isMarquee, setIsMarquee] = useState(false);
  const headerEl = useRef();

  const { currentAlbum, enterLoading } = useSelector(state => state.album);
  const songsCount = useSelector(state => state.player.playList.length);
  const dispatch = useDispatch();

  // const id = props.match.params.id;   // 路由参数
  const { id } = useParams(); // 路由参数

  useEffect(() => {
    dispatch(changeEnterLoading(true));
    dispatch(getAlbumDetail(id));
    // eslint-disable-next-line
  }, [id]);

  // 传给子组件的回调函数最后用useCallback包裹，不然父组件每次执行
  // 都会生成新的函数，造成子组件memo失效从而进行不必要渲染
  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback(
    pos => {
      let minScrollY = -45;
      let percent = Math.abs(pos.y / minScrollY);
      let headerDOM = headerEl.current;

      if (pos.y < minScrollY) {
        headerDOM.style.backgroundColor = CommonStyle['theme-color'];
        headerDOM.style.opacity = Math.min(1, (percent - 1) / 2);
        setTitle(currentAlbum.name);
        setIsMarquee(true);
      } else {
        headerDOM.style.backgroundColor = '';
        headerDOM.style.opacity = 1;
        setTitle('歌单');
        setIsMarquee(false);
      }
      // eslint-disable-next-line
    },
    [currentAlbum]
  );

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
        <AlbumHeader
          ref={headerEl}
          title={title}
          handleClick={handleBack}
          isMarquee={isMarquee}
        ></AlbumHeader>
        {!isEmptyObject(currentAlbum) ? (
          <Scroll onScroll={handleScroll} bounceTop={false}>
            <AlbumDetail currentAlbum={currentAlbum}></AlbumDetail>
          </Scroll>
        ) : null}
        {enterLoading ? <Loading></Loading> : null}
      </Container>
    </CSSTransition>
  );
}

export default React.memo(Album);
