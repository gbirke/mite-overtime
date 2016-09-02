import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { formActionSaga } from 'redux-form-saga'
import createLogger from 'redux-logger';

import { configure, setDate } from './redux_actions'
import miteOvertimeApp from './reducers'
import { createLoginFlow, createLoadEntries } from './sagas'

import App from './components/App'
import Login from './components/Login'
import Home from './components/Home'
import { LoginRequired } from './components/LoginRequired'
import ServerApi from './server_api'

let OvertimeFactory = require( './overtime_factory' ),
	HtmlRenderer = require( './html_renderer' ),
	config = require( './config' );

function createRootSaga( serverApi ) {
	return function* rootSaga() {
		yield [
			createLoginFlow( serverApi )(),
			formActionSaga()
			//createLoadEntries( serverApi )()
		]
	}
}


document.addEventListener("DOMContentLoaded", () => {
	const locale = 'de', // TODO make locale configurable
		// load locale object to make browserify include locale data
		loadedLocale = require('moment/locale/de'), // see https://github.com/moment/moment/issues/2007

		// redux store
		reducer = combineReducers(
			Object.assign(
				{},
				miteOvertimeApp,
				{ form: formReducer }
			)
		),
		sagaMiddleware = createSagaMiddleware(),

		fakeServerApi = { checkCredentials: function() {
			console.log("Faking server check");
			return new Promise( ( resolve ) => {
				setTimeout( () => { console.log("server successful"); resolve( true ); }, 1000 );
			} );
		} },
		//serverApi = new ServerApi( config.baseUrl ),

		// TODO only create logger if process.env.APP_ENV !== 'production'
		store = createStore( reducer, applyMiddleware( sagaMiddleware, createLogger() ) );

	sagaMiddleware.run( createRootSaga( fakeServerApi ) );

	store.dispatch(configure({apiUrl: config.apiUrl}));
	store.dispatch(setDate(config.startDate));


	ReactDOM.render(
		(
			<Provider store={store}>
				<Router history={hashHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={Home}/>
						<Route path="/login" component={Login} />
					</Route>
				</Router>
			</Provider>
		), document.getElementById('app'));

} );
