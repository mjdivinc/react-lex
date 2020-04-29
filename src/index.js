import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom';
import { Redirect, Route } from 'react-router';
import thunk from 'redux-thunk';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import HomeScreen from './Components/HomeScreen.js';
import * as serviceWorker from './serviceWorker';
import TabLayout from './Components/TabLayout.js';
import rootReducer from './Reducers/Reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import Course from './Components/Course.js';

const customHistory = createBrowserHistory();

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

console.log(store.getState())
export default store;

const routing = (
  <Provider store={store}>
    <Router history={customHistory}>
      <React.Fragment>
        <Redirect from="/" to="/home" />
        <Route path="/home" component={HomeScreen} />
        <Route path="/courses" component={TabLayout} />
        <Route path="/course" component={Course} />
      </React.Fragment>
    </Router>
  </Provider>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
