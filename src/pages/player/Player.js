import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import MiniPlayer from './mini-player';
import NormalPlayer from './normal-player';
import PlayList from './play-list';
import Toast from '../../common/toast';
import { actionCreators } from './store';
import { isEmptyObject, getSongUrl, shuffle } from '@/utils';
import Lyric from '@/utils/lyric-parse';
import { getLyricRequest } from '@/api/request';

function Player(props) {
  const [currentTime, setCurrentTime] = useState(0); // 当前播放时间
  const [duration, setDuration] = useState(0); // 歌曲总时长
  const [preSong, setPreSong] = useState({});  // 上一首歌曲
  const [modeText, setModeText] = useState('');  // 播放模式
  const [songReady, setSongReady] = useState(true);
  const [currentPlayingLyric, setPlayingLyric] = useState("");
  const audioRef = useRef();
  const toastRef = useRef();
  const currentLyric = useRef();
  const currentLineNum = useRef(0);

  const {
    fullScreen,
    playing,
    currentIndex,
    currentSong: immutableCurrentSong,
    playList: immutablePlayList,
    mode,
    sequencePlayList: immutableSequencePlayList
  } = props;

  const {
    toggleFullScreen,
    togglePlayingState,
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changePlayListDispatch,
    changeModeDispatch
  } = props;

  let currentSong = immutableCurrentSong.toJS();
  let playList = immutablePlayList.toJS();
  let sequencePlayList = immutableSequencePlayList.toJS();
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  useEffect(() => {
    if (
      currentIndex === -1 ||
      !playList.length ||
      !playList[currentIndex] ||
      preSong.id === playList[currentIndex].id ||
      !songReady
    )
      return;

    let current = playList[currentIndex];
    changeCurrentDispatch(current);
    setPreSong(current);
    setSongReady(false);
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current.play().then(() => {
        setSongReady(true);
      });
    });
    togglePlayingState(true);
    getLyric(current.id);
    setCurrentTime(0);
    setDuration((current.dt / 1000) | 0);
    // eslint-disable-next-line
  }, [currentIndex, playList]);

  const _findIndex = (song, list) => {
    return list.findIndex(item => song.id === item.id);
  };

  const handleLyric = ({lineNum, txt}) => {
    if (!currentLyric.current) return;
    currentLineNum.current = lineNum;
    setPlayingLyric(txt);
  };  

  const getLyric = id => {
    let lyric = "";
    if (currentLyric.current) {
      currentLyric.current.stop();
    }
    // 避免songReady恒为false的情况
    getLyricRequest(id)
      .then(data => {
        lyric = data.lrc.lyric;
        if(!lyric) {
          currentLyric.current = null;
          return;
        }
        currentLyric.current = new Lyric(lyric, handleLyric);
        currentLyric.current.play();
        currentLineNum.current = 0;
        currentLyric.current.seek(0);
      })
      .catch(() => {
        setSongReady(true)
        audioRef.current.play();
      });
  };

  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingState(state);
    if(currentLyric.current) {
      currentLyric.current.togglePlay(currentTime * 1000);
    }
  };

  const updateTime = e => {
    setCurrentTime(e.target.currentTime);
  };

  const onProgressChange = curPercent => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      togglePlayingState(true);
    }
    if(currentLyric.current) {
      currentLyric.current.seek(newTime * 1000);
    }
  };

  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    if (!playing) togglePlayingState(true);
    audioRef.current.play();
  };

  // 上一首
  const handlePrev = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }

    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) {
      togglePlayingState(true);
    }
    changeCurrentIndexDispatch(index);
  };

  // 下一首
  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }

    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) {
      togglePlayingState(true);
    }
    changeCurrentIndexDispatch(index);
  };

  const handleEnd = () => {
    if (mode === 1) {
      handleLoop();
    } else {
      handleNext();
    }
  };

  const handleError = () => {
    setSongReady(true);
  };

  const changeMode = () => {
    const newMode = (mode + 1) % 3;

    if (newMode === 0) {
      // 顺序播放
      changePlayListDispatch(sequencePlayList);
      const index = _findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText('顺序播放');
    } else if (newMode === 1) {
      // 循环播放
      changePlayListDispatch(sequencePlayList);
      setModeText('循环播放');
    } else {
      // 随机
      const newList = shuffle(sequencePlayList);
      const index = _findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText('随机播放');
    }
    changeModeDispatch(newMode);
    toastRef.current.show();
  };

  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          song={currentSong}
          full={fullScreen}
          toggleFullScreen={toggleFullScreen}
          percent={percent}
          playing={playing}
          clickPlaying={clickPlaying}
          togglePlayList={togglePlayListDispatch}
        ></MiniPlayer>
      )}
      {isEmptyObject(currentSong) ? null : (
        <NormalPlayer
          song={currentSong}
          full={fullScreen}
          toggleFullScreen={toggleFullScreen}
          percent={percent}
          playing={playing}
          currentTime={currentTime}
          duration={duration}
          clickPlaying={clickPlaying}
          onProgressChange={onProgressChange}
          handlePrev={handlePrev}
          handleNext={handleNext}
          mode={mode}
          changeMode={changeMode}
          togglePlayList={togglePlayListDispatch}
          currentLyric={currentLyric.current}
          currentPlayingLyric={currentPlayingLyric}
          currentLineNum={currentLineNum.current}
        ></NormalPlayer>
      )}
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
      <PlayList></PlayList>
      <Toast text={modeText} ref={toastRef}></Toast>
    </div>
  );
}

const mapStateToProps = state => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  currentSong: state.getIn(['player', 'currentSong']),
  playList: state.getIn(['player', 'playList']),
  mode: state.getIn(['player', 'mode']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList'])
});

const mapDispatchToProps = dispatch => ({
  toggleFullScreen(data) {
    dispatch(actionCreators.changeFullScreen(data));
  },
  togglePlayingState(data) {
    dispatch(actionCreators.changePlayingState(data));
  },
  togglePlayListDispatch(data) {
    dispatch(actionCreators.changeShowPlayList(data));
  },
  changeCurrentIndexDispatch(index) {
    dispatch(actionCreators.changeCurrentIndex(index));
  },
  changeCurrentDispatch(song) {
    dispatch(actionCreators.changeCurrentSong(song));
  },
  changePlayListDispatch(list) {
    dispatch(actionCreators.changePlayList(list));
  },
  changeModeDispatch(mode) {
    dispatch(actionCreators.changePlayMode(mode));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Player));
