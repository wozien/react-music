import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import MiniPlayer from './mini-player';
import NormalPlayer from './normal-player';
import Toast from '../../common/toast';
import { actionCreators } from './store';
import { isEmptyObject, getSongUrl, shuffle } from '../../api/utils';

function Player(props) {
  const [currentTime, setCurrentTime] = useState(0); // 当前播放时间
  const [duration, setDuration] = useState(0); // 播放总时间
  const [preSong, setPreSong] = useState({});
  const [modeText, setModeText] = useState('');
  const audioRef = useRef();
  const toastRef = useRef();

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
      preSong.id === playList[currentIndex].id
    )
      return;
    let current = playList[currentIndex];
    changeCurrentDispatch(current);
    setPreSong(current);
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current.play();
    });
    togglePlayingState(true);
    setCurrentTime(0);
    setDuration((current.dt / 1000) | 0);
  }, [currentIndex, playList]);

  const _findIndex = (song, list) => {
    return list.findIndex(item => song.id === item.id);
  };

  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingState(state);
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
    console.log('播放错误');
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
        ></NormalPlayer>
      )}
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
      <Toast text={modeText} ref={toastRef}></Toast>
    </div>
  );
}

const mapState = state => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  currentSong: state.getIn(['player', 'currentSong']),
  playList: state.getIn(['player', 'playList']),
  mode: state.getIn(['player', 'mode']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList'])
});

const mapDispatch = dispatch => ({
  toggleFullScreen(data) {
    dispatch(actionCreators.changeFullScreen(data));
  },
  togglePlayingState(data) {
    dispatch(actionCreators.changePlayingState(data));
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
  mapState,
  mapDispatch
)(React.memo(Player));
