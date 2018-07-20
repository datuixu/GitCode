'use strict';

import { combineReducers } from 'redux';
import trendigDataState from './trendigDataState';
import globalDataState from './globalDataState';

export default combineReducers({
    trendigDataState,
    globalDataState
});