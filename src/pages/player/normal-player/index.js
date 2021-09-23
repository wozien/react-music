import React, { useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import animations from 'create-keyframe-animation';
import { prefixStyle, formatPlayTime, getName } from '@/utils';
import ProgressBar from '../../../common/progress-bar';
import { playMode } from '../../../api/config';
import { Container, Top, Middle, CDWrapper, ProgressWrapper, Bottom, Operators, LyricContainer, LyricWrapper } from './style';
import Scroll from '../../../common/scroll';

const transform = prefixStyle('transform');

function NormalPlayer(props) {
  const normalRef = useRef();
  const cdRef = useRef();
  const currentState = useRef ("");
  const lyricScrollRef = useRef ();
  const lyricLineRefs = useRef ([]);

  const { song, full, playing, percent, currentTime, duration, mode, 
    currentLineNum, currentPlayingLyric,  currentLyric } = props;
  const {
    toggleFullScreen,
    togglePlayList,
    clickPlaying,
    onProgressChange,
    handlePrev,
    handleNext,
    changeMode
  } = props;

  useEffect(() => {
    if (!lyricScrollRef.current) return;
    let bScroll = lyricScrollRef.current.getBScroll();
    if(!bScroll) return;
    if (currentLineNum > 5) {
      // 保持当前歌词在第5条的位置
      let lineEl = lyricLineRefs.current[currentLineNum - 5].current;
      bScroll.scrollToElement(lineEl, 1000);
    } else {
      // 当前歌词行数<=5, 直接滚动到最顶端
      bScroll.scrollTo(0, 0, 1000);
    }
  }, [currentLineNum]);

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
    currentState.current = '';
  };

  const getMode = () => {
    let content;
    if (mode === playMode.sequence) {
      content = '&#xe625;';
    } else if (mode === playMode.loop) {
      content = '&#xe653;';
    } else {
      content = '&#xe61b;';
    }
    return content;
  };

  const toggleCurrentState = () => {
    if (currentState.current !== "lyric") {
      currentState.current = "lyric";
    } else {
      currentState.current = "";
    }
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
        <Middle ref={cdRef} onClick={toggleCurrentState}>
          <CSSTransition
            timeout={400}
            classNames="fade"
            in={currentState.current !== "lyric"}
          >
            <CDWrapper style={{visibility: currentState.current !== "lyric" ? "visible" : "hidden"}}>
              <div className="cd">
                <img
                  className={`image play ${playing ? '' : 'pause'}`}
                  src={song.al.picUrl + '?param=400x400'}
                  alt=""
                />
              </div>
              <p className="playing_lyric">{currentPlayingLyric}</p>
            </CDWrapper>
          </CSSTransition>
          <CSSTransition
            in={currentState.current === "lyric"}
            timeout={400}
            classNames="fade"
          >
            <LyricContainer>
              <Scroll ref={lyricScrollRef}>
                <LyricWrapper
                  style={{visibility: currentState.current === "lyric" ? "visible" : "hidden"}}
                  className="lyric_wrapper"
                >
                  {
                    currentLyric 
                      ? currentLyric.lines.map((item, index) => {
                        lyricLineRefs.current[index] = React.createRef();
                        return (
                          <p 
                            className={`text ${currentLineNum === index ? "current" : ""}`}
                            key={item+index}
                            ref={lyricLineRefs.current[index]}
                          >
                            {item.txt}
                          </p>
                        )
                      })
                      : <p className="text pure"> 纯音乐，请欣赏。 </p>
                  }
                </LyricWrapper>
              </Scroll>
            </LyricContainer>
          </CSSTransition> 
        </Middle>
        <Bottom className="bottom">
          <ProgressWrapper>
            <div className="time time-l">{formatPlayTime(currentTime)}</div>
            <div className="progress-bar-wrapper">
              <ProgressBar percent={percent} percentChange={onProgressChange}></ProgressBar>
            </div>
            <div className="time time-r">{formatPlayTime(duration)}</div>
          </ProgressWrapper>
          <Operators>
            <div className="icon i-left" onClick={changeMode}>
              <i className="iconfont" dangerouslySetInnerHTML={{ __html: getMode() }}></i>
            </div>
            <div className="icon i-left" onClick={handlePrev}>
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i
                className="iconfont"
                onClick={e => clickPlaying(e, !playing)}
                dangerouslySetInnerHTML={{ __html: playing ? '&#xe723;' : '&#xe731;' }}
              ></i>
            </div>
            <div className="icon i-right" onClick={handleNext}>
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right" onClick={() => togglePlayList(true)}>
              <i className="iconfont">&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </Container>
    </CSSTransition>
  );
}

export default React.memo(NormalPlayer);
