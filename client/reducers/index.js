import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import items from './items'
import activeItem from './activeItem'

const rootReducer = combineReducers({
  router: routerReducer,
  items,
  activeItem,
})

export default rootReducer
