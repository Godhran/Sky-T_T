import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {render} from 'react-dom'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './reducers'

import thunk from "redux-thunk"


const store = createStore(rootReducer, applyMiddleware(thunk))

render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
