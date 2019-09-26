import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../pages/recommend/store';
import { reducer as singersReducer } from '../pages/singers/store';

const reducer = combineReducers({
  recommend: recommendReducer,
  singers: singersReducer
});

export default reducer;
