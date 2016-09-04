import { take, put, call, select } from 'redux-saga/effects'
import { hashHistory } from 'react-router'
import { LOGIN_REQUEST, SET_DATE, LOAD_ENTRIES, LOAD_ENTRIES_REQUEST, loginSucceeded, loginFailed, loadEntriesWithCredentials, loadEntries, loadEntriesSuccess, loadEntriesFailure } from './redux_actions'

export function *loadEntriesWithCurrentState() {
	while( true) {
		yield take( LOAD_ENTRIES );
		const { credentials, currentDate } = yield select( ( state ) => {
			return {
				credentials: state.credentials,
				currentDate: new Date( state.currentDate )
			}
		} );
		if ( !credentials.valid ) {
			continue;
		}
		yield put( loadEntriesWithCredentials( credentials, currentDate.getFullYear(), currentDate.getMonth() ) );
	}
}

export function *loadEntriesOnDateChange() {
	while( true) {
		yield take( SET_DATE );
		yield put( loadEntries() );
	}
}

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
				yield put( loadEntries() );
				yield call( () => { hashHistory.replace('/overtime') } );
			} catch ( ex ) {
				yield put( loginFailed( ex ) );
			}
		}
	}
}
