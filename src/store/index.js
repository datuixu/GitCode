'use strict';

import { createStore, applyMiddleware ,compose} from 'redux';
import rootReducer from '../reducers/index';
import thunkMiddleware from 'redux-thunk';

const applyStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export const store = applyStoreMiddleware(rootReducer);

// 生产模式
// const configureStore = preloadedState => {
//     return createStore (
//         rootReducer,
//         preloadedState,
//         compose (
//             applyMiddleware(createLogger)
//         )
//     );
// }

// const store = configureStore();

// export default store;