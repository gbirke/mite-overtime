import { configure, setDate } from './redux_actions'
import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import SettingsView from './views/settings_view'
import EntriesView from './views/entry_view'
import PaginationView from './views/pagination_view'
import ErrorView from './views/error_view'
import miteOvertimeApp from './reducers'
import EntryConverter from './views/util/entry_converter'
import * as actions from './redux_actions'
import { create } from './server_connector'

import { MainNavigation } from './components/MainNavigation'
import React from 'react'
import ReactDOM from 'react-dom'

let jQuery = require( 'jquery' ),
	OvertimeFactory = require( './overtime_factory' ),
	HtmlRenderer = require( './html_renderer' ),
	config = require( './config' );

jQuery( function () {
	const locale = 'de', // TODO make locale configurable
		// load locale object to make browserify include locale data
		loadedLocale = require( 'moment/locale/de' ), // see https://github.com/moment/moment/issues/2007

		// redux store
		store = createStore( miteOvertimeApp, applyMiddleware( ReduxThunk ) );

	store.dispatch( configure( { apiUrl: config.apiUrl } ) );
	store.dispatch( setDate( config.startDate ) );

	const converter = new EntryConverter ( OvertimeFactory.createOvertimeFactory );
	new EntriesView( new HtmlRenderer( '#displayContainer' ), store, converter );
	new SettingsView( jQuery( '#settings' ), store, actions, create );
	new PaginationView( jQuery( '#nav-prev a' ), jQuery( '#nav-next a' ), store, setDate );
	new ErrorView( jQuery( '#errmsg' ), store );

	ReactDOM.render( MainNavigation, document.getElementById( 'app' ) );

} );
