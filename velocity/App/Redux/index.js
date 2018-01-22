import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    demo: require('./DemoRedux').reducer,
    // github: require('./GithubRedux').reducer,
    // search: require('./SearchRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
