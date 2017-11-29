import { combineReducers } from 'redux'
import formReducer from './formreducer'
import appReducer from './appReducer'

const mainReducer = combineReducers({
  formReducer,
  appReducer  
})

export default mainReducer
