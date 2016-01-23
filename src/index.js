import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { getAllProducts } from './actions'
import App from './container/App'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

/* trackJs BEGIN collect response/request payload*/
// import $ from 'jquery'
// window._trackJs = {
//   token: "YOUR_TOKEN_HERE",
//   network: {
//     error: false
//   }
// }
// $(document).ajaxError(function (evt, xhr, opts, errMsg) {
//   // Log the error message
//   // This will be visible and searchable in the telemetry timeline
//   console.log(errMsg);
//   // Or maybe request params
//   console.log(opts.data);
//   // Or log other things
//   console.log(xhr.getAllResponseHeaders())
//   var statusCode = xhr.status;
//   var method = opts.type;
//   var url = opts.url;
//   // Send a nice message with method, status and url.
//   trackJs.track(method + " " + statusCode + ": " + url);
// });
// const button = document.createElement('button')
// button.textContent = 'Click'
// button.style.display = 'none'
// document.body.appendChild(button)
// button.addEventListener('click', e => {
// 	const reqListener = function() { console.log(this.responseText) }
// 	const oReq = new XMLHttpRequest()
// 	oReq.onload = reqListener
// 	oReq.open('get', 'yourFile.txt', true)
// 	oReq.send()

// })
// document.addEventListener('keyup', e => {
// 	if (e.keyCode === 66 && e.shiftKey) {
// 		button.style.display = 'block'
// 	}
// 	else if (e.keyCode === 66 && e.ctrlKey) button.style.display = 'none'
// })

/* trackJs END */
import './css/main.css'

const middleware = process.env.NODE_ENV === 'production' ? [thunk] : [thunk, logger()]

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


