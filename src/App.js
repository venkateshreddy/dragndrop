import React, { Component } from 'react'
import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import AppComponent from './components/AppComponent'
import mainReducer from './reducers'

const store = createStore(
					mainReducer, 
					applyMiddleware(thunk)
			);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppComponent />
      </Provider>
      
    );
  }
}


export default App;
