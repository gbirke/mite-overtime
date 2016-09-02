export const SET_DATE = 'SET_DATE';
export const CONFIGURE = 'CONFIGURE';
export const LOAD_ENTRIES_REQUEST = 'LOAD_ENTRIES_REQUEST';
export const LOAD_ENTRIES_SUCCESS = 'LOAD_ENTRIES_SUCCESS';
export const LOAD_ENTRIES_FAILURE = 'LOAD_ENTRIES_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export function configure( configData ) {
	return {
		type: CONFIGURE,
		payload: configData
	}
}

export function login( credentials ) {
	return {
		type: LOGIN_REQUEST,
		payload: credentials
	}
}

export function loginSucceeded( credentials ) {
	return {
		type: LOGIN_SUCCESS,
		payload: credentials
	}
}

export function loginFailed( reason ) {
	return {
		type: LOGIN_FAILURE,
		payload: reason
	}
}

export function logout() {
	return { type: LOGOUT };
}

export function setDate( date ) {
	return {
		type: SET_DATE,
		payload: date
	}
}

export function loadEntries( credentials, year, month) {
	return {
		type: LOAD_ENTRIES_REQUEST,
		payload: {
			apiKey: credentials.apiKey,
			account: credentials.account,
			year: year,
			month: month
		}
	}
}

export function loadEntriesSuccess( entries ) {
	return {
		type: LOAD_ENTRIES_SUCCESS,
		payload: entries
	}
}

export function loadEntriesFailure( errmsg ) {
	return {
		type: LOAD_ENTRIES_FAILURE,
		payload: errmsg
	}
}

