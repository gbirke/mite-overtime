import { take, put, call } from 'redux-saga/effects'
import { LOGIN_REQUEST, LOAD_ENTRIES_REQUEST, loginSucceeded, loginFailed } from './redux_actions'


export function createLoadEntries( serverApi ) {
	return function *loadEntries() {
		while( true ) {
			let loadParams = yield take( LOAD_ENTRIES_REQUEST );
			// TODO serverApi.loadEntries
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
			} catch ( ex ) {
				yield put( loginFailed( ex ) );
			}
		}
	}
}
