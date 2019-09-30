import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import MiniPlayer from './mini-player';
import NormalPlayer from './normal-player';
import { actionCreators } from './store';
import { isEmptyObject, getSongUrl } from '../../api/utils';

function Player(props) {
  const [currentTime, setCurrentTime] = useState(0); // 当前播放时间
  const [duration, setDuration] = useState(0); // 播放总时间
  const [preSong, setPreSong] = useState({});

  const audioRef = useRef();

  const {
    fullScreen,
    playing,
    currentIndex,
    currentSong: immutableCurrentSong,
    playList: immutablePlayList
  } = props;

  const {
    toggleFullScreen,
    togglePlayingState,
    changeCurrentIndexDispatch,
    changeCurrentDispatch
  } = props;

  let currentSong = immutableCurrentSong.toJS();
  let playList = immutablePlayList.toJS();
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
    togglePlayingState(true);
    setCurrentTime(0);
    setDuration((current.dt / 1000) | 0);
    audioRef.current.play();
  }, [currentIndex, playList]);

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
          clickPlaying={clickPlaying}
          onProgressChange={onProgressChange}
        ></NormalPlayer>
      )}
      <audio ref={audioRef} onTimeUpdate={updateTime}></audio>
    </div>
  );
}

const mapState = state => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  currentSong: state.getIn(['player', 'currentSong']),
  playList: state.getIn(['player', 'playList'])
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
  }
});

export default connect(
  mapState,
  mapDispatch
)(React.memo(Player));
