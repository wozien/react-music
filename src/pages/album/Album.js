import React, { useState, useRef, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import Scroll from '../../common/scroll';
import AlbumHeader from '../../components/album-header';
import AlbumDetail from '../../components/album-detail';
import CommonStyle from '../../assets/styles/common';
import Loading from '../../common/loading';
import { isEmptyObject } from '../../api/utils';

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState('歌单');
  const [isMarquee, setIsMarquee] = useState(false);
  const headerEl = useRef();

  const { currentAlbum, enterLoading, songsCount } = props;
  const { getAlbumDetailDispatch } = props;

  const id = props.match.params.id;   // 路由参数
  const currentAlbumJS = currentAlbum ? currentAlbum.toJS() : {};

  useEffect(() => {
    getAlbumDetailDispatch(id);
    // eslint-disable-next-line
  }, [id]);

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
        setTitle(currentAlbumJS.name);
        setIsMarquee(true);
      } else {
        headerDOM.style.backgroundColor = '';
        headerDOM.style.opacity = 1;
        setTitle('歌单');
        setIsMarquee(false);
      }
      // eslint-disable-next-line
    },
    [currentAlbumJS]
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
        {!isEmptyObject(currentAlbumJS) ? (
          <Scroll onScroll={handleScroll} bounceTop={false}>
            <AlbumDetail currentAlbum={currentAlbumJS}></AlbumDetail>
          </Scroll>
        ) : null}
        {enterLoading ? <Loading></Loading> : null}
      </Container>
    </CSSTransition>
  );
}

const mapState = state => ({
  enterLoading: state.getIn(['album', 'enterLoading']),
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  songsCount: state.getIn(['player', 'playList']).size
});

const mapDispatch = dispatch => ({
  getAlbumDetailDispatch(id) {
    dispatch(actionCreators.changeEnterLoading(true));
    dispatch(actionCreators.getAlbumDetail(id));
  }
});

export default connect(
  mapState,
  mapDispatch
)(React.memo(Album));
