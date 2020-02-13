const { createStore } = require('redux');
import { reducer } from './src/reducer/moodReducer';
export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
