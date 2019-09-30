import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../pages/recommend/store';
import { reducer as singersReducer } from '../pages/singers/store';
import { reducer as rankReducer } from '../pages/rank/store';
import { reducer as albumReducer } from '../pages/album/store';
import { reducer as singerReducer } from '../pages/singer/store';
import { reducer as playerReducer } from '../pages/player/store';

const reducer = combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singer: singerReducer,
  player: playerReducer
});

export default reducer;
