const { createStore } = require('redux');
import { moodReducer } from './src/reducer/moodReducer';
export default createStore(
  moodReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
