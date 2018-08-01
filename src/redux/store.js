import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './root-reducer';

export function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware];
  const enhancedMiddleware = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, preloadedState, enhancedMiddleware);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./root-reducer', () =>
      store.replaceReducer(rootReducer)
    );
  }

  return store;
}

export default {
  configureStore
};
