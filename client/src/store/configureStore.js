import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';

const composeEnhancers = composeWithDevTools({ realtime: true });

/* eslint-disable no-underscore-dangle */
export default () => {
  const store = createStore(
    reducers,
    undefined, // initial state
    composeEnhancers(
      applyMiddleware(reduxThunk)
    )
    // applyMiddleware(reduxThunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
/* eslint-enable */
