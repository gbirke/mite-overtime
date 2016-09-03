import { take, put, call } from 'redux-saga/effects'
import { LOGIN_REQUEST, LOAD_ENTRIES_REQUEST, loginSucceeded, loginFailed, loadEntriesForCurrentMonth, loadEntriesSuccess, loadEntriesFailure } from './redux_actions'


export function createLoadEntries( serverApi ) {
	return function *loadEntries() {
		while( true ) {
			let action = yield take( LOAD_ENTRIES_REQUEST );
			let { account, apiKey, year, month } = action.payload;
			try {
				const result = yield call( [ serverApi, serverApi.loadEntries ], account, apiKey, year, month );
				yield put ( loadEntriesSuccess( result ) );
			} catch ( ex ) {
				yield put( loadEntriesFailure( ex ) );
			}
		}
	}
}


export function createLoginFlow( serverApi ) {
	return function *loginFlow() {

		while( true ) {
			let action = yield take( LOGIN_REQUEST );
			let { account, apiKey } = action.payload;
			try {
				yield call( [ serverApi, serverApi.checkCredentials ], account, apiKey );
				yield put( loginSucceeded( action.payload ) );
				yield put( loadEntriesForCurrentMonth( action.payload ) );
			} catch ( ex ) {
				yield put( loginFailed( ex ) );
			}
		}
	}
}
