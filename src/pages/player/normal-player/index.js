import React, { useRef } from 'react';
import { getName } from '../../../api/utils';
import { CSSTransition } from 'react-transition-group';
import animations from 'create-keyframe-animation';
import { prefixStyle } from '../../../api/utils';
import ProgressBar from '../../../common/progress-bar';
import { Container, Top, Middle, CDWrapper, ProgressWrapper, Bottom, Operators } from './style';

const transform = prefixStyle('transform');

function NormalPlayer(props) {
  const normalRef = useRef();
  const cdRef = useRef();

  const { song, full, playing, percent } = props;
  const { toggleFullScreen, clickPlaying, onProgressChange } = props;

  // 获取小唱片到大唱片中心的偏移
  const _getPosAndScale = () => {
    const tragetWidth = 40;
    const paddingLeft = 40;
    const paddingTop = 80;
    const paddingBottom = 30;
    const width = window.innerWidth * 0.8;
    const scale = tragetWidth / width;
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - paddingBottom - width / 2;
    return { x, y, scale };
  };

  //  进场函数
  const enter = () => {
    normalRef.current.style.display = 'block';
    const { x, y, scale } = _getPosAndScale();
    let animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`
      }
    };
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear'
      }
    });
    animations.runAnimation(cdRef.current, 'move');
  };

  const afterEnter = () => {
    animations.unregisterAnimation('move');
    cdRef.current.style.animation = '';
  };

  const leave = () => {
    if (!cdRef.current) return;
    const cdDOM = cdRef.current;
    const { x, y, scale } = _getPosAndScale();
    cdDOM.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    cdDOM.style.transition = 'all .4s';
  };

  const afterLeave = () => {
    if (!cdRef.current) return;
    const cdDOM = cdRef.current;
    cdDOM.style[transform] = '';
    cdDOM.style.transition = '';
    normalRef.current.style.display = 'none';
  };

  return (
    <CSSTransition
      in={full}
      timeout={400}
      classNames="normal"
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <Container ref={normalRef}>
        <div className="background">
          <img src={song.al.picUrl + '?param=300x300'} alt="" />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <i className="iconfont">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>
        <Middle ref={cdRef}>
          <CDWrapper>
            <div className="cd">
              <img
                className={`image play ${playing ? '' : 'pause'}`}
                src={song.al.picUrl + '?param=400x400'}
                alt=""
              />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
          <ProgressWrapper>
            <div className="time time-l">0:00</div>
            <div className="progress-bar-wrapper">
              <ProgressBar percent={percent} percentChange={onProgressChange}></ProgressBar>
            </div>
            <div className="time time-r">4:23</div>
          </ProgressWrapper>
          <Operators>
            <div className="icon i-left">
              <i className="iconfont">&#xe625;</i>
            </div>
            <div className="icon i-left">
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i
                className="iconfont"
                onClick={e => clickPlaying(e, !playing)}
                dangerouslySetInnerHTML={{ __html: playing ? '&#xe723;' : '&#xe731;' }}
              ></i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </Container>
    </CSSTransition>
  );
}

export default React.memo(NormalPlayer);
