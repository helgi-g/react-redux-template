import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import history from './history'

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose


const enhancer = composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))

const store = createStore(reducer, enhancer)

if (module.hot) {
  module.hot.accept(reducer, () => {
    const nextRootReducer = reducer;
    store.replaceReducer(nextRootReducer);
  });
}

export default store