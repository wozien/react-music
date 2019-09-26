import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../pages/recommend/store';
import { reducer as singersReducer } from '../pages/singers/store';
import { reducer as rankReducer } from '../pages/rank/store';

const reducer = combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer
});

export default reducer;
