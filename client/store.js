import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './reducers'
import ReduxThunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import promiseMiddleware from 'redux-promise-middleware'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const history = createHistory()


export default function configureStore(initialState) {
  const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(ReduxThunk, promiseMiddleware(), routerMiddleware(history))
  ))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, history }
}
