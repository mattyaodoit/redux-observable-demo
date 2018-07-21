import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { persistState } from 'redux-devtools';

import rootEpic from './../epics';
import rootReducer from '../reducers';

const history = createHistory();
const middleware = routerMiddleware(history);
const logger = createLogger({
  level: 'info',
  collapsed: true
});

const epicMiddleware = createEpicMiddleware();
const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(epicMiddleware, middleware, logger),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&]+)\b/
        )
      )
    )
  );

  epicMiddleware.run(rootEpic);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return {
    store,
    history
  };
};

export default configureStore;
