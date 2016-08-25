import { createStore, combineReducers, applyMiddleware } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import ReduxThunk from 'redux-thunk'

import { configure, setDate } from './redux_actions'
import miteOvertimeApp from './reducers'

import { App } from './components/App'
import { Login } from './components/Login'
import { LoginRequired } from './components/LoginRequired'


let OvertimeFactory = require( './overtime_factory' ),
	HtmlRenderer = require( './html_renderer' ),
	config = require( './config' );

document.addEventListener("DOMContentLoaded", () => {
	const locale = 'de', // TODO make locale configurable
		// load locale object to make browserify include locale data
		loadedLocale = require('moment/locale/de'), // see https://github.com/moment/moment/issues/2007

		// redux store
		store = createStore( combineReducers( miteOvertimeApp ), applyMiddleware(ReduxThunk) );

	store.dispatch(configure({apiUrl: config.apiUrl}));
	store.dispatch(setDate(config.startDate));


	ReactDOM.render(
		(<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={LoginRequired}/>
					<Route path="/login" component={Login}/>
				</Route>
			</Router>
		), document.getElementById('app'));

} );
