import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { getAllProducts } from './actions'
import App from './container/App'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import './css/main.css'

const middleware = process.env.NODE_ENV === 'production' ? 
	[thunk] : 
	[thunk, logger()]

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
const store = createStoreWithMiddleware(rootReducer)
const rootElement = document.querySelector('#root')

store.dispatch(getAllProducts())

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	rootElement
)


