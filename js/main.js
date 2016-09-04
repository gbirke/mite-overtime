import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { formActionSaga } from 'redux-form-saga'
import createLogger from 'redux-logger';

import { configure, setDate, loadEntries } from './redux_actions'
import miteOvertimeApp from './reducers'
import { createLoginFlow, createLoadEntries, loadEntriesWithCurrentState, loadEntriesOnDateChange } from './sagas'

import App from './components/App'
import Login from './components/Login'
import Overtime from './components/Overtime'
import Settings from './components/Settings'
import ServerApi from './server_api'

const config = require( './config' );

function createRootSaga( serverApi ) {
	return function* rootSaga() {
		yield [
			loadEntriesWithCurrentState(),
			loadEntriesOnDateChange(),
			createLoginFlow( serverApi )(),
			createLoadEntries( serverApi )(),
			formActionSaga(),
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
		serverApi = new ServerApi( config.baseUrl ),

		middlewares = [ sagaMiddleware ];

	if ( process.env.APP_ENV !== 'production' ) {
		middlewares.push( createLogger() );
	}

	const store = createStore( reducer, applyMiddleware( ...middlewares ) );

	sagaMiddleware.run( createRootSaga( serverApi ) );

	store.dispatch(setDate(config.startDate));

	function handleEnterOvertime( route, replace ) {
		const { year, month } = route.params;
		if ( !store.getState().credentials.valid ) {
			replace( {
				pathname: '/login',
				state: { year, month }
			} )
		}

		if ( year && month ) {
			store.dispatch( setDate( (new Date( year, month ) ).toISOString() ) );
		}
	}

	function redirectIfLoggedIn( route, replace ) {
		if ( store.getState().credentials.valid ) {
			replace( { pathname: '/overtime' } );
		}
	}

	ReactDOM.render(
		(
			<Provider store={store}>
				<Router history={hashHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={Overtime} onEnter={handleEnterOvertime} />
						<Route path="/login" component={Login} onEnter={redirectIfLoggedIn} />
						<Route path="/overtime(/:year/:month)" component={Overtime} onEnter={handleEnterOvertime} />
						<Route path="/settings" component={Settings} />
					</Route>
				</Router>
			</Provider>
		), document.getElementById('app'));

} );
