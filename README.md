# Redux

## Agenda

* store
* actions
* reducers
* using redux
  * `getState`
  * `dispatch`
  * `subscribe`
* react and redux

## Dependencies

* `npm i redux react-redux`

## Resources

* [Three Principles](https://redux.js.org/introduction/three-principles)
* [Actions](https://redux.js.org/basics/actions)
* [Reducers](https://redux.js.org/basics/reducers)

## Store

The store is responsible for holding our applications state. You can
think of it as a global object accessible from anywhere in your application,
like `window.location`.

## Actions

Actions are plain JavaScript objects that send data/events to your store.
Actions always have a `type` key which is the name of the event.
Additionally, an action can also have a `payload`.

```js
const myAction = {
  type: 'DO_STUFF'
}
```

## Reducers

Reducers are pure functions responsible for updating our state in response
to actions. Every action we dispatch will be sent to the reducer along with
the current state. The reducer is then responsible for handling the action
and returning a new state object based on the action.

```js
function reducer(state, action) {
  switch(action.type) {
    case 'DO_STUFF':
      return { stuff: 'done' };
    default:
      return state;
  }
}
```

**NOTE** don't forget to provide a default case in case your reducer
cannot handle a particular action.

We can also setup initial state with our reducer.

```js
const initialState = {
  stuff: 'unfinished'
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'DO_STUFF':
      return { stuff: 'done' };
    default:
      return state;
  }
}
```

## Using Redux

We can create a new store object by using the `createStore` function
and passing it a reducer.

```js
import { createStore } from 'redux';

const initialState = {
  stuff: 'unfinished'
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'DO_STUFF':
      return { stuff: 'done' };
    default:
      return state;
  }
}

const store = createStore(reducer);
```

### `getState`

We can get our current state with `getState`.

```js
import { createStore } from 'redux';

const initialState = {
  stuff: 'unfinished'
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'DO_STUFF':
      return { stuff: 'done' };
    default:
      return state;
  }
}

const store = createStore(reducer);
console.log(store.getState()); // { stuff: 'unfinished' }
```

### `dispatch`

We can send actions to our store with `dispatch`.

```js
import { createStore } from 'redux';

const initialState = {
  stuff: 'unfinished'
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'DO_STUFF':
      return { stuff: 'done' };
    default:
      return state;
  }
}

const store = createStore(reducer);
store.dispatch({
  type: 'DO_STUFF'
})
console.log(store.getState()); // { stuff: 'done' }
```

### `subscribe`

We can subscribe to state changes with subscribe

```js
import { createStore } from 'redux';

const initialState = {
  stuff: 'unfinished'
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'DO_STUFF':
      return { stuff: 'done' };
    default:
      return state;
  }
}

const store = createStore(reducer);
store.subscribe(() => {
  // will print every time state changes
  console.log(store.getState());
});

store.dispatch({
  type: 'DO_STUFF'
})
```

`subscribe` returns an unsubscribe function we can use to
stop listening to state changes

```js
import { createStore } from 'redux';

const initialState = {
  stuff: 'unfinished'
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'DO_STUFF':
      return { stuff: 'done' };
    default:
      return state;
  }
}

const store = createStore(reducer);
const unsubscribe = store.subscribe(() => {
  // will print every time state changes
  console.log(store.getState());
});

store.dispatch({
  type: 'DO_STUFF'
})

unsubscribe();
```

## React and Redux

### Setting up the store

In order to start using redux with react we need to setup a store.

```js
import { createStore } from 'redux';
import reducer from './reducers';

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

### Using Provider

In order for our store to get passed to all components, without explicitly
passing it as a property we can setup a provider.

```js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

### connect

`react-redux` provides a `connect` higher-order component that allows
us to connect a component to the redux store. All connected components
are containers.

The `connect` function takes two arguments `mapStateToProps` and
`mapDispatchToProps` and returns a function that takes a component
that you want to connect to the store.

```js
import { connect } from 'react-redux';
import MyComponent from '../../components/MyComponent';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);

```

Both `mapStateToProps` and `mapDispatchToProps` are functions that return
objects. Each key of the returned object will be passed to the connected
component as a property.

#### mapStateToProps

`mapStateToProps` is a function that takes state. State comes from the store
via `store.getState()`. By using selectors you can get or derive information
from state and map that information onto properties that your component expects.

```js
import { connect } from 'react-redux';
import { getPosts } from '../../selectors/postSelectors';
import Posts from '../../components/posts/Posts';

const mapStateToProps = state => ({
  posts: getPosts(state)
});

export default connect(
  mapStateToProps
)(Posts);
```

#### mapDispatchToProps

`mapDispatchToProps` is a function that takes dispatch. Dispatch is the
`store.dispatch` function. `mapDispatchToProps` is used to pass functions,
as properties, to your component. These functions can dispatch actions to
update your state.

```js
import { connect } from 'react-redux';
import { createPost } from '../../actions/postActions';
import PostForm from '../../components/posts/PostForm';

const mapDispatchToProps = dispatch => ({
  onSubmit(title, body) {
    dispatch(createPost(title, body));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(PostForm);
```

## Actions in depth

### Actions Creators

While passing objects to `store.dispatch` is fine, its often better
to use an action creator. An action creator is a function that creates
an action object.

```js
const addDrink = drink => ({
  type: 'ADD_DRINK',
  payload: drink
});
```

Now, anytime we want to add a drink we can dispatch the result of our
action creator.

```js
store.dispatch(addDrink('water'));
```

### Type Constants

To prevent typos and improve consistency we often create a `const` for
each action type.

```js
const ADD_DRINK = 'ADD_DRINK';
const addDrink = drink => ({
  type: ADD_DRINK,
  payload: drink
});
```

We can then reuse this type in our reducer.

```js
function reducer(state, action) {
  switch(action.type) {
    case ADD_DRINK:
      // do stuff
    default:
      return state
  }
}
```

### Action directory

To improve usability and readability we often create a directory
for our action creators `src/actions`. Inside of that directory
we create a new file for similar actions `src/actions/lunchActions.js`

```js
export const ADD_DRINK = 'ADD_DRINK';
export const addDrink = drink => ({
  type: ADD_DRINK,
  payload: drink
});
```

## Reducers in depth

### Reducers directory

To improve usability and readability we often create a directory
for our reducers `src/reducers`. Inside of that directory
we create a new file for each reducer `src/reducer/lunchReducer.js`

```js
const initialState = {
  stuff: 'unfinished'
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case: 'DO_STUFF':
      return { stuff: 'done' };
    default:
      return state;
  }
}
```

### Type Constants

To prevent typos and improve consistency we often create a `const` for
each action type and import them into our reducer file.

```js
import { DO_STUFF } from '../action/doActions.js';

const initialState = {
  stuff: 'unfinished'
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case DO_STUFF:
      return { stuff: 'done' };
    default:
      return state;
  }
}
```

### Combine Reducers

As our store gets larger and our reducer begins to handle more
state, its often best to start splitting our reducer into multiple
reducers.

```js
// src/reducers/lunchReducer.js
import {
  ADD_DRINK,
  ADD_SANDWICH,
  ADD_CHIPS,
  REMOVE_DRINK,
  REMOVE_SANDWICH,
  REMOVE_CHIPS
} from '../actions/lunchActions';

const initialState = {
  drink: null,
  sandwich: null,
  chips: null
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case ADD_DRINK:
      return { ...state, drink: action.payload };
    case ADD_SANDWICH:
      return { ...state, sandwich: action.payload };
    case ADD_CHIPS:
      return { ...state, chips: action.payload };
    case REMOVE_DRINK:
      return { ...state, drink: null };
    case REMOVE_SANDWICH:
      return { ...state, sandwich: null };
    case REMOVE_CHIPS:
      return { ...state, chips: null };
    default:
      return state;
  }
}
```

```js
// src/reducers/doReducer.js
import {
  DO_STUFF
} from '../actions/doActions';

const initialState = {
  stuff: 'unfinished'
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case: DO_STUFF:
      return { stuff: 'done' };
    default:
      return state;
  }
}
```

We can then combine these reducers.

```js
// src/reducers/index.js
import { combineReducers } from 'redux';
import lunch from './lunchReducer';
import do from './doReducer';

export default combineReducers({
  lunch,
  do
});
```

This results in a store object with all lunch state nested in a
lunch key and all do state nested in a do key.

```js
{
  lunch: {
    drink: null,
    sandwich: null,
    chips: null
  },
  do: {
    stuff: 'unfinished'
  }
}
```

## Selectors

```js
export const getDrink = state => state.lunch.drink;
export const getSandwich = state => state.lunch.sandwich;
export const getChips = state => state.lunch.chips;

console.log(getDrink(store.getState())); // prints drink
```

### Deriving Data

You can also use selectors to derive data from state.

```js
export const getDrink = state => state.lunch.drink;
export const getSandwich = state => state.lunch.sandwich;
export const getChips = state => state.lunch.chips;
export const getItems = state => {
  return [getDrink(state), getSandwich(state), getChips(state)]
    .filter(Boolean); // remove nulls
};
export const getItemCount = state => getItems(state).length
```
