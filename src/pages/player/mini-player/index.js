import React, { useRef } from 'react';
import { Container } from './style';
import { getName } from '@/utils';
import { CSSTransition } from 'react-transition-group';
import ProgressCircle from '../../../common/progress-circle';

function MiniPlayer(props) {
  const minRef = useRef();
  const { song, full, playing, percent } = props;
  const { toggleFullScreen, togglePlayList, clickPlaying } = props;

  const handleTogglePlayList = (e) => {
    e.stopPropagation();
    togglePlayList(true);
  }

  return (
    <CSSTransition
      in={!full}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        minRef.current.style.display = 'flex';
      }}
      onExited={() => {
        minRef.current.style.display = 'none';
      }}
    >
      <Container ref={minRef} onClick={() => toggleFullScreen(true)}>
        <div className="img-wrapper">
          <img className={`play ${playing ? '' : 'pause'}`} src={song.al.picUrl} alt="" />
        </div>
        <div className="text">
          <h1 className="name">{song.name}</h1>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="ctrl-btn">
          <ProgressCircle radius={32} percent={percent}>
            {playing ? (
              <i
                className="iconfont icon-mini icon-pause"
                onClick={e => {
                  clickPlaying(e, false);
                }}
              >
                &#xe650;
              </i>
            ) : (
              <i
                className="iconfont icon-mini icon-play"
                onClick={e => {
                  clickPlaying(e, true);
                }}
              >
                &#xe61e;
              </i>
            )}
          </ProgressCircle>
        </div>
        <div className="ctrl-btn" onClick={handleTogglePlayList}>
          <i className="iconfont">&#xe640;</i>
        </div>
      </Container>
    </CSSTransition>
  );
}

export default React.memo(MiniPlayer);
