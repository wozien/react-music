import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../pages/recommend/store';

const reducer = combineReducers({
  recommend: recommendReducer
});

export default reducer;
