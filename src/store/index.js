import { configureStore } from '@reduxjs/toolkit'
import recommendReducer from '../pages/recommend/slice'
import albumReducer from '../pages/album/slice'
import playerReducer from '../pages/player/slice'
import singersReducer from '../pages/singers/slice'
import rankReducer from '../pages/rank/slice'
import singerReducer from '../pages/singer/slice'
import searchReducer from '../pages/search/slice'

const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    album: albumReducer,
    player: playerReducer,
    singers: singersReducer,
    rank: rankReducer,
    singer: singerReducer,
    search: searchReducer
  }
})

export default store