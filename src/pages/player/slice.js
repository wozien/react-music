import { createSlice } from '@reduxjs/toolkit'
import { getSongDetailRequest } from '@/api/request'
import { playMode } from '../../api/config';
import { findIndex } from '@/utils'; 

const slice = createSlice({
  name: 'player',
  initialState: {
    fullScreen: false,
    playing: false,
    sequencePlayList: [],
    playList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    currentSong: {},
    showPlayList: false
  },
  reducers: {
    changeCurrentSong(state, { payload: song }) {
      state.currentSong = song
    },
    changeFullScreen(state, { payload }) {
      state.fullScreen = payload
    },
    changePlayingState(state, { payload }) {
      state.playing = payload
    },
    changeSequecePlayList(state, { payload: list }) {
      state.sequencePlayList = list
    },
    changePlayList(state, { payload: list }) {
      state.playList = list
    },
    changePlayMode(state, { payload }) {
      state.mode = payload
    },
    changeCurrentIndex(state, { payload: index }) {
      state.currentIndex = index
    },
    changeShowPlayList(state, { payload }) {
      state.showPlayList = payload
    },
    deleteSong(state, { payload: song }) {
      handleDeleteSong(state, song)
    },
    insertSong(state, { payload: song }) {
      handleInsertSong(state, song)
    }
  }
})

const handleDeleteSong = (state, song) => {
  //也可用loadsh库的deepClone方法。这里深拷贝是基于纯函数的考虑，不对参数state做修改
  const playList = state.playList;
  const sequenceList = state.sequencePlayList;
  let currentIndex = state.currentIndex;
  // 找对应歌曲在播放列表中的索引
  const fpIndex = findIndex(song, playList);
  // 在播放列表中将其删除
  playList.splice(fpIndex, 1);
  // 如果删除的歌曲排在当前播放歌曲前面，那么currentIndex--，让当前的歌正常播放
  if(fpIndex < currentIndex) currentIndex--;
  
  //在sequenceList中直接删除歌曲即可
  const fsIndex = findIndex(song, sequenceList);
  sequenceList.splice(fsIndex, 1);

  state.playList = playList
  state.sequencePlayList = sequenceList
  state.currentIndex = currentIndex
}

const handleInsertSong = (state, song) => {
  const playList = state.playList;
  const sequenceList = state.sequencePlayList;
  let currentIndex = state.currentIndex;
  //看看有没有同款
  let fpIndex = findIndex(song, playList);
  // 如果是当前歌曲直接不处理
  if(fpIndex === currentIndex && currentIndex !== -1) return;
  currentIndex++;
  // 把歌放进去,放到当前播放曲目的下一个位置
  playList.splice(currentIndex, 0, song);
  // 如果列表中已经存在要添加的歌，暂且称它oldSong
  if(fpIndex > -1) {
    // 如果oldSong的索引在目前播放歌曲的索引小，那么删除它，同时当前index要减一
    if(currentIndex > fpIndex) {
      playList.splice(fpIndex, 1);
      currentIndex--;
    } else {
      // 否则直接删掉oldSong
      playList.splice(fpIndex+1, 1);
    }
  }
  // 同理，处理sequenceList
  let sequenceIndex = findIndex(playList[currentIndex], sequenceList) + 1;
  let fsIndex = findIndex(song, sequenceList);
  // 插入歌曲
  sequenceList.splice(sequenceIndex, 0, song);
  if(fsIndex > -1) {
    //跟上面类似的逻辑。如果在前面就删掉，index--;如果在后面就直接删除
    if(sequenceIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1);
      sequenceIndex--;
    } else {
      sequenceList.splice(fsIndex + 1, 1);
    }
  }
  state.playList = playList
  state.sequencePlayList = sequenceList
  state.currentIndex = currentIndex
}

export const { changeCurrentSong, changeFullScreen, changePlayingState, changeSequecePlayList, 
  changePlayList, changePlayMode, changeCurrentIndex, changeShowPlayList, deleteSong, insertSong } = slice.actions

export const getSongDetail = (id) => {
  return (dispatch) => {
    getSongDetailRequest(id).then(data => {
      let song = data.songs[0];
      // console.log(song);
      dispatch(insertSong(song));
    })
  }
}

export default slice.reducer