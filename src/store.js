const { createStore } = require('redux');
import  reducer  from './reducer/moodReducer';


export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
