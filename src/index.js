import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import userPageReducer from './store/reducers/UserReducer'
import authReducer from './store/reducers/authReducer'
import moderatorReducer from './store/reducers/ModeratorReducer'
import adminReducer from './store/reducers/AdminReducer'
import ScheduleReducer from './store/reducers/ScheduleReducer'
import MessagesReducer from './store/reducers/MessagesReducer'
import ServicesReducer from './store/reducers/ServicesReducer'
import ProductsReducer from './store/reducers/ProductsReducer'



const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
    userPage: userPageReducer,
    auth:authReducer,
    modPage:moderatorReducer,
    schedule:ScheduleReducer,
    messages:MessagesReducer,
    services:ServicesReducer,
    products:ProductsReducer,
    adminPage:adminReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render( app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
