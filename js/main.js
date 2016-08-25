import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { configure, setDate } from './redux_actions'
import miteOvertimeApp from './reducers'

import { App } from './components/App'
import Login from './components/Login'
import { LoginRequired } from './components/LoginRequired'

let OvertimeFactory = require( './overtime_factory' ),
	HtmlRenderer = require( './html_renderer' ),
	config = require( './config' );

document.addEventListener("DOMContentLoaded", () => {
	const locale = 'de', // TODO make locale configurable
		// load locale object to make browserify include locale data
		loadedLocale = require('moment/locale/de'), // see https://github.com/moment/moment/issues/2007

		// redux store
		reducer = combineReducers( Object.assign( {}, miteOvertimeApp, { form: formReducer } ) ),
		store = createStore( reducer, applyMiddleware(ReduxThunk) );

	store.dispatch(configure({apiUrl: config.apiUrl}));
	store.dispatch(setDate(config.startDate));


	ReactDOM.render(
		(
			<Provider store={store}>
				<Router history={hashHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={LoginRequired}/>
						<Route path="/login" component={Login} />
					</Route>
				</Router>
			</Provider>
		), document.getElementById('app'));

} );
