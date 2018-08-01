import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { persistState } from 'redux-devtools';

import rootEpic from './../epics';
import rootReducer from '../reducers';

const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const logger = createLogger({
  level: 'info',
  collapsed: true
});

const epicMiddleware = createEpicMiddleware();

export default () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, epicMiddleware, routeMiddleware, logger),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&]+)\b/
        )
      )
    )
  );

  epicMiddleware.run(rootEpic);

  return {
    store,
    history
  };
};

